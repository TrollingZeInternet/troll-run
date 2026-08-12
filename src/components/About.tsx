import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import TrollfaceImage from "./TrollfaceImage";
import { LP_BURNED, TAX, TOTAL_SUPPLY_FORMATTED, TOTAL_SUPPLY_SHORT } from "@/lib/constants";

const stats = [
  { value: TOTAL_SUPPLY_SHORT, label: "Total Supply" },
  { value: TAX, label: "Tax" },
  { value: LP_BURNED, label: "LP Burned" },
  { value: "ERC-20", label: "Standard" },
];

const features = [
  "Fair launch — everyone trolls together",
  "93.1% LP burned — liquidity removed forever",
  "Community owned — no team tokens",
  "0% tax — buy and sell freely",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="About"
          title="What is TrollERC20?"
          description="Born from the deepest corners of the internet, TrollERC20 ($TROLL) carries the legacy of the most iconic meme in history — now on Ethereum."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-3xl bg-troll-green/10 blur-[60px]" />
            <GlassCard className="relative w-full max-w-md text-center" hover={false}>
              <div className="absolute -right-2 -top-2 z-10 rounded-full bg-troll-green px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                OG Meme
              </div>
              <TrollfaceImage
                glow
                size={280}
                className="mx-auto w-[220px] sm:w-[280px]"
              />
              <p className="mt-6 text-sm font-medium text-zinc-500">
                Internet legend since 2008
              </p>
            </GlassCard>
          </div>

          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xl leading-relaxed text-zinc-200 sm:text-2xl">
                Trollface has been trolling the internet since 2008. Now it lives
                on Ethereum as{" "}
                <span className="font-black text-troll-green">TrollERC20 ($TROLL)</span>{" "}
                — a community-driven memecoin for degens who get the joke.
              </p>
              <p className="text-base leading-relaxed text-zinc-500 sm:text-lg">
                No VC backing. No insider allocations. No fake partnerships. Just
                a fair launch, a legendary meme, and a community ready to troll
                the entire crypto space.
              </p>
              <p className="text-sm font-medium text-zinc-600">
                Total supply: {TOTAL_SUPPLY_FORMATTED}
              </p>
            </div>

            <ul className="space-y-4">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-base text-zinc-300"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-troll-green/30 bg-troll-green/10">
                    <Check size={14} className="text-troll-green" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="text-center">
              <div className="text-3xl font-black text-troll-green md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
