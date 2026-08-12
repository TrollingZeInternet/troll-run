"use client";

import { RelayKitProvider } from "@relayprotocol/relay-kit-ui";
import { useRelayChains } from "@relayprotocol/relay-kit-hooks";
import { MAINNET_RELAY_API } from "@relayprotocol/relay-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider, type Config } from "wagmi";
import { relayKitTheme } from "@/lib/relay-config";
import { createWagmiConfig } from "@/lib/wagmi-config";
import SolanaWalletProvider from "./SolanaWalletProvider";
import WalletConnectProvider from "./WalletConnectProvider";

function RelayWagmiBridge({ children }: { children: ReactNode }) {
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
  const { chains, viemChains } = useRelayChains(MAINNET_RELAY_API);

  useEffect(() => {
    if (!wagmiConfig && viemChains && viemChains.length > 0) {
      setWagmiConfig(createWagmiConfig(viemChains));
    }
  }, [viemChains, wagmiConfig]);

  if (!wagmiConfig || !chains) {
    return null;
  }

  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <SolanaWalletProvider>
        <RelayKitProvider
          theme={relayKitTheme}
          options={{
            appName: "TrollERC20",
            source: "troll.run",
            themeScheme: "dark",
            chains,
            baseApiUrl: MAINNET_RELAY_API,
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
