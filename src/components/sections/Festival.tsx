import { festivalIntro, festivalDays } from "@/data/festival";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

export function Festival() {
  return (
    <section id="festival" className="section-padding section-surface-alt relative">
      <div className="container-main relative">
        <SectionHeading
          kicker="नवरात्र"
          title={festivalIntro.heading}
          subtitle={festivalIntro.significance}
          className="mb-8 md:mb-10"
        />

        <FadeIn>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-ink-muted md:mb-14">
            {festivalIntro.description}
          </p>
        </FadeIn>

        <ol className="relative grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {festivalDays.map((day, i) => (
            <FadeIn key={day.day} delay={i * 70} as="li">
              <Card lift className="relative h-full overflow-hidden p-6 sm:p-7">
                <span className="font-display text-5xl text-vermillion/20" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-semibold tracking-wide text-terracotta">
                  {day.day}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{day.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {day.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
