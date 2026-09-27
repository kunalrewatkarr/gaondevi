import { siteConfig } from "@/data/site";

const items = [
  siteConfig.honorific,
  siteConfig.tagline,
  `स्थापना ${siteConfig.foundedYear}`,
  siteConfig.location,
  "नवरात्र उत्सव २०२६ — सर्व भक्तांचे हार्दिक स्वागत",
  "श्री दुर्गा मातेचे दर्शन व प्रसाद",
];

export function MarqueeBanner() {
  const line = items.join("   ✦   ");

  return (
    <div className="relative overflow-hidden border-y border-gold/55 bg-gradient-to-r from-wine via-maroon to-vermillion py-3.5 text-cream shadow-[inset_0_1px_0_rgba(212,165,55,0.45)]">
      <p className="sr-only">
        {siteConfig.tagline}. स्थापना {siteConfig.foundedYear}.{" "}
        {siteConfig.location}.
      </p>
      <div
        className="animate-marquee flex whitespace-nowrap motion-reduce:animate-none"
        aria-hidden="true"
      >
        <span className="px-4 font-medium tracking-wide text-cream">
          {line}
        </span>
        <span className="px-4 font-medium tracking-wide text-cream">
          {line}
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-wine to-transparent sm:w-24"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-vermillion to-transparent sm:w-24"
        aria-hidden="true"
      />
    </div>
  );
}
