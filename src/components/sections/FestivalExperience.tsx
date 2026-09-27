import Image from "next/image";
import { mandapImages } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";

const highlights = [
  { title: "भव्य मंडप", description: "सजीव आणि आकर्षक मंडप सजावट" },
  { title: "प्रकाशयोजना", description: "रंगीत प्रकाशाने उजळलेले वातावरण" },
  { title: "भक्तांची उपस्थिती", description: "दर्शनासाठी भाविकांची मोठी गर्दी" },
  { title: "सांस्कृतिक वातावरण", description: "गरबा, भजन आणि सांस्कृतिक कार्यक्रम" },
];

export function FestivalExperience() {
  const photos = [mandapImages.primary, mandapImages.secondary, mandapImages.tertiary];

  return (
    <section id="experience" className="section-padding overflow-hidden bg-night">
      <div className="container-main">
        <SectionHeading
          kicker="अनुभव"
          title="उत्सवाची भव्यता"
          subtitle="मंडप, सजावट आणि भक्तिमय वातावरणाचा अनुभव"
          tone="dark"
        />

        <div className="mb-12 grid gap-4 md:grid-cols-2">
          {photos.map((src, i) => (
            <FadeIn
              key={src}
              delay={i * 90}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <div
                className={`relative overflow-hidden rounded-3xl ${
                  i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={src}
                  alt={`उत्सवाचे दृश्य ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <FadeIn key={item.title} delay={i * 70}>
              <div className="surface-panel-dark h-full p-6">
                <h3 className="font-display text-2xl text-gold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
