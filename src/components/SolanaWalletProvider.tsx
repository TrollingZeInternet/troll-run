"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { useMemo, type ReactNode } from "react";
import { SOLANA_RPC_URL } from "@/lib/relay-config";

export default function SolanaWalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider
      endpoint={SOLANA_RPC_URL}
      config={{ commitment: "confirmed" }}
    >
      <WalletProvider
        wallets={wallets}
        autoConnect={false}
        localStorageKey="troll-solana-wallet"
      >
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
