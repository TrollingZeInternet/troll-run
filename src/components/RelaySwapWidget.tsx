"use client";

import { SwapWidget, type Token } from "@relayprotocol/relay-kit-ui";
import { adaptSolanaWallet } from "@relayprotocol/relay-svm-wallet-adapter";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import ClientOnly from "./ClientOnly";
import RelayProviders from "./RelayProviders";
import WalletStatusBar from "./WalletStatusBar";
import WidgetErrorBoundary from "./WidgetErrorBoundary";
import { useWalletConnect } from "./WalletConnectProvider";
import {
  ETHEREUM_CHAIN_ID,
  RELAY_DEFAULT_SWAP_AMOUNT,
  SOLANA_CHAIN_ID,
  SOLANA_NATIVE_ADDRESS,
  TROLL_TOKEN,
} from "@/lib/relay-config";
import { resolvePrimaryVmType } from "@/lib/wallet-utils";

function WidgetSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="mx-auto h-10 w-10 rounded-full bg-white/5" />
      <div className="h-24 rounded-2xl bg-white/5" />
      <div className="h-12 rounded-full bg-white/5" />
    </div>
  );
}

/** Destination token is locked — ignore widget callbacks to avoid parent re-renders during selection. */
function lockedSetToToken(_token?: Token) {}

function RelaySwapWidgetInner() {
  const { connection } = useConnection();
  const { publicKey, wallet: solanaWallet, connected: isSolanaConnected } =
    useWallet();
  const {
    linkedWallets,
    primaryAddress,
    openConnectModal,
    linkWallet,
    setPrimaryAddress,
    disconnectAllWallets,
  } = useWalletConnect();

  const primaryVmType = resolvePrimaryVmType(primaryAddress, linkedWallets);

  const solanaAdaptedWallet = useMemo(() => {
    if (!publicKey || !solanaWallet?.adapter || !isSolanaConnected) {
      return undefined;
    }

    const walletAddress = publicKey.toBase58();
    const adapter = solanaWallet.adapter;

    try {
      return {
        ...adaptSolanaWallet(
          walletAddress,
          SOLANA_CHAIN_ID,
          connection,
          async (transaction, options) => {
            const signature = await adapter.sendTransaction(
              transaction,
              connection,
              options,
            );
            return { signature };
          },
        ),
        // Relay prefers wallet.getBalance over useSolanaBalance when present.
        getBalance: async (
          _chainId: number,
          ownerAddress: string,
          tokenAddress?: string,
        ) => {
          const owner = new PublicKey(ownerAddress);
          if (!tokenAddress || tokenAddress === SOLANA_NATIVE_ADDRESS) {
            return BigInt(await connection.getBalance(owner));
          }

          const { value } = await connection.getParsedTokenAccountsByOwner(
            owner,
            { mint: new PublicKey(tokenAddress) },
          );

          return value.reduce((total, account) => {
            const amount =
              "parsed" in account.account.data
                ? account.account.data.parsed?.info?.tokenAmount?.amount
                : undefined;
            return total + BigInt(amount ?? 0);
          }, BigInt(0));
        },
      };
    } catch {
      return undefined;
    }
  }, [connection, isSolanaConnected, publicKey, solanaWallet?.adapter]);

  // Pass the adapted Solana wallet *only* when SVM is the resolved primary VM type.
  // This allows Relay to use its full SVM balance hooks (useCodexBalances + native SOL merge)
  // for correct token balances in the widget when a Solana wallet is primary/active.
  // EVM flows remain unchanged (wallet=undefined, falls back to wagmi/RelayKitProvider).
  const activeWallet =
    primaryVmType === "svm" ? solanaAdaptedWallet : undefined;

  const isSolanaWalletBootstrapping =
    primaryVmType === "svm" && isSolanaConnected && !solanaAdaptedWallet;

  const handleSetPrimaryWallet = useCallback(
    (address: string) => {
      // Use direct set (no queueMicrotask) to ensure immediate sync between widget's
      // onSetPrimaryWallet callback and our primaryAddress state. This fixes balance
      // display lag and ensures Relay's useWalletAddress / useMultiWalletBalances
      // immediately sees the correct wallet for the selected From token.
      setPrimaryAddress(address);
    },
    [setPrimaryAddress],
  );

  const handleOpenConnectModal = useCallback(() => {
    openConnectModal();
  }, [openConnectModal]);

  const handleSwapError = useCallback((error: string) => {
    console.error("Relay swap widget error:", error);
  }, []);

  if (isSolanaWalletBootstrapping) {
    return <WidgetSkeleton />;
  }

  return (
    <>
      <WalletStatusBar
        linkedWallets={linkedWallets}
        primaryAddress={primaryAddress}
        onOpenWalletModal={handleOpenConnectModal}
        onDisconnectAll={disconnectAllWallets}
      />
      <WidgetErrorBoundary>
        <SwapWidget
          wallet={activeWallet}
          toToken={TROLL_TOKEN}
          setToToken={lockedSetToToken}
          defaultAmount={RELAY_DEFAULT_SWAP_AMOUNT}
          lockToToken
          lockChainId={ETHEREUM_CHAIN_ID}
          multiWalletSupportEnabled
          linkedWallets={linkedWallets}
          supportedWalletVMs={["evm", "svm"]}
          onConnectWallet={handleOpenConnectModal}
          onLinkNewWallet={linkWallet}
          onSetPrimaryWallet={handleSetPrimaryWallet}
          onSwapError={handleSwapError}
          popularChainIds={[
            SOLANA_CHAIN_ID,
            1,
            8453,
            42161,
            10,
            137,
            56,
          ]}
        />
      </WidgetErrorBoundary>
    </>
  );
}

export default function RelaySwapWidget() {
  return (
    <ClientOnly fallback={<WidgetSkeleton />}>
      <RelayProviders>
        <RelaySwapWidgetInner />
      </RelayProviders>
    </ClientOnly>
  );
}
