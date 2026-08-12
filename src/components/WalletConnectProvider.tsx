"use client";

import type { LinkedWallet } from "@relayprotocol/relay-kit-ui";
import type { RelayChain } from "@relayprotocol/relay-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAccount, useConnect, useDisconnect, type Config } from "wagmi";
import { SOLANA_CHAIN_ID } from "@/lib/relay-config";
import { connectSolanaWallet } from "@/lib/solana-connect";
import {
  normalizeSolanaConnector,
} from "@/lib/wallet-utils";
import {
  EVM_WALLET_OPTIONS,
  getConnectorById,
  type EvmWalletId,
} from "@/lib/wagmi-config";
import {
  getEvmWalletInstallUrl,
  isEvmWalletInstalled,
  type SolanaWalletName,
} from "@/lib/wallet-detection";
import WalletConnectModal from "./WalletConnectModal";

type LinkWalletParams = {
  chain?: RelayChain;
  direction: "to" | "from";
};

type PendingLink = {
  resolve: (wallet: LinkedWallet) => void;
  reject: (reason?: unknown) => void;
  vmType: "evm" | "svm";
};

type WalletConnectContextValue = {
  linkedWallets: LinkedWallet[];
  primaryAddress: string | undefined;
  setPrimaryAddress: (address: string) => void;
  openConnectModal: (vmType?: "evm" | "svm") => void;
  linkWallet: (params: LinkWalletParams) => Promise<LinkedWallet>;
  connectEvmWallet: (walletId: EvmWalletId) => Promise<void>;
  connectSolanaWalletByName: (walletName: SolanaWalletName) => Promise<void>;
  disconnectEvmWallet: () => Promise<void>;
  disconnectSolanaWallet: () => Promise<void>;
  disconnectAllWallets: () => Promise<void>;
  activeEvmConnectorId?: string;
};

const WalletConnectContext = createContext<WalletConnectContextValue | null>(
  null,
);

export function useWalletConnect() {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error("useWalletConnect must be used within WalletConnectProvider");
  }
  return context;
}

function toEvmLinkedWallet(
  address: string,
  connector?: string,
): LinkedWallet {
  return {
    address,
    vmType: "evm",
    connector: connector ?? "evm",
  };
}

function toSvmLinkedWallet(
  address: string,
  connector?: string,
): LinkedWallet {
  return {
    address,
    vmType: "svm",
    connector: normalizeSolanaConnector(connector),
  };
}

