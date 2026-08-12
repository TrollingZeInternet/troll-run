import type { WidgetConfig } from "@lifi/widget";
import type { EthereumProviderConfig } from "@lifi/widget-provider-ethereum";
import { CONTRACT_ADDRESS } from "./constants";

export const ETHEREUM_CHAIN_ID = 1;

/** LI.FI demo project ID — override with NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID on Vercel */
export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "5432e3507d41270bee46b7b85bbc2ef8";

export function getEthereumProviderConfig(): EthereumProviderConfig {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://troll.run";

  return {
    metaMask: {
      dappMetadata: {
        name: "TrollERC20",
        url: origin,
        iconUrl: `${origin}/images/Trollface.jpg`,
      },
    },
    walletConnect: {
      projectId: WALLET_CONNECT_PROJECT_ID,
      showQrModal: true,
    },
  } satisfies EthereumProviderConfig;
}

export function createLifiWidgetConfig(
  providers: NonNullable<WidgetConfig["providers"]>,
): WidgetConfig {
  return {
    integrator: "troll.run",
    appearance: "dark",
    variant: "wide",

    toChain: ETHEREUM_CHAIN_ID,
    toToken: CONTRACT_ADDRESS,

    chains: {
      to: {
        allow: [ETHEREUM_CHAIN_ID],
      },
    },

    tokens: {
      to: {
        allow: [
          {
            address: CONTRACT_ADDRESS,
            chainId: ETHEREUM_CHAIN_ID,
          },
        ],
      },
    },

    hiddenUI: {
      toToken: true,
      appearance: true,
      reverseTokensButton: true,
    },

    disabledUI: {
      toToken: true,
    },

    walletConfig: {
      forceInternalWalletManagement: false,
    },

    providers,

    theme: {
      colorSchemes: {
        dark: {
          palette: {
            primary: {
              main: "#22c55e",
              dark: "#16a34a",
              light: "#4ade80",
            },
            success: {
              main: "#22c55e",
            },
            background: {
              default: "#030303",
              paper: "#0a0a0a",
            },
            text: {
              primary: "#fafafa",
              secondary: "#a1a1aa",
            },
          },
        },
      },
      shape: {
        borderRadius: 16,
        borderRadiusSecondary: 12,
        borderRadiusTertiary: 8,
      },
      container: {
        borderRadius: "20px",
        border: "1px solid rgba(34, 197, 94, 0.12)",
        backgroundColor: "#0a0a0a",
        boxShadow: "0 0 60px rgba(34, 197, 94, 0.08)",
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
      },
    },
  };
}

/** @deprecated Use createLifiWidgetConfig() in the client widget component */
export const lifiWidgetConfig = createLifiWidgetConfig([]);
