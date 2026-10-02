"use client";

import Link from "next/link";
import { contactInfo, socialLinks } from "@/data/contact";
import { mobileNavigation, siteConfig } from "@/data/site";
import { useTranslation } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true" fill="currentColor">
      <path d="M22.54 7.36a2.75 2.75 0 0 0-1.94-1.95C18.88 5 12 5 12 5s-6.88 0-8.6.41A2.75 2.75 0 0 0 1.46 7.36 28.7 28.7 0 0 0 1 12a28.7 28.7 0 0 0 .46 4.64 2.75 2.75 0 0 0 1.94 1.95C5.12 19 12 19 12 19s6.88 0 8.6-.41a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 23 12a28.7 28.7 0 0 0-.46-4.64zM10 15.02V8.98L15.5 12 10 15.02z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true" fill="currentColor">
      <path d="M14.5 8.5H17V5h-2.5C12.01 5 10 7.01 10 9.5V11H8v3.5h2V21h3.5v-6.5H16L16.75 11H13.5V9.5c0-.55.45-1 1-1z" />
    </svg>
  );
}

const socialItems = [
  {
    key: "instagram" as const,
    label: "Instagram",
    href: socialLinks.instagram,
    icon: <InstagramIcon />,
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    href: socialLinks.youtube,
    icon: <YouTubeIcon />,
  },
  {
    key: "facebook" as const,
    label: "Facebook",
    href: socialLinks.facebook,
    icon: <FacebookIcon />,
  },
];

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const visibleSocial = socialItems.filter((item) => Boolean(item.href));

  return (
    <footer className="relative z-10 border-t border-gold/30 bg-gradient-to-b from-wine via-night to-night text-cream">
      <div className="container-main pt-12 pb-24 sm:py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Logo size="lg" variant="light" className="md:[&>div:first-child]:h-36 md:[&>div:first-child]:w-36" />
            <h3 className="mt-5 font-display text-xl leading-snug md:text-2xl">
              {t("site.name")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gold/90">
              {t("site.honorific")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {t("contact.line1")}
              <br />
              {t("contact.line2")}
            </p>
            <p className="mt-2 text-sm text-gold">
              {t("site.foundedColon", { year: siteConfig.foundedYear })}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">{t("footer.links")}</h4>
            <ul className="space-y-1">
              {mobileNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded text-sm text-cream/70 transition-colors hover:text-gold focus-ring-dark"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="rounded transition-colors hover:text-gold focus-ring-dark"
                >
                  {t("footer.call", { phone: contactInfo.phone })}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/91${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-gold focus-ring-dark"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-gold focus-ring-dark"
                >
                  {t("footer.map")}
                </a>
              </li>
              <li>
                <Link
                  href="#donation"
                  className="rounded transition-colors hover:text-gold focus-ring-dark"
                >
                  {t("nav.donate")}
                </Link>
              </li>
              <li className="leading-relaxed">
                {t("contact.line1")}
                <br />
                {t("contact.line2")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">{t("footer.connect")}</h4>
            {visibleSocial.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {visibleSocial.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-gold ring-1 ring-gold/50 transition-all duration-200 hover:scale-105 hover:bg-gold hover:text-night focus-ring-dark"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-cream/65">
                {t("footer.socialSoon")}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-cream/55">
            {t("footer.rights", { year, name: t("site.name") })}
          </p>
          <p className="text-xs text-cream/45">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
