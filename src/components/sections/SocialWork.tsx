import { socialInitiatives } from "@/data/social-work";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

export function SocialWork() {
  return (
    <section id="social" className="section-padding section-surface-alt">
      <div className="container-main">
        <SectionHeading
          kicker="समाजसेवा"
          title="सामाजिक उपक्रम"
          subtitle="मंडळाकडून दरवर्षी राबवले जाणारे समाजोपयोगी उपक्रम"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {socialInitiatives.map((item, i) => (
            <FadeIn key={item.id} delay={i * 50}>
              <Card
                as="article"
                lift
                className="flex h-full gap-4 p-6"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-vermillion text-2xl text-cream"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
