"use client";

import { socialInitiatives } from "@/data/social-work";
import { useTranslation } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

export function SocialWork() {
  const { t } = useTranslation();

  return (
    <section id="social" className="section-padding section-surface-alt">
      <div className="container-main">
        <SectionHeading
          kicker={t("social.kicker")}
          title={t("social.title")}
          subtitle={t("social.subtitle")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socialInitiatives.map((item, i) => (
            <FadeIn key={item.id} delay={i * 50}>
              <Card
                as="article"
                lift
                className="flex h-full gap-4 p-6"
              >
                <span className="icon-badge icon-badge-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{t(`social.items.${item.id}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {t(`social.items.${item.id}.description`)}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
