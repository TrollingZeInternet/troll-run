"use client";

import { SwapWidget, type Token } from "@relayprotocol/relay-kit-ui";
import { adaptSolanaWallet } from "@relayprotocol/relay-svm-wallet-adapter";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import ClientOnly from "./ClientOnly";
import RelayProviders from "./RelayProviders";
import WalletStatusBar from "./WalletStatusBar";
import WidgetErrorBoundary from "./WidgetErrorBoundary";
import { useWalletConnect } from "./WalletConnectProvider";
import {
  ETHEREUM_CHAIN_ID,
  SOLANA_CHAIN_ID,
  TROLL_TOKEN,
} from "@/lib/relay-config";
import { resolvePrimaryVmType } from "@/lib/wallet-utils";

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
  const { connection } = useConnection();
  const { publicKey, wallet: solanaWallet, connected: isSolanaConnected } =
    useWallet();
  const {
    linkedWallets,
    primaryAddress,
    openConnectModal,
    linkWallet,
    setPrimaryAddress,
    disconnectAllWallets,
  } = useWalletConnect();

  const primaryVmType = resolvePrimaryVmType(primaryAddress, linkedWallets);

  const solanaAdaptedWallet = useMemo(() => {
    if (!publicKey || !solanaWallet?.adapter || !isSolanaConnected) {
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
  }, [connection, isSolanaConnected, publicKey, solanaWallet?.adapter]);

  const activeWallet =
    primaryVmType === "svm" ? solanaAdaptedWallet : undefined;

  const isSolanaWalletBootstrapping =
    primaryVmType === "svm" && isSolanaConnected && !solanaAdaptedWallet;

  const widgetResetKey = [
    primaryAddress ?? "disconnected",
    primaryVmType ?? "none",
    linkedWallets.map((wallet) => wallet.address).join("|"),
  ].join(":");

  const handleSetToToken = (token?: Token) => {
    if (token) {
      setToToken(token);
    }
  };

  if (isSolanaWalletBootstrapping) {
    return <WidgetSkeleton />;
  }

  return (
    <>
      <WalletStatusBar
        linkedWallets={linkedWallets}
        primaryAddress={primaryAddress}
        onOpenWalletModal={() => openConnectModal()}
        onDisconnectAll={disconnectAllWallets}
      />
      <WidgetErrorBoundary resetKey={widgetResetKey}>
        <SwapWidget
          wallet={activeWallet}
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
      </WidgetErrorBoundary>
    </>
  );
}

export default function RelaySwapWidget() {
  return (
    <ClientOnly fallback={<WidgetSkeleton />}>
      <RelayProviders>
        <RelaySwapWidgetInner />
      </RelayProviders>
    </ClientOnly>
  );
}
