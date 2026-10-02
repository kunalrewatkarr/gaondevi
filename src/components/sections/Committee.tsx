"use client";

import type { CommitteeMember } from "@/data/committee";
import { useTranslation } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MemberCard } from "@/components/ui/MemberCard";
import { FadeIn } from "@/components/ui/FadeIn";

export function Committee({ members }: { members: CommitteeMember[] }) {
  const { t } = useTranslation();

  return (
    <section id="committee" className="section-padding section-surface">
      <div className="container-main">
        <SectionHeading
          kicker={t("committee.kicker")}
          title={t("committee.title")}
          subtitle={t("committee.subtitle")}
        />

        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-ink-muted">
          {t("committee.note")}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {members
            .filter((member) => member.line === "पदाधिकारी")
            .map((member, i) => (
              <FadeIn key={member.id} delay={i * 40}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
        </div>

        <h3 className="mb-6 mt-12 text-center font-display text-2xl text-gold-ink sm:mt-16 sm:text-3xl">
          {t("committee.accountants")}
        </h3>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {members
            .filter((member) => member.line === "हिशोबनीस")
            .map((member, i) => (
              <FadeIn key={member.id} delay={i * 40}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
}
