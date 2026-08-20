import Image from "next/image";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import CopyContractAddress from "./CopyContractAddress";
import { LP_BURNED, TAX, TOTAL_SUPPLY_SHORT, TROLLFACE_IMAGE } from "@/lib/constants";

const tickerItems = [
  "TROLLERC20",
  "$TROLL",
  "ETHEREUM",
  "0% TAX",
  `${LP_BURNED} LP BURNED`,
  "960.42T SUPPLY",
  "TROLL OR BE TROLLED",
  "TROLLERC20",
  "$TROLL",
  "ETHEREUM",
  "0% TAX",
  `${LP_BURNED} LP BURNED`,
];

const heroStats = [
  { icon: TrendingUp, label: "Total Supply", value: TOTAL_SUPPLY_SHORT },
  { icon: Users, label: "Tax", value: TAX },
  { label: "Liquidity", value: `${LP_BURNED} Burned`, isTrollface: true },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[40%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/12 blur-[150px]" />
        <div className="absolute -right-32 top-20 h-[400px] w-[400px] rounded-full bg-troll-green/8 blur-[100px]" />
        <div className="absolute -left-32 bottom-32 h-[350px] w-[350px] rounded-full bg-troll-green-dark/30 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-troll-green/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex flex-1 w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-8 xl:gap-12">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-troll-green/25 bg-troll-green/5 px-5 py-2 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-troll-green opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-troll-green" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-troll-green">
                TrollERC20 on Ethereum
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 text-[3.25rem] font-black uppercase leading-[0.88] tracking-tighter text-white sm:text-7xl md:text-8xl xl:text-[7rem]">
              The
              <br />
              <span className="bg-gradient-to-r from-troll-green via-troll-green-light to-troll-green bg-clip-text text-transparent text-glow-green">
                Troll
              </span>
              <br />
              <span className="text-white/90">Era</span>
            </h1>

            <p className="animate-fade-up-delay-2 mx-auto mt-8 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:mx-0">
              TrollERC20 is the memecoin for internet culture. No fake utility, no
              empty promises — just{" "}
              <span className="font-semibold text-white">pure troll energy</span>{" "}
              on Ethereum.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-4 lg:items-start">
              <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="/bridge"
                  className="btn-primary group flex w-full items-center justify-center gap-2.5 rounded-full px-10 py-4.5 text-base font-bold text-black sm:w-auto"
                >
                  Buy TrollERC20
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex w-full items-center justify-center rounded-full px-10 py-4.5 text-base font-semibold text-white sm:w-auto"
                >
                  Join the Trolls
                </a>
              </div>
              <a
                href="https://nft.troll.run"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group flex w-full items-center justify-center gap-2.5 rounded-full px-10 py-4.5 text-base font-bold text-troll-green-light sm:w-auto"
              >
                Explore NFTs
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="animate-fade-up-delay-4 mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl px-3 py-4 text-center sm:px-4"
                >
                  {"isTrollface" in stat && stat.isTrollface ? (
                    <Image
                      src={TROLLFACE_IMAGE}
                      alt=""
                      width={20}
                      height={20}
                      className="mx-auto mb-1.5 h-5 w-5 rounded-full object-cover ring-1 ring-troll-green/40"
                      aria-hidden="true"
                    />
                  ) : (
                    stat.icon && (
                      <stat.icon
                        size={16}
                        className="mx-auto mb-1.5 text-troll-green"
                      />
                    )
                  )}
                  <div className="text-sm font-black text-white sm:text-base">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-fade-up-delay-4 mt-8 rounded-2xl glass-card p-4 lg:max-w-xl">
              <CopyContractAddress />
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="animate-fade-up-delay-2 relative animate-float">
              <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/35 blur-[80px] animate-pulse-glow sm:h-[460px] sm:w-[460px] sm:blur-[100px] md:h-[540px] md:w-[540px]" />
              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-troll-green/20 blur-[50px] sm:h-[360px] sm:w-[360px]" />
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-troll-green/20 sm:h-[330px] sm:w-[330px] md:h-[400px] md:w-[400px]" />
              <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-troll-green/10 sm:h-[290px] sm:w-[290px] md:h-[360px] md:w-[360px]" />

              <Image
                src={TROLLFACE_IMAGE}
                alt="Trollface — TrollERC20 mascot"
                width={520}
                height={520}
                priority
                className="relative z-10 h-auto w-[240px] rounded-2xl drop-shadow-[0_0_70px_rgba(34,197,94,0.65)] sm:w-[320px] md:w-[400px] lg:w-[480px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="overflow-hidden py-3.5">
          <div className="animate-marquee flex w-max gap-8">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-zinc-600"
              >
                {item}
                <span className="text-troll-green">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
