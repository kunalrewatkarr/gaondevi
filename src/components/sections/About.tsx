import Image from "next/image";
import { aboutContent, siteConfig } from "@/data/site";
import { durgaImages, jyotImages } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

export function About() {
  return (
    <section id="about" className="section-padding section-surface-warm overflow-x-clip">
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
              <p className="font-display text-xl text-vermillion sm:text-2xl">
                {siteConfig.honorific}
              </p>
              <p className="text-ink">{aboutContent.intro}</p>
              <p>{aboutContent.history}</p>
              <p>{aboutContent.mission}</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={80}>
          <div className="mt-14 overflow-hidden rounded-[2rem] border border-vermillion/15 bg-card shadow-sm sm:mt-16">
            <div className="grid items-stretch md:grid-cols-2">
              <div className="relative min-h-[280px] aspect-[3/4] md:aspect-auto md:min-h-[360px]">
                <Image
                  src={jyotImages.main}
                  alt="अखंड मनोकामना ज्योत — नवयुवक दुर्गा उत्सव मंडळ"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vermillion">
                  परंपरा
                </p>
                <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                  अखंड मनोकामना ज्योत
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {aboutContent.jyotInfo}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {aboutContent.values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 70}>
              <Card lift className="h-full p-5 sm:p-6">
                <p className="text-sm font-semibold text-vermillion">
                  {String(i + 1).padStart(2, "0")}
                </p>
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
