import type { WidgetConfig } from "@lifi/widget";
import { CONTRACT_ADDRESS } from "./constants";

export const ETHEREUM_CHAIN_ID = 1;

export const lifiWidgetConfig: WidgetConfig = {
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
