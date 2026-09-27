import {
  festivalHighlights,
  navratriEvents,
  participationItems,
  programs,
} from "@/data/events";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/ui/EventCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { FestivalCountdown } from "../ui/FestivalCountdown";

export function Events() {
  return (
    <section id="events" className="section-padding relative overflow-hidden events-surface">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-vermillion/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-32 h-64 w-64 rounded-full bg-saffron/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-main relative">
        <SectionHeading
          kicker="वार्षिक उपक्रम"
          title="नवरात्र उत्सव २०२६"
          subtitle="नवरात्र उत्सवातील वार्षिक कार्यक्रम व उपक्रम"
        />

        <FadeIn>
          <div className="mb-10 flex justify-center md:mb-12">
            <FestivalCountdown />
          </div>
        </FadeIn>

        <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {festivalHighlights.map((item, i) => (
            <FadeIn key={item.id} delay={i * 40}>
              <div className="group flex h-full flex-col items-start gap-2 rounded-2xl border border-vermillion/12 bg-card p-4 shadow-sm shadow-vermillion/5 transition-all duration-300 hover:-translate-y-1 hover:border-saffron/40 hover:shadow-md hover:shadow-saffron/10">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vermillion/15 to-saffron/20 text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <h3 className="font-display text-lg leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mb-16 md:mb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-vermillion">
                वेळापत्रक
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                कार्यक्रम
              </h3>
            </div>
            <div
              className="hidden h-px flex-1 bg-gradient-to-r from-vermillion/35 via-saffron/40 to-transparent sm:block"
              aria-hidden="true"
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {navratriEvents.map((event, i) => (
              <FadeIn key={event.id} delay={i * 50}>
                <EventCard event={event} />
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn>
          <div className="mb-16 overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-card via-paper to-saffron/10 p-6 shadow-sm shadow-ink/5 sm:p-8 md:mb-20">
            <h3 className="font-display text-2xl text-ink sm:text-3xl">
              उत्सवात सहभागी व्हा
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              भक्ती, दर्शन आणि सामाजिक उपक्रमांमध्ये सहभागी होऊन उत्सवाला
              अर्थपूर्ण बनवा.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {participationItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-vermillion/10 bg-ivory/60 px-4 py-3 text-sm text-ink"
                >
                  <span className="mt-0.5 text-vermillion" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <div className="overflow-hidden rounded-[2rem] border border-vermillion/15 bg-gradient-to-b from-wine/[0.04] via-paper/80 to-saffron/[0.08] p-5 sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-vermillion">
              उपक्रम
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              वार्षिक उपक्रम
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted sm:text-base">
              भक्ती, संस्कृती आणि सामाजिक बांधिलकीचे विविध उपक्रम
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {programs.map((program, i) => (
              <FadeIn key={program.id} delay={i * 40}>
                <article className="group card-lift flex h-full flex-col rounded-3xl border border-vermillion/10 bg-card p-5 shadow-sm shadow-ink/5 sm:p-6">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-vermillion/15 via-terracotta/10 to-saffron/20 text-2xl transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {program.icon}
                  </span>
                  <h4 className="mt-4 font-display text-xl leading-snug text-ink">
                    {program.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {program.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
