"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { contactInfo } from "@/data/contact";
import { useTranslation } from "@/context/LanguageContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

const UPI_ID = "7709716783@okbizaxis";
const PAYEE_NAME = "Navyuvak Durga Utsav Mandal";
const NOTE = "Navratri Yogdan";

const AMOUNTS = [101, 251, 501, 1101];

export function Donation() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const amount = selectedAmount || (customAmount ? parseFloat(customAmount) : null);
  const upiLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&tn=${encodeURIComponent(NOTE)}&cu=INR${amount ? `&am=${amount}` : ""}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(prev => prev === value ? null : value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <section id="donation" className="section-padding-sm section-surface-alt">
      <div className="container-main">
        <FadeIn>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-vermillion via-maroon to-wine px-5 py-9 text-center text-cream shadow-xl shadow-vermillion/25 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold text-saffron">
              {t("donation.kicker")}
            </p>
            <h2 className="mt-4 font-display text-2xl leading-snug sm:text-3xl md:text-4xl">
              {t("donation.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              {t("donation.description")}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="lg"
                onClick={() => setOpen(true)}
                className="min-h-14 w-full px-10 text-xl shadow-[0_10px_32px_-8px_rgba(212,165,55,0.85)] sm:min-w-[16rem] sm:w-auto"
              >
                {t("common.donate")}
              </Button>
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-saffron/70 px-8 py-4 text-lg font-semibold tracking-wide text-cream transition-all duration-300 hover:border-saffron hover:bg-saffron/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-maroon sm:w-auto"
              >
                {t("common.contactCta")}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[min(92dvh,40rem)] w-[min(100%-1.5rem,28rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border-0 bg-transparent p-0 backdrop:bg-night/70"
        onClose={() => setOpen(false)}
        aria-labelledby={titleId}
      >
        <div className="rounded-[1.75rem] bg-card p-5 shadow-2xl ring-1 ring-ink/10 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gold-ink">
                {t("donation.kicker")}
              </p>
              <h3 id={titleId} className="mt-2 font-display text-xl leading-snug text-ink sm:text-2xl">
                {t("donation.title")}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-ink hover:bg-paper focus-ring"
              aria-label={t("common.close")}
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {t("donation.modalText")}
          </p>

          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountSelect(amt)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 ${
                    selectedAmount === amt
                      ? "border-gold bg-gold text-night scale-105 shadow-[0_0_20px_rgba(212,165,55,0.4)]"
                      : "border-gold/50 text-ink hover:border-gold hover:bg-gold/10"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder={t("donation.otherAmount")}
                  className="w-36 rounded-full border-2 border-gold/50 px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              </div>
            </div>

            <div className="relative inline-block rounded-2xl border-2 border-gold/30 bg-ivory p-4 ring-1 ring-gold/20">
              <div className="relative mx-auto aspect-square w-[min(100%,13rem)] overflow-hidden rounded-xl bg-white sm:w-52">
                <QRCodeSVG
                  value={upiLink}
                  size={208}
                  level="H"
                  includeMargin={false}
                  className="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white p-1.5 shadow-lg">
                    <Image
                      src="/images/logo/mandal-logo.png"
                      alt={t("donation.logoAlt")}
                      width={37}
                      height={37}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-ink">
                {t("donation.scan")}
              </p>
            </div>

            <a
              href={upiLink}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-lg font-semibold text-night shadow-[0_10px_32px_-8px_rgba(212,165,55,0.85)] transition-all duration-150 hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(212,165,55,0.95)] active:scale-[0.98] sm:hidden focus-ring"
            >
              {t("common.upiDonate")}
            </a>

            <div className="hidden sm:block text-center text-sm text-ink-muted">
              {t("donation.scanPhone")}
            </div>

            <div className="rounded-2xl bg-ivory px-4 py-3 ring-1 ring-ink/8">
              <p className="text-xs text-ink-muted">UPI ID</p>
              <p className="mt-1 break-all font-medium text-ink">
                {UPI_ID}
              </p>
              <div className="mt-3">
                <Button type="button" size="sm" onClick={copyUpi} className="w-full sm:w-auto">
                  {copied ? t("common.copied") : t("common.copy")}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${contactInfo.phone}`}
                className="btn-pill btn-pill-call focus-ring"
              >
                {t("donation.callWithPhone", { phone: contactInfo.phone })}
              </a>
              <a
                href={`https://wa.me/91${contactInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-wa focus-ring"
              >
                {t("common.whatsapp")}
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-6 w-full rounded-full border border-ink/15 px-4 py-3.5 text-sm font-medium text-ink hover:bg-ivory focus-ring"
          >
            {t("common.close")}
          </button>
        </div>
      </dialog>
    </section>
  );
}
