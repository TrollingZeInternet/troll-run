"use client";

import { SwapWidget, type Token } from "@relayprotocol/relay-kit-ui";
import { adaptViemWallet } from "@relayprotocol/relay-sdk";
import { adaptSolanaWallet } from "@relayprotocol/relay-svm-wallet-adapter";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import ClientOnly from "./ClientOnly";
import RelayProviders from "./RelayProviders";
import WidgetErrorBoundary from "./WidgetErrorBoundary";
import { useWalletConnect } from "./WalletConnectProvider";
import {
  ETHEREUM_CHAIN_ID,
  SOLANA_CHAIN_ID,
  TROLL_TOKEN,
} from "@/lib/relay-config";

function WidgetSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="mx-auto h-10 w-10 rounded-full bg-white/5" />
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="h-12 rounded-full bg-white/5" />
    </div>
  );
}

function RelaySwapWidgetInner() {
  const [toToken, setToToken] = useState(TROLL_TOKEN);
  const { address, isConnected: isEvmConnected } = useAccount();
  const { data: walletClient, isLoading: isWalletClientLoading } =
    useWalletClient();
  const { connection } = useConnection();
  const { publicKey, wallet: solanaWallet } = useWallet();
  const {
    linkedWallets,
    openConnectModal,
    linkWallet,
    setPrimaryAddress,
  } = useWalletConnect();

  const evmWallet = useMemo(() => {
    if (!walletClient) {
      return undefined;
    }

    try {
      return adaptViemWallet(walletClient, {
        disableCapabilitiesCheck: true,
      });
    } catch {
      return undefined;
    }
  }, [walletClient]);

  const solanaAdaptedWallet = useMemo(() => {
    if (!publicKey || !solanaWallet?.adapter) {
      return undefined;
    }

    const walletAddress = publicKey.toBase58();
    const adapter = solanaWallet.adapter;

    try {
      return adaptSolanaWallet(
        walletAddress,
        SOLANA_CHAIN_ID,
        connection,
        async (transaction, options) => {
          const signature = await adapter.sendTransaction(
            transaction,
            connection,
            options,
          );
          return { signature };
        },
      );
    } catch {
      return undefined;
    }
  }, [connection, publicKey, solanaWallet?.adapter]);

  const wallet = isEvmConnected ? evmWallet : solanaAdaptedWallet;
  const isWalletBootstrapping =
    isEvmConnected && (isWalletClientLoading || !evmWallet);

  const handleSetToToken = (token?: Token) => {
    if (token) {
      setToToken(token);
    }
  };

  if (isWalletBootstrapping) {
    return <WidgetSkeleton />;
  }

  return (
    <SwapWidget
      key={address ?? publicKey?.toBase58() ?? "disconnected"}
      wallet={wallet}
      toToken={toToken}
      setToToken={handleSetToToken}
      lockToToken
      lockChainId={ETHEREUM_CHAIN_ID}
      multiWalletSupportEnabled
      linkedWallets={linkedWallets}
      supportedWalletVMs={["evm", "svm"]}
      onConnectWallet={() => openConnectModal()}
      onLinkNewWallet={linkWallet}
      onSetPrimaryWallet={setPrimaryAddress}
      popularChainIds={[
        SOLANA_CHAIN_ID,
        1,
        8453,
        42161,
        10,
        137,
        56,
      ]}
    />
  );
}

export default function RelaySwapWidget() {
  return (
    <ClientOnly fallback={<WidgetSkeleton />}>
      <RelayProviders>
        <WidgetErrorBoundary>
          <RelaySwapWidgetInner />
        </WidgetErrorBoundary>
      </RelayProviders>
    </ClientOnly>
  );
}
