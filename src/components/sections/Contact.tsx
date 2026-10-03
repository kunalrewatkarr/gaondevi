"use client";

import { useState } from "react";
import { contactInfo } from "@/data/contact";
import { useTranslation } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Card } from "@/components/ui/Card";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.8h2.2l1.2 3-1.5 1a12.5 12.5 0 0 0 6.3 6.3l1-1.5 3 1.2V16a2 2 0 0 1-2.2 2A15.2 15.2 0 0 1 5 5.9 2 2 0 0 1 7 3.8z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true" fill="currentColor">
      <path d="M12.04 3.2A8.7 8.7 0 0 0 4.6 16.3L3.4 20.6l4.4-1.15A8.7 8.7 0 1 0 12.04 3.2zm5.05 12.3c-.21.6-1.23 1.1-1.7 1.17-.44.06-.99.09-1.6-.1-.37-.11-.84-.27-1.45-.53-2.55-1.1-4.2-3.67-4.33-3.84-.12-.17-1.04-1.38-1.04-2.63 0-1.25.66-1.86.9-2.11.23-.26.51-.32.68-.32h.49c.16 0 .37-.06.58.44.21.52.72 1.8.78 1.93.06.13.1.28.02.45-.08.17-.12.28-.24.43-.12.15-.25.33-.36.44-.12.12-.24.25-.1.49.13.23.6.99 1.29 1.6.89.79 1.64 1.04 1.87 1.16.23.11.37.1.5-.06.14-.17.58-.67.73-.9.15-.23.3-.19.51-.11.21.08 1.32.62 1.55.74.23.11.38.17.44.26.06.1.06.55-.15 1.15z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

const hasRealMap =
  Boolean(contactInfo.mapEmbedUrl) &&
  !contactInfo.mapEmbedUrl.includes("1s0x0%3A0x0");

export function Contact() {
  const { t } = useTranslation();
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
      `*${t("site.name")}*`,
      t("contact.whatsappHeader"),
      "------------------------",
      "",
      `*${t("contact.name")}:* ${name}`,
      `*${t("contact.phone")}:* ${phone}`,
    ];

    if (email) lines.push(`*${t("contact.email")}:* ${email}`);
    lines.push("", `*${t("contact.message")}:*`, message);

    const whatsappText = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/91${contactInfo.whatsapp}?text=${whatsappText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding section-surface">
      <div className="container-main">
        <SectionHeading
          kicker={t("contact.kicker")}
          title={t("contact.heading")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-5">
              <Card className="p-6">
                <h3 className="mb-3 font-display text-2xl leading-snug text-maroon">
                  {t("contact.locationHeading")}
                </h3>
                <div className="space-y-1 text-base leading-[1.85] text-ink">
                  <p>{t("contact.line1")}</p>
                  <p>{t("contact.line2")}</p>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="btn-pill btn-pill-call focus-ring"
                >
                  <PhoneIcon />
                  {t("common.call")}
                </a>

                {contactInfo.whatsapp ? (
                  <a
                    href={`https://wa.me/91${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-pill-wa focus-ring"
                  >
                    <WhatsAppIcon />
                    {t("common.whatsapp")}
                  </a>
                ) : null}

                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-gold focus-ring"
                >
                  <PinIcon />
                  {t("common.directions")}
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
                    title={t("a11y.mapTitle")}
                    className="h-[220px] w-full sm:h-[280px]"
                  />
                ) : (
                  <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 bg-card px-6 py-10 text-center">
                    <p className="font-display text-xl text-ink">{t("contact.placeFallback")}</p>
                    <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                      {t("contact.address")}
                    </p>
                  </div>
                )}
                <div className="bg-card p-3 text-center">
                  <a
                    href={contactInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded px-2 text-sm font-medium text-gold-ink hover:underline focus-ring"
                  >
                    {t("contact.mapLinkArrow")}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <Card className="p-6 md:p-8">
              <h3 className="mb-2 font-display text-2xl text-ink">
                {t("contact.formTitle")}
              </h3>
              <p className="mb-6 text-sm text-ink-muted">
                {t("contact.formHelpBefore")}{" "}
                <strong className="text-ink">{t("contact.formHelpSend")}</strong>{" "}
                {t("contact.formHelpAfter", { phone: contactInfo.whatsapp })}
              </p>

              {submitted ? (
                <div
                  className="space-y-4 rounded-2xl bg-vermillion/10 p-6 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-lg font-medium text-ink">
                    {t("contact.openedTitle")}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {t("contact.openedBefore")}{" "}
                    <strong>{t("contact.formHelpSend")}</strong>{" "}
                    {t("contact.openedAfter")}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-2"
                  >
                    {t("contact.sendAgain")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      {t("contact.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="field-input"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      {t("contact.phone")}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="field-input"
                      placeholder={t("contact.phonePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-ink-muted"
                    >
                      {t("contact.email")}{" "}
                      <span className="font-normal text-ink-muted/60">
                        {t("contact.optional")}
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
                      {t("contact.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="field-input resize-none"
                      placeholder={t("contact.messagePlaceholder")}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    {t("contact.submit")}
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
