import Image from "next/image";
import { durgaContent } from "@/data/festival";
import { durgaImages } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

export function DurgaMaa() {
  return (
    <section
      id="durga"
      className="section-padding relative overflow-hidden mesh-dark"
    >
      <div
        className="animate-spin-slow absolute -right-32 top-10 h-80 w-80 rounded-full lotus-ring opacity-20 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-main relative">
        <SectionHeading kicker="भक्ती" title={durgaContent.heading} tone="dark" />

        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="relative mx-auto w-full max-w-sm sm:max-w-lg">
              <div
                className="absolute inset-6 rounded-full bg-gold/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-gold/40 shadow-2xl shadow-night/40">
                <Image
                  src={durgaImages.secondary}
                  alt={durgaContent.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-[center_12%]"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="space-y-5 sm:space-y-6">
              <h3 className="font-display text-2xl leading-snug text-gold sm:text-4xl">
                {durgaContent.name}
              </h3>
              <p className="text-base leading-relaxed text-cream/90 sm:text-xl">
                {durgaContent.intro}
              </p>
              <p className="leading-relaxed text-cream/70">
                {durgaContent.significance}
              </p>
              <div className="rounded-3xl border border-gold/25 bg-cream/5 p-5 backdrop-blur-sm sm:p-6">
                <h4 className="mb-2 font-display text-xl text-saffron sm:text-2xl">दर्शन</h4>
                <p className="leading-relaxed text-cream/80">
                  {durgaContent.darshan}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-cream/60">{durgaContent.murtiCredit}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
