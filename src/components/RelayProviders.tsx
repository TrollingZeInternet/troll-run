"use client";

import { RelayKitProvider } from "@relayprotocol/relay-kit-ui";
import { useRelayChains } from "@relayprotocol/relay-kit-hooks";
import { MAINNET_RELAY_API } from "@relayprotocol/relay-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { initEip6963Discovery } from "@/lib/eip6963";
import {
  relayKitTheme,
  SOLANA_CHAIN_CONFIG,
  SOLANA_CHAIN_ID,
  SOLANA_RPC_URL,
} from "@/lib/relay-config";
import { createWagmiConfig } from "@/lib/wagmi-config";
import SolanaWalletProvider from "./SolanaWalletProvider";
import WalletConnectProvider from "./WalletConnectProvider";

function BridgeLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="mx-auto h-10 w-10 rounded-full bg-white/5" />
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="h-12 rounded-full bg-white/5" />
    </div>
  );
}

function RelayWagmiBridge({ children }: { children: ReactNode }) {
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
  const { chains, viemChains } = useRelayChains(MAINNET_RELAY_API);

  useEffect(() => initEip6963Discovery(), []);

  useEffect(() => {
    if (!wagmiConfig && viemChains && viemChains.length > 0 && chains) {
      const evmViemChains = chains
        .filter((chain) => chain.vmType === "evm" && chain.viemChain)
        .map((chain) => chain.viemChain);

      setWagmiConfig(createWagmiConfig(evmViemChains));
    }
  }, [chains, viemChains, wagmiConfig]);

  if (!wagmiConfig || !chains) {
    return <BridgeLoadingSkeleton />;
  }

  // Overlay our Solana RPC/currency onto Relay's Solana chain, then put it first.
  // A bare prepend would win `chains.find(id)` and drop currency.address / explorer.
  const relaySolana = chains.find((chain) => chain.id === SOLANA_CHAIN_ID);
  const solanaChain = {
    ...relaySolana,
    ...SOLANA_CHAIN_CONFIG,
    currency: {
      ...relaySolana?.currency,
      ...SOLANA_CHAIN_CONFIG.currency,
    },
    httpRpcUrl: SOLANA_RPC_URL,
  };

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <SolanaWalletProvider>
        <RelayKitProvider
          theme={relayKitTheme}
          options={{
            appName: "TrollERC20",
            source: "troll.run",
            themeScheme: "dark",
            chains: [
              solanaChain,
              ...(chains ?? []).filter((chain) => chain.id !== SOLANA_CHAIN_ID),
            ],
            baseApiUrl: MAINNET_RELAY_API,
            codexConfig: {
              apiBaseUrl: "https://graph.codex.io",
            },
          }}
        >
          <WalletConnectProvider wagmiConfig={wagmiConfig}>
            {children}
          </WalletConnectProvider>
        </RelayKitProvider>
      </SolanaWalletProvider>
    </WagmiProvider>
  );
}

export default function RelayProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RelayWagmiBridge>{children}</RelayWagmiBridge>
    </QueryClientProvider>
  );
}
