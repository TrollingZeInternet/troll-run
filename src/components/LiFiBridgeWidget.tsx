"use client";

import { useMemo, useRef, type ReactNode } from "react";
import type { WidgetConfig } from "@lifi/widget";
import {
  LiFiWidget,
  WidgetSkeleton,
  useWidgetChains,
} from "@lifi/widget";
import {
  EthereumProvider,
  createDefaultWagmiConfig,
  useSyncWagmiConfig,
} from "@lifi/widget-provider-ethereum";
import { injected } from "@wagmi/connectors";
import type { Config, CreateConnectorFn } from "wagmi";
import { WagmiProvider } from "wagmi";
import ClientOnly from "./ClientOnly";
import Web3Providers from "./Web3Providers";
import {
  createLifiWidgetConfig,
  getEthereumProviderConfig,
  WALLET_CONNECT_PROJECT_ID,
} from "@/lib/lifi-config";

function WagmiChainSync({
  wagmiConfig,
  connectors,
  widgetConfig,
  children,
}: {
  wagmiConfig: Config;
  connectors: CreateConnectorFn[];
  widgetConfig: WidgetConfig;
  children: ReactNode;
}) {
  const { chains } = useWidgetChains(widgetConfig);
  useSyncWagmiConfig(wagmiConfig, connectors, chains);
  return children;
}

function useWagmiSetup() {
  const wagmi = useRef<ReturnType<typeof createDefaultWagmiConfig> | null>(null);

  if (!wagmi.current) {
    const ethereumConfig = getEthereumProviderConfig();

    wagmi.current = createDefaultWagmiConfig({
      walletConnect: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
      },
      metaMask:
        typeof ethereumConfig.metaMask === "object"
          ? ethereumConfig.metaMask
          : undefined,
      connectors: [injected()],
      wagmiConfig: {
        ssr: true,
        multiInjectedProviderDiscovery: true,
      },
    });
  }

  return wagmi.current;
}

export default function LiFiBridgeWidget() {
  const wagmiSetup = useWagmiSetup();

  const widgetConfig = useMemo(
    () =>
      createLifiWidgetConfig([
        EthereumProvider(getEthereumProviderConfig()),
      ]),
    [],
  );

  const skeletonConfig = {
    appearance: widgetConfig.appearance,
    variant: widgetConfig.variant,
    theme: widgetConfig.theme,
  } as Partial<WidgetConfig>;

  return (
    <ClientOnly fallback={<WidgetSkeleton config={skeletonConfig} />}>
      <Web3Providers>
        <WagmiProvider config={wagmiSetup.config} reconnectOnMount={false}>
          <WagmiChainSync
            wagmiConfig={wagmiSetup.config}
            connectors={wagmiSetup.connectors}
            widgetConfig={widgetConfig}
          >
            <LiFiWidget integrator="troll.run" config={widgetConfig} />
          </WagmiChainSync>
        </WagmiProvider>
      </Web3Providers>
    </ClientOnly>
  );
}
