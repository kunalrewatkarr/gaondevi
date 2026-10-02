"use client";

import type { MandalEvent } from "@/data/events";
import { useTranslation } from "@/context/LanguageContext";

interface EventCardProps {
  event: MandalEvent;
}

export function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation();
  const date = t(`events.schedule.${event.id}.date`);
  const title = t(`events.schedule.${event.id}.title`);
  const time = t(`events.schedule.${event.id}.time`);
  const description = t(`events.schedule.${event.id}.description`);

  return (
    <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/30 bg-card p-5 shadow-sm shadow-ink/5 sm:p-6">
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-maroon via-gold to-gold-bright"
        aria-hidden="true"
      />
      <p className="text-sm font-semibold tracking-wide text-gold-ink">
        {date}
      </p>
      <h3 className="mt-3 font-display text-xl leading-[1.4] text-ink sm:text-2xl">
        {title}
      </h3>
      {time ? (
        <p className="mt-2 text-sm font-medium leading-relaxed text-gold-ink">
          {time}
        </p>
      ) : null}
      {description ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
      {event.isPlaceholder ? (
        <span className="mt-3 inline-block rounded-full bg-ivory px-2.5 py-1 text-xs text-ink-muted">
          {t("events.updatedSoon")}
        </span>
      ) : null}
    </article>
  );
}
