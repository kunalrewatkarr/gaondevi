"use client";

import { useEffect, useRef, useState } from "react";
import { festivalCountdownDate } from "@/data/announcements";
import { useTranslation } from "@/context/LanguageContext";
import { formatStatNumber } from "@/lib/numerals";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemaining(targetMs: number, nowMs: number): Remaining | null {
  const diff = targetMs - nowMs;
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function sameRemaining(a: Remaining, b: Remaining): boolean {
  return (
    a.days === b.days &&
    a.hours === b.hours &&
    a.minutes === b.minutes &&
    a.seconds === b.seconds
  );
}

export function FestivalCountdown() {
  const { t, language } = useTranslation();
  const numerals = language === "en" ? "latin" : "devanagari";
  const targetMs = new Date(`${festivalCountdownDate}T00:00:00+05:30`).getTime();
  const [remaining, setRemaining] = useState<Remaining | null | "live">(null);
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef<Remaining | null | "live">(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let intervalId = 0;
    let onScreen = false;

    const tick = () => {
      if (document.hidden || !onScreen) return;

      const next = getRemaining(targetMs, Date.now());
      const value: Remaining | "live" = next ?? "live";

      if (
        remainingRef.current !== null &&
        remainingRef.current !== "live" &&
        value !== "live" &&
        sameRemaining(remainingRef.current, value)
      ) {
        return;
      }

      remainingRef.current = value;
      setRemaining(value);
      setReady(true);

      if (value === "live") stop();
    };

    const start = () => {
      if (intervalId || document.hidden || !onScreen) return;
      tick();
      // Lightweight 1s tick — only while countdown is visible on screen
      intervalId = window.setInterval(tick, 1000);
    };

    const stop = () => {
      if (!intervalId) return;
      window.clearInterval(intervalId);
      intervalId = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.1 }
    );

    observer.observe(root);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    onScreen = true;
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [targetMs]);

  return (
    <div ref={rootRef} className="w-full max-w-3xl">
      {!ready ? (
        <div
          className="min-h-[5.5rem] rounded-3xl border border-vermillion/15 bg-card/80 px-5 py-4"
          aria-hidden="true"
        />
      ) : remaining === "live" ? (
        <div
          className="rounded-3xl border border-saffron/35 bg-gradient-to-br from-vermillion via-maroon to-wine px-6 py-5 text-center text-cream shadow-lg shadow-vermillion/20"
          role="status"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-saffron">
            {t("countdown.kicker")}
          </p>
          <p className="mt-2 font-display text-xl sm:text-2xl">
            {t("countdown.live")}
          </p>
        </div>
      ) : remaining ? (
        <div
          className="overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-card via-paper to-saffron/15 px-3 py-5 text-center shadow-md shadow-vermillion/10 sm:px-8 sm:py-6"
          role="timer"
          aria-live="off"
          aria-label={t("a11y.countdown", {
            days: remaining.days,
            hours: remaining.hours,
            minutes: remaining.minutes,
          })}
        >
          <p className="px-1 text-xs font-semibold leading-relaxed text-gold-ink">
            {t("countdown.until")}
          </p>
          <div className="mt-4 flex items-stretch justify-center gap-1 sm:mt-5 sm:gap-3">
            {(
              [
                { label: t("countdown.days"), value: remaining.days },
                { label: t("countdown.hours"), value: remaining.hours },
                { label: t("countdown.minutes"), value: remaining.minutes },
                { label: t("countdown.seconds"), value: remaining.seconds },
              ] as const
            ).map((unit, index, list) => (
              <div
                key={unit.label}
                className="flex min-w-0 flex-1 items-center gap-1 sm:flex-none sm:gap-3"
              >
                <div className="min-w-0 flex-1 rounded-2xl border border-vermillion/12 bg-card px-1.5 py-3 shadow-sm sm:min-w-[4.75rem] sm:flex-none sm:px-3">
                  <p className="font-display text-xl text-gold-ink tabular-nums sm:text-4xl">
                    {formatStatNumber(unit.value, numerals)}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-medium leading-snug text-ink-muted sm:text-xs">
                    {unit.label}
                  </p>
                </div>
                {index < list.length - 1 ? (
                  <span
                    className="hidden text-xl text-saffron sm:inline"
                    aria-hidden="true"
                  >
                    :
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
