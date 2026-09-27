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
    <div className="overflow-hidden border-y border-saffron/35 bg-gradient-to-r from-wine via-maroon to-vermillion py-3 text-cream">
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
    </div>
  );
}
