import { injected, walletConnect } from "@wagmi/connectors";
import { createConfig, http, type Config } from "wagmi";
import { mainnet, type Chain } from "wagmi/chains";
import type { EIP1193Provider } from "viem";
import { getRabbyProviderFromWindow } from "./wallet-detection";
import { WALLET_CONNECT_PROJECT_ID } from "./relay-config";

const appMetadata = {
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
};

export const EVM_WALLET_OPTIONS = [
  { id: "metaMask", label: "MetaMask", connectorId: "metaMask" },
  { id: "rabby", label: "Rabby", connectorId: "rabby" },
  {
    id: "coinbaseWallet",
    label: "Coinbase Wallet",
    connectorId: "coinbaseWallet",
  },
  { id: "walletConnect", label: "WalletConnect", connectorId: "walletConnect" },
] as const;

export type EvmWalletId = (typeof EVM_WALLET_OPTIONS)[number]["id"];

function createConnectors() {
  return [
    injected({ target: "metaMask" }),
    injected({
      target: {
        id: "rabby",
        name: "Rabby Wallet",
        provider(window) {
          return getRabbyProviderFromWindow(
            window as Parameters<typeof getRabbyProviderFromWindow>[0],
          ) as EIP1193Provider | undefined;
        },
      },
    }),
    injected({ target: "coinbaseWallet" }),
    walletConnect({
      projectId: WALLET_CONNECT_PROJECT_ID,
      showQrModal: true,
      metadata: appMetadata,
    }),
  ];
}

export function createWagmiConfig(viemChains: Chain[]): Config {
  const chains = (
    viemChains.length > 0 ? viemChains : [mainnet]
  ) as [Chain, ...Chain[]];

  return createConfig({
    chains,
    connectors: createConnectors(),
    multiInjectedProviderDiscovery: false,
    ssr: true,
    transports: Object.fromEntries(
      chains.map((chain) => [chain.id, http()]),
    ),
  });
}

export function getConnectorById(config: Config, walletId: EvmWalletId) {
  const option = EVM_WALLET_OPTIONS.find((entry) => entry.id === walletId);

  if (!option) {
    return undefined;
  }

  return config.connectors.find(
    (connector) => connector.id === option.connectorId,
  );
}
