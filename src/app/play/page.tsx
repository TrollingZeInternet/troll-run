import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";

export const metadata: Metadata = {
  title: "Play | troll.run — TROLL RUN & TROLL HODL",
  description:
    "Play the official TrollERC20 HTML5 games. TROLL RUN is the endless runner. TROLL HODL rides the chart. Problem?",
};

const games = [
  {
    title: "TROLL RUN",
    tagline: "Problem?",
    description:
      "The endless runner. Steer Trollface, collect BUY tokens, and dodge rugs, FUD, and paperhands. Live market data feeds the chaos.",
    href: "/games/troll-run/run.html",
    image: "/games/troll-run/Trollface.png",
    imageAlt: "Trollface, the TROLL RUN runner",
    badge: "Endless runner",
  },
  {
    title: "TROLL HODL",
    tagline: "Don't sell.",
    description:
      "Ride the $TROLL chart. Wheelie, endo, jump. Stack Trollcoins. Crash and you sold the bottom.",
    href: "/games/troll-run/hodl.html",
    image: "/games/troll-run/trollcoin-card.png",
    imageAlt: "Trollcoin from TROLL HODL",
    badge: "Chart rider",
  },
  {
    title: "TROLL GAMES",
    tagline: "All games",
    description:
      "The TrollERC20 game hub. Pick TROLL RUN or TROLL HODL from one neon-green lobby.",
    href: "/games/troll-run/index.html",
    image: "/games/troll-run/Trollface.png",
    imageAlt: "Trollface — TrollERC20 games",
    badge: "Games",
  },
] as const;

export default function PlayPage() {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-troll-green/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-troll-green-dark/30 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16 top-40 h-[240px] w-[240px] rounded-full bg-troll-green/8 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            label="Play"
            title="Troll Games"
            description="Official HTML5 arcade. Same troll energy. No app store required."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {games.map((game) => (
              <GlassCard
                key={game.href}
                className="flex h-full flex-col p-5 sm:p-6 md:p-8"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full border border-troll-green/30 bg-troll-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-troll-green sm:text-xs">
                    {game.badge}
                  </span>
                </div>

                <div className="mb-6 flex min-h-[160px] items-center justify-center rounded-2xl border border-white/[0.04] bg-transparent px-4 py-6 sm:min-h-[180px]">
                  <Image
                    src={game.image}
                    alt={game.imageAlt}
                    width={200}
                    height={200}
                    className="h-28 w-auto bg-transparent object-contain drop-shadow-[0_0_24px_rgba(34,197,94,0.35)] sm:h-32"
                  />
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  {game.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-troll-green">
                  {game.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
                  {game.description}
                </p>

                <a
                  href={game.href}
                  className="btn-primary group mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-black sm:text-base"
                >
                  Play
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
