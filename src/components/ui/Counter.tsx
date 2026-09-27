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
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let safety = 0;

    const finish = () => setDisplay(target);

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced || target <= 0) {
        finish();
        return;
      }

      const start = performance.now() + delay;

      const tick = (now: number) => {
        if (now < start) {
          raf = requestAnimationFrame(tick);
          return;
        }

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(progress >= 1 ? target : Math.round(eased * target));

        if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      safety = window.setTimeout(finish, delay + duration + 300);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate();
        observer.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px 10% 0px" }
    );

    observer.observe(el);

    const probe = window.setInterval(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 24;
      if (!inView) return;
      animate();
      window.clearInterval(probe);
    }, 180);

    const stopProbe = window.setTimeout(() => window.clearInterval(probe), 20000);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      window.clearInterval(probe);
      window.clearTimeout(stopProbe);
    };
  }, [target, duration, delay]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatStatNumber(display, numerals)}
      {suffix}
    </span>
  );
}
