import type { LinkedWallet } from "@relayprotocol/relay-kit-ui";

export function normalizeSolanaConnector(name?: string): string {
  return (name ?? "phantom").toLowerCase();
}

export function findLinkedWallet(
  linkedWallets: LinkedWallet[],
  address?: string,
): LinkedWallet | undefined {
  if (!address) {
    return undefined;
  }

  return linkedWallets.find((wallet) =>
    wallet.vmType === "evm"
      ? wallet.address.toLowerCase() === address.toLowerCase()
      : wallet.address === address,
  );
}

export function resolvePrimaryVmType(
  primaryAddress: string | undefined,
  linkedWallets: LinkedWallet[],
): "evm" | "svm" | undefined {
  const linked = findLinkedWallet(linkedWallets, primaryAddress);

  if (linked?.vmType === "svm" || linked?.vmType === "evm") {
    return linked.vmType;
  }

  const hasEvm = linkedWallets.some((wallet) => wallet.vmType === "evm");
  const hasSvm = linkedWallets.some((wallet) => wallet.vmType === "svm");

  if (hasEvm) {
    return "evm";
  }

  if (hasSvm) {
    return "svm";
  }

  return undefined;
}
