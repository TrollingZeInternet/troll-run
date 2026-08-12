"use client";

import { X } from "lucide-react";
import {
  isEvmWalletInstalled,
  isSolanaWalletInstalled,
  type SolanaWalletName,
} from "@/lib/wallet-detection";
import type { EvmWalletId } from "@/lib/wagmi-config";

interface WalletConnectModalProps {
  open: boolean;
  filter: "all" | "evm" | "svm";
  onClose: () => void;
  onEvmConnect: (walletId: EvmWalletId) => Promise<void>;
  onSolanaConnect: (walletName: SolanaWalletName) => Promise<void>;
  onDisconnectEvm: () => void;
  onDisconnectSolana: () => void;
  onDisconnectAll: () => void;
  evmWalletOptions: ReadonlyArray<{
    id: EvmWalletId;
    label: string;
    connectorId: string;
  }>;
  isEvmConnecting: boolean;
  isEvmConnected: boolean;
  isSolanaConnected: boolean;
  evmAddress?: string;
  solanaAddress?: string;
  activeEvmConnectorId?: string;
  activeSolanaWalletName?: string;
  connectError: string | null;
}

const SOLANA_WALLET_OPTIONS: Array<{
  name: SolanaWalletName;
  label: string;
}> = [
  { name: "Phantom", label: "Phantom" },
  { name: "Solflare", label: "Solflare" },
];

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function getEvmWalletStatus(walletId: EvmWalletId): string {
  if (walletId === "walletConnect") {
    return "QR code";
  }

  return isEvmWalletInstalled(walletId) ? "Detected" : "Install";
}

function isActiveEvmWallet(
  connectorId: string,
  activeEvmConnectorId?: string,
): boolean {
  return Boolean(
    activeEvmConnectorId && activeEvmConnectorId === connectorId,
  );
}

export default function WalletConnectModal({
  open,
  filter,
  onClose,
  onEvmConnect,
  onSolanaConnect,
  onDisconnectEvm,
  onDisconnectSolana,
  onDisconnectAll,
  evmWalletOptions,
  isEvmConnecting,
  isEvmConnected,
  isSolanaConnected,
  evmAddress,
  solanaAddress,
  activeEvmConnectorId,
  activeSolanaWalletName,
  connectError,
}: WalletConnectModalProps) {
  if (!open) {
    return null;
  }

  const showEvm = filter === "all" || filter === "evm";
  const showSolana = filter === "all" || filter === "svm";
  const hasAnyConnection = isEvmConnected || isSolanaConnected;

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
            <h3 className="text-lg font-black text-white">
              {hasAnyConnection ? "Manage Wallets" : "Connect Wallet"}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Connect, switch, or disconnect EVM and Solana wallets for bridging
              into $TROLL.
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

        {connectError ? (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {connectError}
          </div>
        ) : null}

        {hasAnyConnection ? (
          <div className="mb-4 space-y-2">
            {isEvmConnected && evmAddress ? (
              <div className="flex items-center justify-between rounded-xl border border-troll-green/20 bg-troll-green/10 px-4 py-3 text-sm text-white">
                <span>EVM: {truncateAddress(evmAddress)}</span>
                <button
                  type="button"
                  onClick={onDisconnectEvm}
                  className="text-xs font-semibold text-red-300 transition hover:text-red-200"
                >
                  Disconnect
                </button>
              </div>
            ) : null}
            {isSolanaConnected && solanaAddress ? (
              <div className="flex items-center justify-between rounded-xl border border-troll-green/20 bg-troll-green/10 px-4 py-3 text-sm text-white">
                <span>Solana: {truncateAddress(solanaAddress)}</span>
                <button
                  type="button"
                  onClick={onDisconnectSolana}
                  className="text-xs font-semibold text-red-300 transition hover:text-red-200"
                >
                  Disconnect
                </button>
              </div>
            ) : null}
            {(isEvmConnected && isSolanaConnected) || hasAnyConnection ? (
              <button
                type="button"
                onClick={onDisconnectAll}
                className="w-full rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                Disconnect all wallets
              </button>
            ) : null}
          </div>
        ) : null}

        {showEvm && (
          <section className="mb-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
              EVM Wallets
            </p>
            <div className="space-y-2">
              {evmWalletOptions.map(({ id, label, connectorId }) => {
                const status = getEvmWalletStatus(id);
                const isActive = isActiveEvmWallet(
                  connectorId,
                  activeEvmConnectorId,
                );

                return (
                  <button
                    key={id}
                    type="button"
                    disabled={isEvmConnecting}
                    onClick={() => void onEvmConnect(id)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-troll-green/30 hover:bg-troll-green/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{label}</span>
                    <span className="text-xs text-zinc-500">
                      {isActive
                        ? "Active"
                        : isEvmConnecting
                          ? "Connecting…"
                          : status}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {showSolana && (
          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
              Solana Wallets
            </p>
            <div className="space-y-2">
              {SOLANA_WALLET_OPTIONS.map(({ name, label }) => {
                const installed = isSolanaWalletInstalled(name);
                const isActive =
                  isSolanaConnected && activeSolanaWalletName === name;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => void onSolanaConnect(name)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-left text-sm font-semibold text-white transition hover:border-troll-green/30 hover:bg-troll-green/10"
                  >
                    <span>{label}</span>
                    <span className="text-xs text-zinc-500">
                      {isActive ? "Active" : installed ? "Detected" : "Install"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
