"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { useMemo, type ReactNode } from "react";
import { getSolanaRpcUrl } from "@/lib/relay-config";

export default function SolanaWalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );
  const endpoint = useMemo(() => getSolanaRpcUrl(), []);

  return (
    <ConnectionProvider
      endpoint={endpoint}
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
