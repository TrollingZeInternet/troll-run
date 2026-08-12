"use client";

import { LogOut, Wallet } from "lucide-react";
import type { LinkedWallet } from "@relayprotocol/relay-kit-ui";

interface WalletStatusBarProps {
  linkedWallets: LinkedWallet[];
  primaryAddress?: string;
  onOpenWalletModal: () => void;
  onDisconnectAll: () => void;
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletStatusBar({
  linkedWallets,
  primaryAddress,
  onOpenWalletModal,
  onDisconnectAll,
}: WalletStatusBarProps) {
  if (linkedWallets.length === 0) {
    return null;
  }

  const activeWallet =
    linkedWallets.find((wallet) =>
      wallet.vmType === "evm"
        ? wallet.address.toLowerCase() === primaryAddress?.toLowerCase()
        : wallet.address === primaryAddress,
    ) ?? linkedWallets[0];

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2">
        <Wallet size={14} className="shrink-0 text-troll-green" />
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
            Connected
          </p>
          <p className="truncate text-sm font-semibold text-white">
            {truncateAddress(activeWallet.address)}
            <span className="ml-2 text-xs font-medium uppercase text-zinc-500">
              {activeWallet.vmType}
            </span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenWalletModal}
          className="rounded-full border border-troll-green/25 bg-troll-green/10 px-3 py-1.5 text-xs font-bold text-troll-green transition hover:bg-troll-green/20"
        >
          Switch wallet
        </button>
        <button
          type="button"
          onClick={() => void onDisconnectAll()}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={12} />
          Disconnect
        </button>
      </div>
    </div>
  );
}
