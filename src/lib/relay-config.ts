import type { RelayKitTheme, Token } from "@relayprotocol/relay-kit-ui";
import {
  CONTRACT_ADDRESS,
  TROLLFACE_IMAGE,
} from "./constants";

export const ETHEREUM_CHAIN_ID = 1;

/** Relay chain ID for Solana mainnet */
export const SOLANA_CHAIN_ID = 792703809;

export const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "5432e3507d41270bee46b7b85bbc2ef8";

export const TROLL_TOKEN: Token = {
  chainId: ETHEREUM_CHAIN_ID,
  address: CONTRACT_ADDRESS,
  decimals: 18,
  name: "TrollERC20",
  symbol: "TROLL",
  logoURI: TROLLFACE_IMAGE,
};

export const relayKitTheme: RelayKitTheme = {
  font: "var(--font-space-grotesk), system-ui, sans-serif",
  primaryColor: "#22c55e",
  focusColor: "#22c55e",
  subtleBackgroundColor: "#0a0a0a",
  subtleBorderColor: "rgba(34, 197, 94, 0.15)",
  text: {
    default: "#fafafa",
    subtle: "#a1a1aa",
    error: "#ef4444",
    success: "#22c55e",
  },
  buttons: {
    borderRadius: "9999px",
    primary: {
      color: "#000000",
      background: "#22c55e",
      hover: {
        color: "#000000",
        background: "#4ade80",
      },
    },
    secondary: {
      color: "#fafafa",
      background: "rgba(255, 255, 255, 0.06)",
      hover: {
        color: "#fafafa",
        background: "rgba(34, 197, 94, 0.15)",
      },
    },
    disabled: {
      color: "#71717a",
      background: "rgba(255, 255, 255, 0.04)",
    },
  },
  input: {
    background: "#030303",
    borderRadius: "12px",
    color: "#fafafa",
  },
  skeleton: {
    background: "rgba(255, 255, 255, 0.06)",
  },
  anchor: {
    color: "#22c55e",
    hover: {
      color: "#4ade80",
    },
  },
  dropdown: {
    background: "#0a0a0a",
    borderRadius: "12px",
    border: "1px solid rgba(34, 197, 94, 0.15)",
  },
  widget: {
    background: "#0a0a0a",
    borderRadius: "20px",
    border: "1px solid rgba(34, 197, 94, 0.12)",
    boxShadow: "0 0 60px rgba(34, 197, 94, 0.08)",
    card: {
      background: "#0a0a0a",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      gutter: "12px",
    },
    selector: {
      background: "rgba(255, 255, 255, 0.04)",
      hover: {
        background: "rgba(34, 197, 94, 0.1)",
      },
    },
    swapCurrencyButtonBorderColor: "rgba(34, 197, 94, 0.25)",
    swapCurrencyButtonBorderWidth: "1px",
    swapCurrencyButtonBorderRadius: "9999px",
  },
  modal: {
    background: "#0a0a0a",
    border: "1px solid rgba(34, 197, 94, 0.15)",
    borderRadius: "16px",
  },
};