export default function WalletConnectProvider({
  children,
  wagmiConfig,
}: {
  children: ReactNode;
  wagmiConfig: Config;
}) {
  const { address, connector, isConnected: isEvmConnected } = useAccount();
  const { connectAsync, isPending: isEvmConnecting } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const {
    publicKey,
    wallet: solanaWallet,
    connected: isSolanaConnected,
    wallets,
    select,
    disconnect: disconnectSolana,
  } = useWallet();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState<"all" | "evm" | "svm">("all");
  const [primaryAddress, setPrimaryAddressState] = useState<string | undefined>();
  const [connectError, setConnectError] = useState<string | null>(null);
  const pendingLink = useRef<PendingLink | null>(null);

  const solanaAddress = publicKey?.toBase58();

  const linkedWallets = useMemo(() => {
    const linked: LinkedWallet[] = [];

    if (address) {
      linked.push(toEvmLinkedWallet(address, connector?.id ?? connector?.name));
    }

    if (solanaAddress) {
      linked.push(
        toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
      );
    }

    return linked;
  }, [address, connector?.id, connector?.name, solanaAddress, solanaWallet?.adapter.name]);

  const setPrimaryAddress = useCallback((nextAddress: string) => {
    setPrimaryAddressState(nextAddress);
  }, []);

  useEffect(() => {
    if (linkedWallets.length === 0) {
      setPrimaryAddressState(undefined);
      return;
    }

    if (
      primaryAddress &&
      linkedWallets.some((wallet) =>
        wallet.vmType === "evm"
          ? wallet.address.toLowerCase() === primaryAddress.toLowerCase()
          : wallet.address === primaryAddress,
      )
    ) {
      return;
    }

    if (address) {
      setPrimaryAddressState(address);
      return;
    }

    if (solanaAddress) {
      setPrimaryAddressState(solanaAddress);
    }
  }, [address, linkedWallets, primaryAddress, solanaAddress]);

  const resolvePendingLink = useCallback(
    (wallet: LinkedWallet) => {
      pendingLink.current?.resolve(wallet);
      pendingLink.current = null;
      setPrimaryAddressState(wallet.address);
      setModalOpen(false);
      setConnectError(null);
    },
    [],
  );

  useEffect(() => {
    if (!pendingLink.current) {
      return;
    }

    if (pendingLink.current.vmType === "evm" && address) {
      resolvePendingLink(toEvmLinkedWallet(address, connector?.id ?? connector?.name));
    }

    if (pendingLink.current.vmType === "svm" && solanaAddress) {
      resolvePendingLink(
        toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
      );
    }
  }, [
    address,
    connector?.id,
    connector?.name,
    resolvePendingLink,
    solanaAddress,
    solanaWallet?.adapter.name,
  ]);

  const disconnectEvmWallet = useCallback(async () => {
    setConnectError(null);

    try {
      await disconnectAsync();

      if (
        primaryAddress &&
        address &&
        primaryAddress.toLowerCase() === address.toLowerCase()
      ) {
        setPrimaryAddressState(solanaAddress);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to disconnect EVM wallet.";
      setConnectError(message);
    }
  }, [address, disconnectAsync, primaryAddress, solanaAddress]);

  const disconnectSolanaWallet = useCallback(async () => {
    setConnectError(null);

    try {
      await disconnectSolana();

      if (primaryAddress && primaryAddress === solanaAddress) {
        setPrimaryAddressState(address);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to disconnect Solana wallet.";
      setConnectError(message);
    }
  }, [address, disconnectSolana, primaryAddress, solanaAddress]);

  const disconnectAllWallets = useCallback(async () => {
    setConnectError(null);

    try {
      await Promise.allSettled([
        isEvmConnected ? disconnectAsync() : Promise.resolve(),
        isSolanaConnected ? disconnectSolana() : Promise.resolve(),
      ]);
      setPrimaryAddressState(undefined);
      setModalOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to disconnect wallets.";
      setConnectError(message);
    }
  }, [
    disconnectAsync,
    disconnectSolana,
    isEvmConnected,
    isSolanaConnected,
  ]);

  const connectEvmWallet = useCallback(
    async (walletId: EvmWalletId) => {
      setConnectError(null);

      if (walletId !== "walletConnect" && !isEvmWalletInstalled(walletId)) {
        const installUrl = getEvmWalletInstallUrl(walletId);
        if (installUrl) {
          window.open(installUrl, "_blank", "noopener,noreferrer");
        }
        return;
      }

      const selectedConnector = getConnectorById(wagmiConfig, walletId);

      if (!selectedConnector) {
        setConnectError(`Wallet connector not found for ${walletId}.`);
        return;
      }

      try {
        if (isEvmConnected && connector?.id !== selectedConnector.id) {
          await disconnectAsync();
        }

        const result = await connectAsync({ connector: selectedConnector });
        const connectedAddress = result.accounts[0];

        if (connectedAddress) {
          setPrimaryAddressState(connectedAddress);
        }

        if (!pendingLink.current) {
          window.setTimeout(() => {
            setModalOpen(false);
            setConnectError(null);
          }, 0);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "EVM wallet connection failed.";
        setConnectError(message);
      }
    },
    [
      connectAsync,
      connector?.id,
      disconnectAsync,
      isEvmConnected,
      wagmiConfig,
    ],
  );

  const connectSolanaWalletByName = useCallback(
    async (walletName: SolanaWalletName) => {
      setConnectError(null);

      try {
        await connectSolanaWallet(
          wallets,
          walletName,
          select,
          solanaWallet,
        );

        const target = wallets.find((entry) => entry.adapter.name === walletName);
        const connectedAddress = target?.adapter.publicKey?.toBase58();

        if (connectedAddress) {
          setPrimaryAddressState(connectedAddress);
        }

        if (!pendingLink.current) {
          window.setTimeout(() => {
            setModalOpen(false);
            setConnectError(null);
          }, 0);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Solana wallet connection failed.";
        setConnectError(message);
      }
    },
    [select, solanaWallet, wallets],
  );

  const openConnectModal = useCallback((vmType?: "evm" | "svm") => {
    setConnectError(null);
    setModalFilter(vmType ?? "all");
    setModalOpen(true);
  }, []);

  const linkWallet = useCallback(
    ({ chain }: LinkWalletParams) => {
      const vmType =
        chain?.vmType === "svm" || chain?.id === SOLANA_CHAIN_ID ? "svm" : "evm";

      if (vmType === "evm" && address) {
        return Promise.resolve(
          toEvmLinkedWallet(address, connector?.id ?? connector?.name),
        );
      }

      if (vmType === "svm" && solanaAddress) {
        return Promise.resolve(
          toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
        );
      }

      return new Promise<LinkedWallet>((resolve, reject) => {
        pendingLink.current = { resolve, reject, vmType };
        setModalFilter(vmType);
        setModalOpen(true);
      });
    },
    [
      address,
      connector?.id,
      connector?.name,
      solanaAddress,
      solanaWallet?.adapter.name,
    ],
  );

  const handleCloseModal = useCallback(() => {
    pendingLink.current?.reject(new Error("Wallet connection cancelled"));
    pendingLink.current = null;
    setConnectError(null);
    setModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      linkedWallets,
      primaryAddress,
      setPrimaryAddress,
      openConnectModal,
      linkWallet,
      connectEvmWallet,
      connectSolanaWalletByName,
      disconnectEvmWallet,
      disconnectSolanaWallet,
      disconnectAllWallets,
      activeEvmConnectorId: connector?.id,
    }),
    [
      linkedWallets,
      primaryAddress,
      setPrimaryAddress,
      openConnectModal,
      linkWallet,
      connectEvmWallet,
      connectSolanaWalletByName,
      disconnectEvmWallet,
      disconnectSolanaWallet,
      disconnectAllWallets,
      connector?.id,
    ],
  );

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
      <WalletConnectModal
        open={modalOpen}
        filter={modalFilter}
        onClose={handleCloseModal}
        onEvmConnect={connectEvmWallet}
        onSolanaConnect={connectSolanaWalletByName}
        onDisconnectEvm={() => void disconnectEvmWallet()}
        onDisconnectSolana={() => void disconnectSolanaWallet()}
        onDisconnectAll={() => void disconnectAllWallets()}
        evmWalletOptions={EVM_WALLET_OPTIONS}
        isEvmConnecting={isEvmConnecting}
        isEvmConnected={isEvmConnected}
        isSolanaConnected={isSolanaConnected}
        evmAddress={address}
        solanaAddress={solanaAddress}
        activeEvmConnectorId={connector?.id}
        activeSolanaWalletName={solanaWallet?.adapter.name}
        connectError={connectError}
      />
    </WalletConnectContext.Provider>
  );
}
