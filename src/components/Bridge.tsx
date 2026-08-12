import {
  ArrowRightLeft,
  CreditCard,
  ExternalLink,
  Repeat,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import RelaySwapWidget from "./RelaySwapWidget";
import CopyContractAddress from "./CopyContractAddress";
import {
  MOONPAY_BUY_ETH_URL,
  UNISWAP_SWAP_URL,
} from "@/lib/constants";

export default function Bridge() {
  return (
    <section id="bridge" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Buy & Bridge"
          title="Get TrollERC20 ($TROLL)"
          description="Three ways to buy $TROLL on Ethereum — pay with card, bridge from any chain, or swap directly on Uniswap."
        />

        <div className="grid items-start gap-6 lg:grid-cols-3 lg:gap-8">
          <GlassCard className="glass-card-green flex h-full flex-col !p-6 md:!p-7" hover={false}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-troll-green/20 bg-troll-green/10 text-troll-green">
              <CreditCard size={22} />
            </div>
            <h3 className="text-lg font-black text-white">Buy with Card</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
              New to crypto? Purchase ETH with credit card, debit card, Apple
              Pay, or Google Pay via MoonPay. Send the ETH to your wallet, then
              bridge or swap into $TROLL.
            </p>
            <a
              href={MOONPAY_BUY_ETH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-black"
            >
              Buy ETH with Card
              <ExternalLink size={14} className="opacity-70" />
            </a>
            <p className="mt-3 text-xs text-zinc-600">
              Opens MoonPay in a new tab.
            </p>
          </GlassCard>

          <div className="relative lg:col-span-1">
            <GlassCard className="glass-card-green !p-4 md:!p-5" hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-troll-green/20 bg-troll-green/10 text-troll-green">
                  <ArrowRightLeft size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Bridge with Relay
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Bridge from Solana or any EVM chain — destination locked to
                    $TROLL on Ethereum
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-troll-green/10 bg-[#0a0a0a]">
                <RelaySwapWidget />
              </div>
            </GlassCard>
          </div>

          <GlassCard className="glass-card-green flex h-full flex-col !p-6 md:!p-7" hover={false}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-troll-green/20 bg-troll-green/10 text-troll-green">
              <Repeat size={22} />
            </div>
            <h3 className="text-lg font-black text-white">
              Buy directly on Uniswap
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
              Already have ETH in your wallet? Swap directly on Uniswap with
              $TROLL pre-selected as the output token on Ethereum mainnet.
            </p>
            <a
              href={UNISWAP_SWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-black"
            >
              Buy $TROLL on Uniswap
              <ExternalLink size={14} className="opacity-70" />
            </a>
            <p className="mt-3 text-xs text-zinc-600">
              Opens Uniswap in a new tab.
            </p>
          </GlassCard>
        </div>

        <GlassCard className="mt-8 !p-5 md:!p-6" hover={false}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
                Contract Address
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                TrollERC20 ($TROLL) · Ethereum Mainnet
              </p>
            </div>
            <CopyContractAddress variant="inline" />
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
