import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";

export default function ScannerPage() {
  return (
    <div className="pt-20">
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 section-divider" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            label="Scanner"
            title="Troll Scanner"
            description="Paste a token contract and we will score the usual red flags. Full scan engine is wiring up next."
          />

          <GlassCard hover={false} className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-troll-green">
              Coming online
            </p>
            <p className="mt-4 text-lg text-zinc-400">
              The token scanner foundation is in place. Scan input, results, and
              live API land in the next phase.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
