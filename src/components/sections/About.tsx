import Image from "next/image";
import { aboutContent, siteConfig } from "@/data/site";
import { durgaImages, jyotImages } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

function ValueIcon({ title }: { title: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6 text-gold-ink",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (title === "भक्ती") {
    return (
      <svg {...common}>
        <path d="M12 3c.6 2.2-.2 3.6-1.4 4.6 2 .4 3.4 1.6 3.4 3.4 0 .4-.1.7-.2 1 2.2.7 3.7 2.2 3.7 4.2 0 2.6-2.6 4.8-5.5 4.8S6.5 18.8 6.5 16.2c0-2 1.5-3.5 3.7-4.2-.1-.3-.2-.6-.2-1 0-1.4 1-2.4 2.2-3C10.8 6.6 10.4 5 12 3z" />
      </svg>
    );
  }

  if (title === "संस्कृती") {
    return (
      <svg {...common}>
        <path d="M4 10h16" />
        <path d="M6 10c0 4 1.8 7 2.5 8.5" />
        <path d="M18 10c0 4-1.8 7-2.5 8.5" />
        <path d="M9 8.5a3 3 0 0 1 6 0" />
        <path d="M8 19.5h8" />
        <circle cx="12" cy="6.2" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (title === "सामाजिक बांधिलकी") {
    return (
      <svg {...common}>
        <path d="M12 20s-6.5-4.1-6.5-8.2A3.6 3.6 0 0 1 12 9.2a3.6 3.6 0 0 1 6.5 2.6C18.5 15.9 12 20 12 20z" />
        <path d="M4 18.5c1.2-1.6 2.8-2.4 4.4-2.4" />
        <path d="M20 18.5c-1.2-1.6-2.8-2.4-4.4-2.4" />
      </svg>
    );
  }

  if (title === "युवक सहभाग") {
    return (
      <svg {...common}>
        <path d="M12 3.5l1.6 3.8 4.1.4-3.1 2.7.9 4-3.5-2.1-3.5 2.1.9-4L5.3 7.7l4.1-.4z" />
        <path d="M7 19.5h10" />
        <path d="M12 15.2V19.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="8" cy="12" r="3.2" />
      <circle cx="16" cy="12" r="3.2" />
      <path d="M10.6 12h2.8" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding about-surface relative overflow-x-clip">
      <div className="container-main relative z-10">
        <SectionHeading
          kicker="परंपरा"
          title={aboutContent.heading}
          subtitle={aboutContent.subheading}
        />

        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-5">
            <div className="relative mx-auto max-w-md pl-3 pt-3 sm:pl-4 sm:pt-4">
              <div
                className="absolute left-0 top-0 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] rounded-[2rem] bg-vermillion/15 sm:h-[calc(100%-1rem)] sm:w-[calc(100%-1rem)]"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink/5 shadow-2xl shadow-ink/15">
                <Image
                  src={durgaImages.main}
                  alt="श्री दुर्गा मातेची मूर्ती — नवयुवक दुर्गा उत्सव मंडळ"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  loading="eager"
                  className="object-cover object-[center_8%]"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p className="font-display text-xl text-gold-ink sm:text-2xl">
                {siteConfig.honorific}
              </p>
              <p className="text-ink">{aboutContent.intro}</p>
              <p>{aboutContent.history}</p>
              <p>{aboutContent.mission}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={80}>
          <div className="mt-14 overflow-hidden rounded-[2rem] border border-gold/40 bg-card shadow-[0_0_36px_-8px_rgba(201,150,44,0.55)] sm:mt-16">
            <div className="grid items-stretch md:grid-cols-2">
              <div className="relative min-h-[280px] aspect-[3/4] shadow-[inset_0_0_48px_rgba(201,150,44,0.35)] ring-2 ring-gold/70 md:aspect-auto md:min-h-[360px]">
                <Image
                  src={jyotImages.main}
                  alt="अखंड मनोकामना ज्योत व घटस्थापना — नवयुवक दुर्गा उत्सव मंडळ"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                <p className="text-xs font-semibold text-gold-ink">
                  परंपरा
                </p>
                <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                  अखंड मनोकामना ज्योत
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {aboutContent.jyotInfo}
                </p>
                <p className="mt-5 text-sm font-semibold text-gold-ink">
                  नवरात्र २०२६ — ज्योत श्री रेणुकादेवी मंदिर, माहुरगड, नांदेड येथून
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    ["९ दिवस ९ रात्र", "अखंड ज्योत"],
                    ["₹८०१", "संकल्प राशी"],
                  ].map(([value, label]) => (
                    <li
                      key={label}
                      className="rounded-2xl bg-gold/15 px-3 py-2 ring-1 ring-gold/35"
                    >
                      <p className="font-display text-lg leading-none text-gold-ink">{value}</p>
                      <p className="mt-1 text-xs text-ink-muted">{label}</p>
                    </li>
                  ))}
                  <li className="rounded-2xl bg-gold/15 px-3 py-2 ring-1 ring-gold/35 sm:col-span-2">
                    <p className="text-xs text-ink-muted">आरतीची वेळ</p>
                    <p className="mt-1 font-display text-lg leading-snug text-gold-ink">
                      सकाळी ८:०५ व सायंकाळी ८:०५
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {aboutContent.values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 70}>
              <Card lift className="h-full p-5 sm:p-6">
                <span className="icon-badge" aria-hidden="true">
                  <ValueIcon title={value.title} />
                </span>
                <h3 className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
