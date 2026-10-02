"use client";

import { useTranslation } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { FestivalCarousel } from "@/components/ui/FestivalCarousel";

const HIGHLIGHT_IDS = ["mandap", "lights", "crowd", "culture"] as const;
const PHOTO_IDS = ["mandap", "decor", "darshan", "utsav"] as const;

interface FestivalImages {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
}

export function FestivalExperience({ images }: { images: FestivalImages }) {
  const { t } = useTranslation();
  const photoSources = {
    mandap: images.primary,
    decor: images.secondary,
    darshan: images.tertiary,
    utsav: images.quaternary,
  } as const;
  const photos = PHOTO_IDS.map((id) => ({
    src: photoSources[id],
    alt: t(`experience.photos.${id}.alt`),
    caption: t(`experience.photos.${id}.caption`),
  }));
  return (
    <section id="experience" className="section-padding overflow-hidden festival-bg">
      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
      </div>

      <div className="container-main relative z-10">
        <FadeIn>
          <SectionHeading
            kicker={t("experience.kicker")}
            title={<span className="text-gradient-gold">{t("experience.title")}</span>}
            subtitle={t("experience.subtitle")}
            tone="dark"
            shimmerDivider
          />
        </FadeIn>

        {/* Featured Image Carousel */}
        <FadeIn delay={150} className="mb-12">
          <FestivalCarousel photos={photos} />
        </FadeIn>

        {/* Highlight Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHT_IDS.map((id, i) => (
            <FadeIn key={id} delay={i * 70 + 300}>
              <div className="surface-panel-dark h-full p-6 transition-transform hover:scale-[1.02]">
                <h3 className="font-display text-2xl text-gold">{t(`experience.highlights.${id}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {t(`experience.highlights.${id}.description`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
