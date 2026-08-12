import type { EIP1193Provider } from "viem";

export type Eip6963ProviderInfo = {
  rdns: string;
  uuid: string;
  name: string;
  icon: string;
};

export type Eip6963ProviderDetail = {
  info: Eip6963ProviderInfo;
  provider: EIP1193Provider;
};

export const EIP6963_RDNS = {
  metaMask: "io.metamask",
  trustWallet: "com.trustwallet.app",
  rabby: "io.rabby",
  coinbaseWallet: "com.coinbase.wallet",
} as const;

const providersByRdns = new Map<string, Eip6963ProviderDetail>();
let initialized = false;

export function initEip6963Discovery(): () => void {
  if (typeof window === "undefined" || initialized) {
    return () => {};
  }

  initialized = true;

  const onAnnounce = (event: Event) => {
    const detail = (event as CustomEvent<Eip6963ProviderDetail>).detail;

    if (detail?.info?.rdns && detail.provider) {
      providersByRdns.set(detail.info.rdns, detail);
    }
  };

  window.addEventListener("eip6963:announceProvider", onAnnounce);
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  const retryTimers = [250, 1000].map((delay) =>
    window.setTimeout(() => {
      window.dispatchEvent(new Event("eip6963:requestProvider"));
    }, delay),
  );

  return () => {
    window.removeEventListener("eip6963:announceProvider", onAnnounce);
    retryTimers.forEach((timer) => window.clearTimeout(timer));
  };
}

export function getEip6963Provider(rdns: string): EIP1193Provider | undefined {
  return providersByRdns.get(rdns)?.provider;
}

export function hasEip6963Provider(rdns: string): boolean {
  return providersByRdns.has(rdns);
}

export function getEip6963Providers(): Eip6963ProviderDetail[] {
  return Array.from(providersByRdns.values());
}
