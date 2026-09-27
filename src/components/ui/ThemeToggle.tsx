"use client";

import { useEffect, useState } from "react";
import { applyTheme, getPreferredTheme, type ThemeMode } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  /** When true, use light icon colors suitable for the transparent hero header */
  onDark?: boolean;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M5.2 18.8l1.6-1.6M17.2 6.8l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2z"
      />
    </svg>
  );
}

export function ThemeToggle({ className, onDark = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = getPreferredTheme();
    setTheme(current);
    applyTheme(current);
    setReady(true);
  }, []);

  const toggle = () => {
    const next: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-ring",
        onDark
          ? "text-cream hover:bg-cream/15"
          : "text-ink hover:bg-vermillion/10",
        className
      )}
      aria-label={theme === "light" ? "डार्क थीम चालू करा" : "लाइट थीम चालू करा"}
      title={theme === "light" ? "डार्क थीम" : "लाइट थीम"}
    >
      <span className={cn(!ready && "opacity-0")}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
