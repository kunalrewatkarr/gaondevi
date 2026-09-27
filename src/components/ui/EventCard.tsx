import type { MandalEvent } from "@/data/events";

interface EventCardProps {
  event: MandalEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-vermillion/12 bg-card p-5 shadow-sm shadow-vermillion/5 sm:p-6">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-vermillion via-terracotta to-saffron"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-vermillion via-terracotta to-saffron"
        aria-hidden="true"
      />
      <p className="pl-3 text-sm font-semibold tracking-wide text-vermillion">
        {event.date}
      </p>
      <h3 className="mt-3 pl-3 font-display text-xl leading-[1.4] text-ink sm:text-2xl">
        {event.title}
      </h3>
      {event.time ? (
        <p className="mt-2 pl-3 text-sm font-medium leading-relaxed text-terracotta">
          {event.time}
        </p>
      ) : null}
      {event.description ? (
        <p className="mt-3 flex-1 pl-3 text-sm leading-relaxed text-ink-muted">
          {event.description}
        </p>
      ) : null}
      {event.isPlaceholder ? (
        <span className="ml-3 mt-3 inline-block rounded-full bg-ivory px-2.5 py-1 text-xs text-ink-muted">
          अद्ययावत माहिती लवकरच
        </span>
      ) : null}
    </article>
  );
}
