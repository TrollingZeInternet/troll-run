import type { RelayKitTheme, Token } from "@relayprotocol/relay-kit-ui";
import type { RelayChain } from "@relayprotocol/relay-sdk";
import {
  CONTRACT_ADDRESS,
  TROLLFACE_IMAGE,
} from "./constants";

export const ETHEREUM_CHAIN_ID = 1;

/** Relay chain ID for Solana mainnet */
export const SOLANA_CHAIN_ID = 792703809;

/** Native SOL mint — Relay's useSolanaBalance treats this as getBalance, not SPL. */
export const SOLANA_NATIVE_ADDRESS = "11111111111111111111111111111111";

export const SOLANA_RPC_PROXY_PATH = "/api/solana-rpc";

const DEFAULT_SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

function isAbsoluteHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

function absoluteRpcUrl(value: string | undefined, fallback: string): string {
  return value && isAbsoluteHttpUrl(value) ? value : fallback;
}

/** Upstream JSON-RPC used by the same-origin proxy. Always http(s). */
export const SOLANA_UPSTREAM_RPC_URL = absoluteRpcUrl(
  process.env.SOLANA_RPC_URL,
  DEFAULT_SOLANA_RPC_URL,
);

/**
 * Absolute Solana RPC for web3.js Connection and Relay httpRpcUrl.
 * Relative paths crash Connection ("Endpoint URL must start with `http:` or `https:`").
 * On the client, prefer the same-origin proxy; otherwise the public RPC.
 */
export function getSolanaRpcUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
  if (configured && isAbsoluteHttpUrl(configured)) {
    return configured;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${SOLANA_RPC_PROXY_PATH}`;
  }

  return SOLANA_UPSTREAM_RPC_URL;
}

/** Always an absolute http(s) URL. Prefer getSolanaRpcUrl() in client components. */
export const SOLANA_RPC_URL = getSolanaRpcUrl();

/**
 * Explicit Solana chain config for RelayKitProvider.
 * This ensures getSvmNativeChains() returns a valid entry with httpRpcUrl,
 * allowing native SOL balance to be fetched via RPC (merged with Codex SPL tokens).
 * Matches the shape expected by useCodexBalances / getSvmNativeChains.
 */
export const SOLANA_CHAIN_CONFIG: RelayChain = {
  id: SOLANA_CHAIN_ID,
  name: "Solana",
  displayName: "Solana",
  vmType: "svm",
  httpRpcUrl: SOLANA_UPSTREAM_RPC_URL,
  currency: {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
    address: SOLANA_NATIVE_ADDRESS,
  },
};

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
  "5432e3507d41270bee46b7b85bbc2ef8";

/** Default swap input amount — Relay calls parseUnits during render; empty string crashes. */
export const RELAY_DEFAULT_SWAP_AMOUNT = "0";

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
