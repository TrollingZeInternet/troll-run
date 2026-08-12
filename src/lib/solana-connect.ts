import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import {
  getSolanaWalletInstallUrl,
  isSolanaWalletInstalled,
  type SolanaWalletName,
} from "./wallet-detection";

function waitForAdapterReady(
  adapter: Wallet["adapter"],
  timeoutMs = 3000,
): Promise<boolean> {
  if (adapter.readyState === WalletReadyState.Installed) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      adapter.off("readyStateChange", handleChange);
      resolve(adapter.readyState === WalletReadyState.Installed);
    }, timeoutMs);

    const handleChange = (state: WalletReadyState) => {
      if (
        state === WalletReadyState.Installed ||
        state === WalletReadyState.Loadable
      ) {
        window.clearTimeout(timeout);
        adapter.off("readyStateChange", handleChange);
        resolve(true);
      }
    };

    adapter.on("readyStateChange", handleChange);
  });
}

export async function connectSolanaWallet(
  wallets: Wallet[],
  walletName: SolanaWalletName,
  select: (walletName: WalletName) => void,
  activeWallet: Wallet | null,
): Promise<void> {
  if (!isSolanaWalletInstalled(walletName)) {
    window.open(getSolanaWalletInstallUrl(walletName), "_blank", "noopener,noreferrer");
    return;
  }

  const target = wallets.find((entry) => entry.adapter.name === walletName);

  if (!target) {
    throw new Error(`Solana wallet not found: ${walletName}`);
  }

  if (
    activeWallet &&
    activeWallet.adapter.name !== walletName &&
    activeWallet.adapter.connected
  ) {
    await activeWallet.adapter.disconnect();
  }

  select(walletName as WalletName);
  await waitForAdapterReady(target.adapter);

  if (!isSolanaWalletInstalled(walletName)) {
    window.open(getSolanaWalletInstallUrl(walletName), "_blank", "noopener,noreferrer");
    return;
  }

  await target.adapter.connect();
}
