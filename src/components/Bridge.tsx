import { ArrowRightLeft, CreditCard, Globe, Shield, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import LiFiBridgeWidget from "./LiFiBridgeWidget";
import CopyContractAddress from "./CopyContractAddress";
import { MOONPAY_BUY_ETH_URL } from "@/lib/constants";

const features = [
  {
    icon: Globe,
    title: "Any Chain",
    description: "Bridge from Base, Arbitrum, Polygon, BSC, and more.",
  },
  {
    icon: ArrowRightLeft,
    title: "Any Token",
    description: "Swap ETH, USDC, or other assets directly into TrollERC20.",
  },
  {
    icon: Shield,
    title: "Always $TROLL",
    description: "Destination is locked to TrollERC20 on Ethereum mainnet.",
  },
];

export default function Bridge() {
  return (
    <section id="bridge" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/6 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Buy & Bridge"
          title="Bridge to TrollERC20"
          description="New to crypto? Buy ETH with your card first, then swap or bridge into TrollERC20 ($TROLL) on Ethereum — powered by MoonPay and LI.FI."
        />

        <GlassCard className="glass-card-green mb-10 !p-6 md:!p-8" hover={false}>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-troll-green text-sm font-black text-black">
                  1
                </span>
                <h3 className="text-lg font-black text-white">
                  Buy ETH with Card
                </h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Use MoonPay to purchase ETH with credit card, debit card, Apple
                Pay, or Google Pay. Send the ETH to your wallet (MetaMask
                recommended).
              </p>
              <a
                href={MOONPAY_BUY_ETH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-black"
              >
                <CreditCard size={18} />
                Buy ETH with Card
                <ExternalLink size={14} className="opacity-70" />
              </a>
              <p className="mt-4 text-xs text-zinc-600">
                Opens MoonPay in a new tab. No account required on troll.run.
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-troll-green/40 bg-troll-green/10 text-sm font-black text-troll-green">
                  2
                </span>
                <h3 className="text-lg font-black text-white">
                  Bridge / Swap to $TROLL
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Once ETH is in your wallet, use the LI.FI widget below to swap
                or bridge directly into TrollERC20 on Ethereum. Your destination
                is pre-set — just connect your wallet and confirm.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-troll-green" />
                  Connect wallet to the widget below
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-troll-green" />
                  Select your source chain and token
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-troll-green" />
                  Receive TrollERC20 on Ethereum
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="space-y-6">
            {features.map((feature) => (
              <GlassCard key={feature.title} className="flex gap-4 !p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-troll-green/20 bg-troll-green/10 text-troll-green">
                  <feature.icon size={22} />
                </div>
                <div>
                  <h3 className="font-black text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}

            <GlassCard className="glass-card-green !p-5" hover={false}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-troll-green">
                Destination Token
              </p>
              <p className="text-sm font-semibold text-white">
                TrollERC20 ($TROLL)
              </p>
              <p className="mt-1 text-xs text-zinc-500">Ethereum Mainnet</p>
              <div className="mt-4">
                <CopyContractAddress variant="inline" />
              </div>
            </GlassCard>
          </div>

          <div className="relative">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-troll-green lg:text-left">
              Step 2 — LI.FI Widget
            </p>
            <div className="absolute -inset-4 rounded-3xl bg-troll-green/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-troll-green/15 bg-[#0a0a0a] p-2 shadow-[0_0_80px_rgba(34,197,94,0.12)] sm:p-3">
              <LiFiBridgeWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
