"use client";

import { useTranslation } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryHeading() {
  const { t } = useTranslation();

  return (
    <SectionHeading
      kicker={t("gallery.kicker")}
      title={t("gallery.title")}
      subtitle={t("gallery.subtitle")}
      tone="dark"
    />
  );
}
