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

        <div id="aarti" className="mb-12 grid scroll-mt-28 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {festivalHighlights.map((item, i) => (
            <FadeIn key={item.id} delay={i * 40}>
              <div className="group flex h-full flex-col items-start gap-3 rounded-3xl border border-gold/25 bg-card p-4 shadow-sm shadow-ink/5 transition-all duration-200 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md hover:shadow-gold/15">
                <span className="icon-badge" aria-hidden="true">
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
              <p className="text-xs font-semibold text-gold-ink">
                वेळापत्रक
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                कार्यक्रम
              </h3>
            </div>
            <div
              className="hidden h-px flex-1 bg-gradient-to-r from-gold/50 via-gold-bright/40 to-transparent sm:block"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div
              className="absolute bottom-6 left-[7px] top-6 w-0.5 bg-gradient-to-b from-gold via-gold-bright to-gold/25"
              aria-hidden="true"
            />
            <ol className="list-none space-y-4">
              {navratriEvents.map((event, i) => (
                <FadeIn key={event.id} delay={i * 50} as="li">
                  <div className="relative pl-8 sm:pl-10">
                    <span
                      className="absolute left-0 top-7 h-4 w-4 rounded-full border-2 border-gold-bright bg-gold shadow-[0_0_0_4px_rgba(201,150,44,0.22)]"
                      aria-hidden="true"
                    />
                    <EventCard event={event} />
                  </div>
                </FadeIn>
              ))}
            </ol>
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
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-ink"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M12 2.2c.5 2-.4 3.4-1.6 4.4 1.9.3 3.3 1.5 3.3 3.2 0 .3 0 .6-.1.9 2.1.6 3.5 2 3.5 3.8 0 2.5-2.5 4.5-5.1 4.5s-5.1-2-5.1-4.5c0-1.8 1.4-3.2 3.5-3.8-.1-.3-.1-.6-.1-.9 0-1.3.9-2.3 2.1-2.8C10.4 5.4 10 3.8 12 2.2z" />
                      <path d="M8.2 20.2h7.6c.2.8.1 1.5-.2 2.1H8.4c-.3-.6-.4-1.3-.2-2.1z" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <div className="overflow-hidden rounded-[2rem] border border-vermillion/15 bg-gradient-to-b from-wine/[0.04] via-paper/80 to-saffron/[0.08] p-5 sm:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gold-ink">
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
                <article
                  id={
                    program.id === "p5"
                      ? "mahaprasad"
                      : program.id === "p8"
                        ? "visarjan"
                        : undefined
                  }
                  className="group card-lift flex h-full scroll-mt-28 flex-col rounded-3xl border border-gold/25 bg-card p-5 shadow-sm shadow-ink/5 sm:p-6"
                >
                  <span
                    className="icon-badge text-2xl transition-transform duration-200 group-hover:scale-105"
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
