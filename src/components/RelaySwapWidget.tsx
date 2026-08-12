"use client";

import { SwapWidget, type Token } from "@relayprotocol/relay-kit-ui";
import { adaptViemWallet } from "@relayprotocol/relay-sdk";
import { useMemo, useState } from "react";
import { useConnect, useWalletClient } from "wagmi";
import ClientOnly from "./ClientOnly";
import RelayProviders from "./RelayProviders";
import { ETHEREUM_CHAIN_ID, TROLL_TOKEN } from "@/lib/relay-config";

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
  const { data: walletClient } = useWalletClient();
  const { connect, connectors } = useConnect();

  const wallet = useMemo(
    () => (walletClient ? adaptViemWallet(walletClient) : undefined),
    [walletClient],
  );

  const onConnectWallet = () => {
    const connector =
      connectors.find((item) => item.id === "injected") ?? connectors[0];

    if (connector) {
      connect({ connector });
    }
  };

  const handleSetToToken = (token?: Token) => {
    if (token) {
      setToToken(token);
    }
  };

  return (
    <SwapWidget
      wallet={wallet}
      toToken={toToken}
      setToToken={handleSetToToken}
      lockToToken
      lockChainId={ETHEREUM_CHAIN_ID}
      supportedWalletVMs={["evm"]}
      onConnectWallet={onConnectWallet}
      popularChainIds={[1, 8453, 42161, 10, 137, 56]}
    />
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
