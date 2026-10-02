"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-vermillion text-lg text-cream shadow-lg shadow-vermillion/30 transition-all duration-300 hover:scale-105 hover:bg-vermillion-dark focus-ring-dark sm:bottom-[max(2rem,env(safe-area-inset-bottom))] sm:right-[max(2rem,env(safe-area-inset-right))]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      aria-label={t("a11y.backToTop")}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
