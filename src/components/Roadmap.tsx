import { Check, CheckCircle2, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done" as const,
    items: [
      "10k Holders",
      "100M Marketcap",
      "10k Twitter Followers",
      "6k Telegram",
      "CMC/CG",
      "Top 10 tier 2 Listings",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    status: "upcoming" as const,
    items: [
      "100k Holders",
      "1B Marketcap",
      "50k Twitter Followers",
      "Tier 1 Listing",
      "20k Telegram Members",
    ],
  },
  {
    phase: "Phase 3",
    title: "Domination",
    status: "upcoming" as const,
    items: [
      "Binance Listing",
      "Mainstream marketing",
      "10B market cap",
    ],
  },
];

const statusConfig = {
  done: {
    label: "Completed",
    icon: CheckCircle2,
    badge: "border-troll-green/40 bg-troll-green/10 text-troll-green",
    dot: "bg-troll-green shadow-[0_0_12px_rgba(34,197,94,0.6)]",
  },
  upcoming: {
    label: "Coming Soon",
    icon: Clock,
    badge: "border-white/10 bg-white/5 text-zinc-500",
    dot: "bg-zinc-600",
  },
};

export default function Roadmap() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-troll-green/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Roadmap"
          title="The Master Plan"
          description="We don't promise the moon — we promise to troll along the way."
        />

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="absolute left-[16.67%] right-[16.67%] top-14 hidden h-px bg-gradient-to-r from-troll-green via-troll-green/40 to-white/10 md:block" />

          {phases.map((phase) => {
            const config = statusConfig[phase.status];
            const StatusIcon = config.icon;
            const isDone = phase.status === "done";

            return (
              <GlassCard key={phase.phase} className="relative">
                <div
                  className={`absolute -top-3 left-8 hidden h-3 w-3 rounded-full md:block ${config.dot}`}
                />

                <div
                  className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${config.badge}`}
                >
                  <StatusIcon size={12} />
                  {config.label}
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                  {phase.phase}
                </span>
                <h3 className="mt-1 mb-6 text-2xl font-black text-white">
                  {phase.title}
                </h3>

                <ul className="space-y-3.5">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 text-sm ${
                        isDone ? "text-zinc-300" : "text-zinc-400"
                      }`}
                    >
                      {isDone ? (
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-troll-green/40 bg-troll-green/15">
                          <Check size={12} className="text-troll-green" />
                        </span>
                      ) : (
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
