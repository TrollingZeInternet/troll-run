import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "@wagmi/connectors";
import { createConfig, http, type Config } from "wagmi";
import { mainnet, type Chain } from "wagmi/chains";
import type { EIP1193Provider } from "viem";
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
  { id: "metaMask", label: "MetaMask" },
  { id: "rabby", label: "Rabby" },
  { id: "coinbaseWallet", label: "Coinbase Wallet" },
  { id: "walletConnect", label: "WalletConnect" },
] as const;

export type EvmWalletId = (typeof EVM_WALLET_OPTIONS)[number]["id"];

function createConnectors() {
  return [
    metaMask({ dappMetadata: appMetadata }),
    injected({
      target: {
        id: "rabby",
        name: "Rabby Wallet",
        provider(window) {
          return (window as Window & { rabby?: EIP1193Provider }).rabby;
        },
      },
    }),
    coinbaseWallet({ appName: appMetadata.name }),
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

export function getConnectorById(
  config: Config,
  walletId: EvmWalletId,
) {
  return config.connectors.find((connector) => connector.id === walletId);
}
