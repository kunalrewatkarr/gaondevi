"use client";

import { useState } from "react";
import { contactInfo } from "@/data/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

const hasRealMap =
  Boolean(contactInfo.mapEmbedUrl) &&
  !contactInfo.mapEmbedUrl.includes("1s0x0%3A0x0");

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "*नवयुवक दुर्गा उत्सव मंडळ*",
      "वेबसाइट संपर्क फॉर्म",
      "------------------------",
      "",
      `*नाव:* ${name}`,
      `*फोन:* ${phone}`,
    ];

    if (email) lines.push(`*ईमेल:* ${email}`);
    lines.push("", `*संदेश:*`, message);

    const whatsappText = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/91${contactInfo.whatsapp}?text=${whatsappText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding section-surface">
      <div className="container-main">
        <SectionHeading
          kicker="भेट द्या"
          title={contactInfo.heading}
          subtitle={contactInfo.subheading}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-5">
              <Card className="p-6">
                <h3 className="mb-3 font-display text-2xl leading-snug text-vermillion">
                  {contactInfo.locationHeading}
                </h3>
                <div className="space-y-1 text-base leading-[1.85] text-ink">
                  <p>{contactInfo.addressLines[0]}</p>
                  <p>
                    नागपूर,{" "}
                    <span lang="mr" className="mr-word">
                      महाराष्ट्र
                    </span>
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {contactInfo.landmark}
                </p>
              </Card>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="card-lift surface-card flex min-h-12 flex-col items-center justify-center gap-1 p-4 text-center focus-ring sm:min-h-[4.25rem] sm:p-3"
                >
                  <span className="text-xs text-ink-muted">कॉल करा</span>
                  <span className="text-sm font-medium tracking-wide text-ink tabular-nums">
                    {contactInfo.phone}
                  </span>
                </a>

                {contactInfo.whatsapp ? (
                  <a
                    href={`https://wa.me/91${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-lift surface-card flex min-h-12 flex-col items-center justify-center gap-1 p-4 text-center focus-ring sm:min-h-[4.25rem] sm:p-3"
                  >
                    <span className="text-xs text-ink-muted">WhatsApp करा</span>
                    <span className="text-sm font-medium text-ink">संदेश</span>
                  </a>
                ) : null}

                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift surface-card flex min-h-12 flex-col items-center justify-center gap-1 p-4 text-center focus-ring sm:min-h-[4.25rem] sm:p-3"
                >
                  <span className="text-xs text-ink-muted">दिशा पहा</span>
                  <span className="text-sm font-medium text-ink">नकाशा</span>
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl ring-1 ring-ink/8">
                {hasRealMap ? (
                  <iframe
                    src={contactInfo.mapEmbedUrl}
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="कार्यक्रमाचे ठिकाण — Google Maps"
                    className="h-[220px] w-full sm:h-[280px]"
                  />
                ) : (
                  <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 bg-card px-6 py-10 text-center">
                    <p className="font-display text-xl text-ink">स्थान</p>
                    <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                      {contactInfo.address}
                    </p>
                  </div>
                )}
                <div className="bg-card p-3 text-center">
                  <a
                    href={contactInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded px-2 text-sm font-medium text-vermillion hover:underline focus-ring"
                  >
                    नकाशावर मार्ग पहा →
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <Card className="p-6 md:p-8">
              <h3 className="mb-2 font-display text-2xl text-ink">
                संदेश पाठवा
              </h3>
              <p className="mb-6 text-sm text-ink-muted">
                फॉर्म भरल्यानंतर WhatsApp उघडेल. तिथे{" "}
                <strong className="text-ink">पाठवा</strong> दाबल्यास मंडळाच्या{" "}
                {contactInfo.whatsapp} या नंबरवर संदेश जाईल.
              </p>

              {submitted ? (
                <div
                  className="space-y-4 rounded-2xl bg-vermillion/10 p-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-lg font-medium text-ink">
                    WhatsApp उघडले आहे
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    कृपया WhatsApp मध्ये <strong>पाठवा</strong> बटण दाबून संदेश
                    पाठवा. मंडळाचे कार्यकर्ते तुमच्याशी लवकरच संपर्क करतील.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-2"
                  >
                    पुन्हा संदेश पाठवा
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      नाव
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="field-input"
                      placeholder="आपले नाव"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      फोन नंबर
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="field-input"
                      placeholder="९८७६५४३२१०"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      ईमेल{" "}
                      <span className="font-normal text-ink-muted/60">
                        (ऐच्छिक)
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="field-input"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      संदेश
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="field-input resize-none"
                      placeholder="आपला संदेश..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    WhatsApp वर संदेश पाठवा
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
