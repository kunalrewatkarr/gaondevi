"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const OPTIONS: { id: Language; label: string; short: string }[] = [
  { id: "mr", label: "मराठी", short: "मर" },
  { id: "hi", label: "हिंदी", short: "हिं" },
  { id: "en", label: "English", short: "EN" },
];

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18" />
      <path
        strokeLinecap="round"
        d="M12 3c2.6 2.7 3.9 5.8 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.8-3.9-9S9.4 5.7 12 3z"
      />
    </svg>
  );
}

interface LanguageSwitcherProps {
  onDark?: boolean;
  variant?: "dropdown" | "pills";
  className?: string;
}

export function LanguageSwitcher({
  onDark = false,
  variant = "dropdown",
  className,
}: LanguageSwitcherProps) {
  if (variant === "pills") return <LanguagePills className={className} />;
  return <LanguageDropdown onDark={onDark} className={className} />;
}

function LanguagePills({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("a11y.changeLanguage")}
      className={cn("flex w-full flex-nowrap gap-1.5", className)}
    >
      {OPTIONS.map((option) => {
        const active = language === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLanguage(option.id)}
            aria-pressed={active}
            className={cn(
              "min-h-11 min-w-0 flex-1 whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold leading-none transition-colors focus-ring",
              active
                ? "bg-gold text-on-gold"
                : "text-ink hover:bg-gold/10 hover:text-gold-ink"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function LanguageDropdown({
  onDark,
  className,
}: {
  onDark: boolean;
  className?: string;
}) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = OPTIONS.find((option) => option.id === language) ?? OPTIONS[0];

  const close = () => {
    setVisible(false);
    setOpen(false);
  };

  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };

  useEffect(() => {
    if (!mounted || !open) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [mounted, open]);

  useEffect(() => {
    if (open || !mounted) return;
    const timer = window.setTimeout(() => setMounted(false), 150);
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "flex h-11 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-semibold leading-none transition-colors focus-ring",
          onDark
            ? "text-cream hover:bg-cream/15"
            : "text-ink hover:bg-vermillion/10"
        )}
        aria-label={t("a11y.changeLanguage")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close() : openMenu())}
      >
        <GlobeIcon />
        <span>{current.label}</span>
      </button>

      {mounted && (
        <div
          id={menuId}
          role="menu"
          aria-label={t("a11y.changeLanguage")}
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-36 origin-top-right rounded-2xl bg-ivory p-1.5 shadow-lg shadow-ink/15 ring-1 ring-ink/10 transition duration-150 ease-out",
            visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          )}
        >
          {OPTIONS.map((option) => {
            const active = language === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="menuitem"
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-ring",
                  active
                    ? "bg-gold text-on-gold"
                    : "text-ink hover:bg-gold/10 hover:text-gold-ink"
                )}
                onClick={() => {
                  setLanguage(option.id);
                  close();
                  triggerRef.current?.focus();
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
