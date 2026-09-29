import Image from "next/image";
import { mandapImages } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { FestivalCarousel } from "@/components/ui/FestivalCarousel";

const highlights = [
  { title: "भव्य मंडप", description: "सजीव आणि आकर्षक मंडप सजावट" },
  { title: "प्रकाशयोजना", description: "रंगीत प्रकाशाने उजळलेले वातावरण" },
  { title: "भक्तांची उपस्थिती", description: "दर्शनासाठी भाविकांची मोठी गर्दी" },
  { title: "सांस्कृतिक वातावरण", description: "गरबा, भजन आणि सांस्कृतिक कार्यक्रम" },
];

const photos = [
  {
    src: mandapImages.primary,
    alt: "उत्सवाचा मंडप — नवयुवक दुर्गा उत्सव मंडळ",
    caption: "मंडप",
  },
  {
    src: mandapImages.secondary,
    alt: "मंडपाची सजावट — नवयुवक दुर्गा उत्सव मंडळ",
    caption: "सजावट",
  },
  {
    src: mandapImages.tertiary,
    alt: "नवरात्र उत्सवाचे दृश्य — नवयुवक दुर्गा उत्सव मंडळ",
    caption: "दर्शन",
  },
  {
    src: mandapImages.quaternary,
    alt: "उत्सवाचे भव्य दृश्य — नवयुवक दुर्गा उत्सव मंडळ",
    caption: "उत्सव",
  },
];

export function FestivalExperience() {
  return (
    <section id="experience" className="section-padding overflow-hidden festival-bg">
      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
        <div className="sparkle-particle" />
      </div>

      <div className="container-main relative z-10">
        <FadeIn>
          <SectionHeading
            kicker="अनुभव"
            title={<span className="text-gradient-gold">उत्सवाची भव्यता</span>}
            subtitle="मंडप, सजावट आणि भक्तिमय वातावरणाचा अनुभव"
            tone="dark"
            shimmerDivider
          />
        </FadeIn>

        {/* Featured Image Carousel */}
        <FadeIn delay={150} className="mb-12">
          <FestivalCarousel photos={photos} />
        </FadeIn>

        {/* Highlight Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <FadeIn key={item.title} delay={i * 70 + 300}>
              <div className="surface-panel-dark h-full p-6 transition-transform hover:scale-[1.02]">
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
