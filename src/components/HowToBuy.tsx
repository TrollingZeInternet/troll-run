import { ExternalLink, Wallet, ArrowLeftRight, PartyPopper } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import CopyContractAddress from "./CopyContractAddress";
import { UNISWAP_SWAP_URL } from "@/lib/constants";

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Get a Wallet",
    description:
      "Download MetaMask or any Ethereum wallet. Create a new wallet and secure your seed phrase.",
    link: { href: "https://metamask.io", label: "Get MetaMask" },
  },
  {
    icon: ArrowLeftRight,
    step: "02",
    title: "Get ETH",
    description:
      "Buy ETH on an exchange and send it to your wallet. You'll need ETH for the swap and gas fees.",
    link: { href: "https://www.coinbase.com", label: "Buy ETH" },
  },
  {
    icon: PartyPopper,
    step: "03",
    title: "Swap for TrollERC20",
    description:
      "Head to Uniswap, paste the TrollERC20 contract address, and swap your ETH for $TROLL.",
    link: { href: UNISWAP_SWAP_URL, label: "Swap on Uniswap" },
  },
];

export default function HowToBuy() {
  return (
    <section id="buy" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="How to Buy"
          title="Join the Troll Army"
          description="Three simple steps to become a certified troll on Ethereum. Not financial advice — just vibes."
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <GlassCard key={item.step} className="group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-[5rem] font-black leading-none text-white/[0.03] transition-colors group-hover:text-troll-green/[0.06]">
                {item.step}
              </div>

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-troll-green/20 bg-troll-green/10 text-troll-green transition-all duration-300 group-hover:border-troll-green/40 group-hover:bg-troll-green/20 group-hover:shadow-[0_0_24px_rgba(34,197,94,0.2)]">
                  <item.icon size={26} />
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-troll-green/60">
                  Step {index + 1}
                </span>
                <h3 className="mt-1 mb-3 text-2xl font-black text-white">
                  {item.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>

                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-troll-green transition-all hover:gap-3 hover:text-troll-green-light"
                >
                  {item.link.label}
                  <ExternalLink size={14} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard
          className="glass-card-green mt-14 text-center glow-green-strong"
          hover={false}
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-troll-green">
            Contract Address
          </p>
          <CopyContractAddress variant="centered" />
          <p className="mt-5 text-sm text-zinc-500">
            Always verify the contract address before swapping. DYOR.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
