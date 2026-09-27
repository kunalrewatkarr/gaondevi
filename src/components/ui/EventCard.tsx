import type { MandalEvent } from "@/data/events";

interface EventCardProps {
  event: MandalEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/30 bg-card p-5 shadow-sm shadow-ink/5 sm:p-6">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-maroon via-gold to-gold-bright"
        aria-hidden="true"
      />
      <p className="text-sm font-semibold tracking-wide text-gold-ink">
        {event.date}
      </p>
      <h3 className="mt-3 font-display text-xl leading-[1.4] text-ink sm:text-2xl">
        {event.title}
      </h3>
      {event.time ? (
        <p className="mt-2 text-sm font-medium leading-relaxed text-gold-ink">
          {event.time}
        </p>
      ) : null}
      {event.description ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {event.description}
        </p>
      ) : null}
      {event.isPlaceholder ? (
        <span className="mt-3 inline-block rounded-full bg-ivory px-2.5 py-1 text-xs text-ink-muted">
          अद्ययावत माहिती लवकरच
        </span>
      ) : null}
    </article>
  );
}
