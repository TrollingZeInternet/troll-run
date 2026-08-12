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
import { useAccount, useConnect, type Config } from "wagmi";
import {
  EVM_WALLET_OPTIONS,
  getConnectorById,
  type EvmWalletId,
} from "@/lib/wagmi-config";
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
    connector: connector ?? "phantom",
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
  const { publicKey, wallet: solanaWallet, connected: isSolanaConnected } =
    useWallet();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState<"all" | "evm" | "svm">("all");
  const [primaryAddress, setPrimaryAddress] = useState<string | undefined>();
  const pendingLink = useRef<PendingLink | null>(null);

  const solanaAddress = publicKey?.toBase58();

  const linkedWallets = useMemo(() => {
    const wallets: LinkedWallet[] = [];

    if (address) {
      wallets.push(toEvmLinkedWallet(address, connector?.name));
    }

    if (solanaAddress) {
      wallets.push(
        toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
      );
    }

    return wallets;
  }, [address, connector?.name, solanaAddress, solanaWallet?.adapter.name]);

  useEffect(() => {
    if (primaryAddress) {
      return;
    }

    if (address) {
      setPrimaryAddress(address);
      return;
    }

    if (solanaAddress) {
      setPrimaryAddress(solanaAddress);
    }
  }, [address, solanaAddress, primaryAddress]);

  const resolvePendingLink = useCallback(
    (wallet: LinkedWallet) => {
      pendingLink.current?.resolve(wallet);
      pendingLink.current = null;
      setModalOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (!pendingLink.current) {
      return;
    }

    if (pendingLink.current.vmType === "evm" && address) {
      resolvePendingLink(toEvmLinkedWallet(address, connector?.name));
    }

    if (pendingLink.current.vmType === "svm" && solanaAddress) {
      resolvePendingLink(
        toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
      );
    }
  }, [
    address,
    connector?.name,
    resolvePendingLink,
    solanaAddress,
    solanaWallet?.adapter.name,
  ]);

  const connectEvmWallet = useCallback(
    async (walletId: EvmWalletId) => {
      const selectedConnector = getConnectorById(wagmiConfig, walletId);

      if (!selectedConnector) {
        throw new Error(`Connector not found: ${walletId}`);
      }

      await connectAsync({ connector: selectedConnector });
    },
    [connectAsync, wagmiConfig],
  );

  const openConnectModal = useCallback((vmType?: "evm" | "svm") => {
    setModalFilter(vmType ?? "all");
    setModalOpen(true);
  }, []);

  const linkWallet = useCallback(
    ({ chain }: LinkWalletParams) => {
      const vmType =
        chain?.vmType === "svm" || chain?.id === 792703809 ? "svm" : "evm";

      if (vmType === "evm") {
        if (address) {
          return Promise.resolve(toEvmLinkedWallet(address, connector?.name));
        }

        return new Promise<LinkedWallet>((resolve, reject) => {
          pendingLink.current = { resolve, reject, vmType: "evm" };
          setModalFilter("evm");
          setModalOpen(true);
        });
      }

      if (solanaAddress) {
        return Promise.resolve(
          toSvmLinkedWallet(solanaAddress, solanaWallet?.adapter.name),
        );
      }

      return new Promise<LinkedWallet>((resolve, reject) => {
        pendingLink.current = { resolve, reject, vmType: "svm" };
        setModalFilter("svm");
        setModalOpen(true);
      });
    },
    [
      address,
      connector?.name,
      solanaAddress,
      solanaWallet?.adapter.name,
    ],
  );

  const handleCloseModal = useCallback(() => {
    pendingLink.current?.reject(new Error("Wallet connection cancelled"));
    pendingLink.current = null;
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
    }),
    [linkedWallets, primaryAddress, openConnectModal, linkWallet, connectEvmWallet],
  );

  return (
    <WalletConnectContext.Provider value={value}>
      {children}
      <WalletConnectModal
        open={modalOpen}
        filter={modalFilter}
        onClose={handleCloseModal}
        onEvmConnect={connectEvmWallet}
        evmWalletOptions={EVM_WALLET_OPTIONS}
        isEvmConnecting={isEvmConnecting}
        isEvmConnected={isEvmConnected}
        isSolanaConnected={isSolanaConnected}
        evmAddress={address}
        solanaAddress={solanaAddress}
      />
    </WalletConnectContext.Provider>
  );
}
