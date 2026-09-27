"use client";

import { stats } from "@/data/stats";
import { Counter } from "@/components/ui/Counter";
import { FadeIn } from "@/components/ui/FadeIn";

export function Stats() {
  return (
    <section className="stats-gradient py-14 md:py-16" aria-label="मंडळाची सांख्यिकी">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 70}>
              <div className="relative px-1 text-center text-cream">
                <div
                  className="absolute inset-0 -z-10 mx-auto h-24 w-24 rounded-full bg-cream/10 blur-2xl"
                  aria-hidden="true"
                />
                <p className="font-display text-4xl leading-none sm:text-5xl md:text-6xl">
                  <Counter
                    target={stat.target}
                    suffix={stat.suffix}
                    numerals={stat.numerals}
                    delay={i * 120}
                    duration={2200}
                  />
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-cream/85 md:text-base">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
