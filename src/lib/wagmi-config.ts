import { injected, walletConnect } from "@wagmi/connectors";
import { createConfig, http, type Config } from "wagmi";
import { mainnet, type Chain } from "wagmi/chains";
import type { EIP1193Provider } from "viem";
import { EIP6963_RDNS } from "./eip6963";
import {
  getCoinbaseEvmProvider,
  getMetaMaskProvider,
  getRabbyProvider,
  getTrustWalletProvider,
} from "./wallet-detection";
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
  {
    id: "metaMask",
    label: "MetaMask",
    connectorId: EIP6963_RDNS.metaMask,
  },
  {
    id: "trustWallet",
    label: "Trust Wallet",
    connectorId: EIP6963_RDNS.trustWallet,
  },
  { id: "rabby", label: "Rabby", connectorId: EIP6963_RDNS.rabby },
  {
    id: "coinbaseWallet",
    label: "Coinbase Wallet",
    connectorId: EIP6963_RDNS.coinbaseWallet,
  },
  { id: "walletConnect", label: "WalletConnect", connectorId: "walletConnect" },
] as const;

export type EvmWalletId = (typeof EVM_WALLET_OPTIONS)[number]["id"];

function createInjectedConnector(
  id: string,
  name: string,
  resolveProvider: () => EIP1193Provider | undefined,
) {
  return injected({
    target: {
      id,
      name,
      provider() {
        return resolveProvider();
      },
    },
  });
}

function createConnectors() {
  return [
    createInjectedConnector(EIP6963_RDNS.metaMask, "MetaMask", () =>
      getMetaMaskProvider(),
    ),
    createInjectedConnector(EIP6963_RDNS.trustWallet, "Trust Wallet", () =>
      getTrustWalletProvider(),
    ),
    createInjectedConnector(EIP6963_RDNS.rabby, "Rabby", () =>
      getRabbyProvider(),
    ),
    createInjectedConnector(EIP6963_RDNS.coinbaseWallet, "Coinbase Wallet", () =>
      getCoinbaseEvmProvider(),
    ),
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
