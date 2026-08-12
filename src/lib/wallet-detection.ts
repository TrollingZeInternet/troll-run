import type { EvmWalletId } from "./wagmi-config";

type Eip1193Provider = {
  request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
  isRabby?: boolean;
  isCoinbaseWallet?: boolean;
  providers?: Eip1193Provider[];
};

type BrowserWindow = Window & {
  ethereum?: Eip1193Provider;
  rabby?: Eip1193Provider;
  coinbaseWalletExtension?: Eip1193Provider;
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
  predicate: (provider: Eip1193Provider) => boolean,
): Eip1193Provider | undefined {
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

export function getMetaMaskProvider(): Eip1193Provider | undefined {
  return findEthereumProvider((provider) => {
    if (!provider.isMetaMask) {
      return false;
    }

    const impersonators = [
      "isRabby",
      "isBraveWallet",
      "isPhantom",
      "isCoinbaseWallet",
    ] as const;

    return !impersonators.some((flag) =>
      Boolean((provider as Record<string, unknown>)[flag]),
    );
  });
}

export function getRabbyProviderFromWindow(
  browserWindow?: BrowserWindow,
): Eip1193Provider | undefined {
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
    (provider: Eip1193Provider) => provider.isRabby,
  );
}

export function getRabbyProvider(): Eip1193Provider | undefined {
  return getRabbyProviderFromWindow();
}

export function getCoinbaseEvmProvider(): Eip1193Provider | undefined {
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
      return Boolean(getMetaMaskProvider());
    case "rabby":
      return Boolean(getRabbyProvider());
    case "coinbaseWallet":
      return Boolean(getCoinbaseEvmProvider());
    default:
      return false;
  }
}

export function getEvmWalletInstallUrl(walletId: EvmWalletId): string | null {
  switch (walletId) {
    case "metaMask":
      return "https://metamask.io/download/";
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
