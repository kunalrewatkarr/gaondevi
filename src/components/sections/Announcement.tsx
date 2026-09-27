import { announcements } from "@/data/announcements";
import { FadeIn } from "@/components/ui/FadeIn";

export function Announcement() {
  const active = announcements.filter((a) => a.isActive);
  if (active.length === 0) return null;

  return (
    <section
      className="bg-gradient-to-r from-vermillion via-maroon to-terracotta py-10 md:py-12"
      aria-label="महत्त्वाच्या सूचना"
    >
      <div className="container-main">
        {active.map((item) => (
          <FadeIn key={item.id}>
            <div className="mx-auto max-w-3xl text-center text-cream">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-saffron">
                {item.title}
              </p>
              <p className="font-display text-xl leading-snug sm:text-2xl md:text-3xl">
                {item.message}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
