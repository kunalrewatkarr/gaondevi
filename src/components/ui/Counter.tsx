"use client";

import { useEffect, useRef, useState } from "react";
import { formatStatNumber } from "@/lib/numerals";
import { cn } from "@/lib/utils";

interface CounterProps {
  target: number;
  suffix?: string;
  numerals?: "latin" | "devanagari";
  duration?: number;
  delay?: number;
  className?: string;
}

export function Counter({
  target,
  suffix = "",
  numerals = "devanagari",
  duration = 2000,
  delay = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
          setDisplay(target);
          return;
        }

        const start = performance.now() + delay;

        const tick = (now: number) => {
          if (now < start) {
            requestAnimationFrame(tick);
            return;
          }

          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatStatNumber(display, numerals)}
      {suffix}
    </span>
  );
}
