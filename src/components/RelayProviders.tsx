"use client";

import { RelayKitProvider } from "@relayprotocol/relay-kit-ui";
import { useRelayChains } from "@relayprotocol/relay-kit-hooks";
import { MAINNET_RELAY_API } from "@relayprotocol/relay-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, walletConnect } from "@wagmi/connectors";
import { useEffect, useState, type ReactNode } from "react";
import {
  createConfig,
  http,
  WagmiProvider,
  type Config,
} from "wagmi";
import { mainnet, type Chain } from "wagmi/chains";
import { relayKitTheme, WALLET_CONNECT_PROJECT_ID } from "@/lib/relay-config";

function createWagmiConfig(viemChains: Chain[]): Config {
  const chains = viemChains.length > 0 ? viemChains : [mainnet];

  return createConfig({
    chains: chains as [Chain, ...Chain[]],
    connectors: [
      injected({ shimDisconnect: true }),
      walletConnect({
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
        metadata: {
          name: "TrollERC20",
          description: "Bridge and swap to TrollERC20 on Ethereum",
          url:
            typeof window !== "undefined"
              ? window.location.origin
              : "https://troll.run",
          icons: [
            `${
              typeof window !== "undefined"
                ? window.location.origin
                : "https://troll.run"
            }/images/Trollface.jpg`,
          ],
        },
      }),
    ],
    transports: Object.fromEntries(
      chains.map((chain) => [chain.id, http()]),
    ),
    ssr: true,
  });
}

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
      <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
        {children}
      </WagmiProvider>
    </RelayKitProvider>
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
