"use client";

import { useTranslation } from "@/context/LanguageContext";

export function SkipLink() {
  const { t } = useTranslation();

  return (
    <a href="#main-content" className="skip-link">
      {t("a11y.skip")}
    </a>
  );
}
