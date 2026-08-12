"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import { X } from "lucide-react";
import { useCallback } from "react";
import type { EvmWalletId } from "@/lib/wagmi-config";

interface WalletConnectModalProps {
  open: boolean;
  filter: "all" | "evm" | "svm";
  onClose: () => void;
  onEvmConnect: (walletId: EvmWalletId) => Promise<void>;
  evmWalletOptions: ReadonlyArray<{ id: EvmWalletId; label: string }>;
  isEvmConnecting: boolean;
  isEvmConnected: boolean;
  isSolanaConnected: boolean;
  evmAddress?: string;
  solanaAddress?: string;
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function WalletConnectModal({
  open,
  filter,
  onClose,
  onEvmConnect,
  evmWalletOptions,
  isEvmConnecting,
  isEvmConnected,
  isSolanaConnected,
  evmAddress,
  solanaAddress,
}: WalletConnectModalProps) {
  const { wallets, select, connect, connecting, connected, wallet } =
    useWallet();

  const solanaWalletOptions = wallets.filter((item) =>
    ["Phantom", "Solflare", "Coinbase Wallet"].includes(item.adapter.name),
  );

  const handleSolanaConnect = useCallback(
    async (walletName: WalletName) => {
      try {
        select(walletName);
        await connect();
      } catch {
        // User rejected or wallet unavailable — modal stays open.
      }
    },
    [connect, select],
  );

  if (!open) {
    return null;
  }

  const showEvm = filter === "all" || filter === "evm";
  const showSolana = filter === "all" || filter === "svm";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close wallet modal"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-troll-green/20 bg-[#0a0a0a] p-6 shadow-[0_0_80px_rgba(34,197,94,0.15)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white">Connect Wallet</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Choose an EVM or Solana wallet to bridge into $TROLL.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {showEvm && (
          <section className="mb-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
              EVM Wallets
            </p>
            {isEvmConnected && evmAddress ? (
              <div className="rounded-xl border border-troll-green/20 bg-troll-green/10 px-4 py-3 text-sm text-white">
                Connected: {truncateAddress(evmAddress)}
              </div>
            ) : (
              <div className="space-y-2">
                {evmWalletOptions.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    disabled={isEvmConnecting}
                    onClick={() => void onEvmConnect(id)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-troll-green/30 hover:bg-troll-green/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{label}</span>
                    <span className="text-xs text-zinc-500">
                      {isEvmConnecting ? "Connecting…" : "Connect"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {showSolana && (
          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
              Solana Wallets
            </p>
            {isSolanaConnected && solanaAddress ? (
              <div className="rounded-xl border border-troll-green/20 bg-troll-green/10 px-4 py-3 text-sm text-white">
                Connected: {truncateAddress(solanaAddress)}
                {wallet?.adapter.name ? ` (${wallet.adapter.name})` : ""}
              </div>
            ) : (
              <div className="space-y-2">
                {solanaWalletOptions.map((item) => {
                  const installed = item.readyState === "Installed";

                  return (
                    <button
                      key={item.adapter.name}
                      type="button"
                      disabled={connecting || connected}
                      onClick={() =>
                        handleSolanaConnect(item.adapter.name as WalletName)
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-troll-green/30 hover:bg-troll-green/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span>{item.adapter.name}</span>
                      <span className="text-xs text-zinc-500">
                        {installed ? "Detected" : "Install"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
