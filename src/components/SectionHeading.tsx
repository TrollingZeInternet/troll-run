interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <span className="mb-4 inline-block rounded-full border border-troll-green/30 bg-troll-green/8 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-troll-green backdrop-blur-sm">
        {label}
      </span>
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
