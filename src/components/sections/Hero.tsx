import Image from "next/image";
import { siteConfig } from "@/data/site";
import { durgaImages } from "@/data/images";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-x-hidden"
      aria-label="मुख्य परिचय"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={durgaImages.hero}
          alt="श्री दुर्गा माता — नवयुवक दुर्गा उत्सव मंडळ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_52%]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/15" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-night/90 via-night/40 to-transparent sm:block" />

      <div
        className="animate-pulse-glow absolute -left-24 top-16 h-80 w-80 rounded-full bg-vermillion/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-pulse-glow absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-saffron/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-main relative z-10 w-full pb-36 pt-24 sm:pb-20 sm:pt-36 md:pb-28">
        <div className="grid items-end gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-3xl">
            <p className="animate-fade-up mb-4 max-w-full rounded-2xl border border-gold/35 bg-night/55 px-3.5 py-2 text-sm leading-relaxed text-rose-gold backdrop-blur-sm sm:inline-block sm:rounded-full sm:px-4">
              {siteConfig.honorific}
            </p>

            <p className="animate-fade-up animation-delay-200 text-sm leading-relaxed text-cream/70">
              स्थापना {siteConfig.foundedYear} · {siteConfig.location}
            </p>

            <h1 className="animate-fade-up animation-delay-200 mt-3 font-display text-[1.85rem] leading-[1.4] text-cream sm:text-4xl sm:leading-[1.35] md:text-5xl md:leading-[1.3] lg:text-6xl lg:leading-[1.28]">
              {siteConfig.name}
            </h1>

            <p className="animate-fade-up animation-delay-400 mt-5 font-display text-lg leading-[1.55] text-saffron sm:text-xl md:text-2xl lg:text-3xl">
              {siteConfig.tagline}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:mt-6 sm:text-lg">
              {siteConfig.welcomeMessage}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href="#durga" size="lg" className="w-full sm:w-auto">
                दर्शन
              </Button>
              <Button
                href="#events"
                variant="outline-light"
                size="lg"
                className="w-full sm:w-auto"
              >
                २०२६ चा कार्यक्रम
              </Button>
            </div>
          </div>

          <div className="animate-fade-up animation-delay-400 hidden justify-center sm:flex lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/35 via-vermillion/25 to-amber/15 blur-xl"
                aria-hidden="true"
              />
              <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-[2rem] border-2 border-gold/50 shadow-2xl shadow-night/50 ring-4 ring-gold/20 sm:w-64 lg:w-72">
                <Image
                  src={durgaImages.main}
                  alt="श्री दुर्गा मातेची मूर्ती — दर्शन"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  priority
                  loading="eager"
                  className="object-cover object-[center_12%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-4 pt-12">
                  <p className="text-center font-display text-lg text-gold">
                    श्री दुर्गामाता
                  </p>
                  <p className="text-center text-xs text-cream/70">
                    दर्शनासाठी येथे भेट द्या
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full p-3 text-cream/70 transition-colors hover:text-cream focus-ring-dark sm:bottom-6"
        aria-label="पुढे स्क्रोल करा"
      >
        <span className="block animate-float text-2xl" aria-hidden="true">
          ↓
        </span>
      </a>
    </section>
  );
}
