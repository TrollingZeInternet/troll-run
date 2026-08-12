import type { EIP1193Provider } from "viem";
import {
  EIP6963_RDNS,
  getEip6963Provider,
  hasEip6963Provider,
} from "./eip6963";
import type { EvmWalletId } from "./wagmi-config";

type BrowserWindow = Window & {
  ethereum?: EIP1193Provider & {
    isMetaMask?: boolean;
    isRabby?: boolean;
    isCoinbaseWallet?: boolean;
    isTrust?: boolean;
    isTrustWallet?: boolean;
    providers?: EIP1193Provider[];
  };
  rabby?: EIP1193Provider;
  coinbaseWalletExtension?: EIP1193Provider;
  trustwallet?: EIP1193Provider;
  phantom?: {
    solana?: {
      isPhantom?: boolean;
    };
  };
  solana?: {
    isPhantom?: boolean;
  };
  solflare?: {
    isSolflare?: boolean;
  };
  SolflareApp?: unknown;
};

function getBrowserWindow(): BrowserWindow | undefined {
  return typeof window !== "undefined" ? (window as BrowserWindow) : undefined;
}

function findEthereumProvider(
  predicate: (provider: EIP1193Provider & Record<string, unknown>) => boolean,
): EIP1193Provider | undefined {
  const browserWindow = getBrowserWindow();
  const ethereum = browserWindow?.ethereum;

  if (!ethereum) {
    return undefined;
  }

  if (ethereum.providers?.length) {
    return ethereum.providers.find(predicate);
  }

  return predicate(ethereum) ? ethereum : undefined;
}

function isMetaMaskProvider(
  provider: EIP1193Provider & Record<string, unknown>,
): boolean {
  if (!provider.isMetaMask) {
    return false;
  }

  if (provider.isTrust || provider.isTrustWallet) {
    return false;
  }

  const impersonators = [
    "isRabby",
    "isBraveWallet",
    "isPhantom",
    "isCoinbaseWallet",
    "isTrust",
    "isTrustWallet",
  ] as const;

  return !impersonators.some((flag) =>
    Boolean((provider as Record<string, unknown>)[flag]),
  );
}

export function getMetaMaskProvider(): EIP1193Provider | undefined {
  const fromEip6963 = getEip6963Provider(EIP6963_RDNS.metaMask);

  if (fromEip6963) {
    return fromEip6963;
  }

  return findEthereumProvider(isMetaMaskProvider);
}

export function getTrustWalletProvider(): EIP1193Provider | undefined {
  const fromEip6963 = getEip6963Provider(EIP6963_RDNS.trustWallet);

  if (fromEip6963) {
    return fromEip6963;
  }

  const browserWindow = getBrowserWindow();

  if (browserWindow?.trustwallet) {
    return browserWindow.trustwallet;
  }

  return findEthereumProvider(
    (provider) => Boolean(provider.isTrust || provider.isTrustWallet),
  );
}

export function getRabbyProviderFromWindow(
  browserWindow?: BrowserWindow,
): EIP1193Provider | undefined {
  const fromEip6963 = getEip6963Provider(EIP6963_RDNS.rabby);

  if (fromEip6963) {
    return fromEip6963;
  }

  const win = browserWindow ?? getBrowserWindow();

  if (!win) {
    return undefined;
  }

  if (win.rabby) {
    return win.rabby;
  }

  const { ethereum } = win;

  if (!ethereum) {
    return undefined;
  }

  if (ethereum.isRabby) {
    return ethereum;
  }

  return ethereum.providers?.find(
    (provider: EIP1193Provider & { isRabby?: boolean }) => provider.isRabby,
  );
}

export function getRabbyProvider(): EIP1193Provider | undefined {
  return getRabbyProviderFromWindow();
}

export function getCoinbaseEvmProvider(): EIP1193Provider | undefined {
  const fromEip6963 = getEip6963Provider(EIP6963_RDNS.coinbaseWallet);

  if (fromEip6963) {
    return fromEip6963;
  }

  const browserWindow = getBrowserWindow();

  if (browserWindow?.coinbaseWalletExtension) {
    return browserWindow.coinbaseWalletExtension;
  }

  return findEthereumProvider((provider) => Boolean(provider.isCoinbaseWallet));
}

export function isEvmWalletInstalled(walletId: EvmWalletId): boolean {
  if (walletId === "walletConnect") {
    return true;
  }

  switch (walletId) {
    case "metaMask":
      return (
        hasEip6963Provider(EIP6963_RDNS.metaMask) ||
        Boolean(getMetaMaskProvider())
      );
    case "trustWallet":
      return (
        hasEip6963Provider(EIP6963_RDNS.trustWallet) ||
        Boolean(getTrustWalletProvider())
      );
    case "rabby":
      return (
        hasEip6963Provider(EIP6963_RDNS.rabby) ||
        Boolean(getRabbyProvider())
      );
    case "coinbaseWallet":
      return (
        hasEip6963Provider(EIP6963_RDNS.coinbaseWallet) ||
        Boolean(getCoinbaseEvmProvider())
      );
    default:
      return false;
  }
}

export function getEvmWalletInstallUrl(walletId: EvmWalletId): string | null {
  switch (walletId) {
    case "metaMask":
      return "https://metamask.io/download/";
    case "trustWallet":
      return "https://trustwallet.com/download";
    case "rabby":
      return "https://rabby.io/";
    case "coinbaseWallet":
      return "https://www.coinbase.com/wallet/downloads";
    default:
      return null;
  }
}

export function isPhantomInstalled(): boolean {
  const browserWindow = getBrowserWindow();

  if (!browserWindow) {
    return false;
  }

  return Boolean(
    browserWindow.phantom?.solana?.isPhantom ||
      browserWindow.solana?.isPhantom,
  );
}

export function isSolflareInstalled(): boolean {
  const browserWindow = getBrowserWindow();

  if (!browserWindow) {
    return false;
  }

  return Boolean(
    browserWindow.solflare?.isSolflare || browserWindow.SolflareApp,
  );
}

export type SolanaWalletName = "Phantom" | "Solflare";

export function isSolanaWalletInstalled(
  walletName: SolanaWalletName,
): boolean {
  switch (walletName) {
    case "Phantom":
      return isPhantomInstalled();
    case "Solflare":
      return isSolflareInstalled();
    default:
      return false;
  }
}

export function getSolanaWalletInstallUrl(walletName: SolanaWalletName): string {
  switch (walletName) {
    case "Phantom":
      return "https://phantom.app/download";
    case "Solflare":
      return "https://solflare.com/download";
    default:
      return "https://solflare.com/download";
  }
}
