import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import CopyContractAddress from "./CopyContractAddress";
import {
  CONTRACT_ADDRESS,
  LP_BURNED,
  TAX,
  TOTAL_SUPPLY_FORMATTED,
} from "@/lib/constants";

const tokenData = [
  { label: "Token Name", value: "TrollERC20" },
  { label: "Ticker", value: "$TROLL" },
  { label: "Chain", value: "Ethereum (ERC-20)" },
  { label: "Contract", value: CONTRACT_ADDRESS, mono: true },
  { label: "Total Supply", value: TOTAL_SUPPLY_FORMATTED },
  { label: "Tax", value: TAX },
  { label: "Liquidity", value: `${LP_BURNED} Burned` },
];

const distribution = [{ label: "Liquidity Burned", percent: 93.1 }];

const miniStats = [
  { value: TAX, label: "Tax" },
  { value: LP_BURNED, label: "LP Burned" },
  { value: "960.42T", label: "Supply" },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Tokenomics"
          title="The Numbers"
          description="Simple, transparent, and troll-friendly. TrollERC20 on Ethereum — no hidden wallets, no team dump."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <GlassCard>
            <h3 className="mb-8 text-xl font-black uppercase tracking-wide text-white">
              Token Details
            </h3>
            <dl className="space-y-1">
              {tokenData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <dt className="shrink-0 text-sm font-medium text-zinc-500">
                    {item.label}
                  </dt>
                  <dd
                    className={`text-right text-sm font-bold text-white ${
                      item.mono ? "break-all font-mono text-xs text-zinc-300" : ""
                    }`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-8 text-xl font-black uppercase tracking-wide text-white">
              Liquidity
            </h3>
            <div className="space-y-6">
              {distribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-400">
                      {item.label}
                    </span>
                    <span className="text-lg font-black text-troll-green">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-troll-green-dark via-troll-green to-troll-green-light transition-all duration-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {miniStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-troll-green/15 bg-troll-green/5 p-4 text-center transition-all hover:border-troll-green/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                >
                  <div className="text-xl font-black text-troll-green md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/5 pt-8">
              <CopyContractAddress variant="centered" />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
