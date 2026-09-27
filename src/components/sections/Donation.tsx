"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  buildUpiPayLink,
  donationConfig,
  isDonationPaymentReady,
} from "@/data/donation";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

export function Donation() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const paymentReady = isDonationPaymentReady();
  const upiLink = buildUpiPayLink();

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
    if (!donationConfig.upiId) return;
    try {
      await navigator.clipboard.writeText(donationConfig.upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="donation" className="section-padding-sm section-surface-alt">
      <div className="container-main">
        <FadeIn>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-vermillion via-maroon to-wine px-5 py-9 text-center text-cream shadow-xl shadow-vermillion/25 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-saffron">
              योगदान
            </p>
            <h2 className="mt-4 font-display text-2xl leading-snug sm:text-3xl md:text-4xl">
              {donationConfig.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              {donationConfig.description}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={() => setOpen(true)}
                className="w-full bg-cream text-vermillion hover:bg-saffron hover:text-night sm:w-auto"
              >
                {donationConfig.ctaLabel}
              </Button>
              <a
                href={`tel:${donationConfig.phone}`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-saffron/70 px-8 py-4 text-lg font-semibold tracking-wide text-cream transition-all duration-300 hover:border-saffron hover:bg-saffron/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-maroon sm:w-auto"
              >
                संपर्क करा
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
              <p className="text-xs font-semibold tracking-[0.22em] text-vermillion">
                योगदान
              </p>
              <h3 id={titleId} className="mt-2 font-display text-xl leading-snug text-ink sm:text-2xl">
                {donationConfig.heading}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-ink hover:bg-paper focus-ring"
              aria-label="बंद करा"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {paymentReady
              ? "मंडळाच्या उत्सव व सामाजिक उपक्रमांसाठी आपल्या इच्छेनुसार योगदान द्या."
              : "UPI / QR तपशील लवकरच उपलब्ध होतील. सध्या संपर्क करून योगदान देऊ शकता."}
          </p>

          {paymentReady ? (
            <div className="mt-6 space-y-5">
              {donationConfig.qrCodeImage ? (
                <div className="rounded-2xl bg-ivory p-4 text-center ring-1 ring-ink/8">
                  <p className="mb-3 text-sm font-medium text-ink">
                    QR स्कॅन करून योगदान द्या
                  </p>
                  <div className="relative mx-auto aspect-square w-[min(100%,13rem)] overflow-hidden rounded-xl bg-ivory sm:w-52">
                    <Image
                      src={donationConfig.qrCodeImage}
                      alt="योगदान QR कोड"
                      fill
                      className="object-contain p-2"
                      sizes="208px"
                    />
                  </div>
                </div>
              ) : null}

              {donationConfig.upiId ? (
                <div className="rounded-2xl bg-ivory px-4 py-3 ring-1 ring-ink/8">
                  <p className="text-xs text-ink-muted">UPI ID</p>
                  <p className="mt-1 break-all font-medium text-ink">
                    {donationConfig.upiId}
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Button type="button" size="sm" onClick={copyUpi} className="w-full sm:w-auto">
                      {copied ? "कॉपी झाले" : "UPI ID कॉपी करा"}
                    </Button>
                    {upiLink ? (
                      <a
                        href={upiLink}
                        className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-night-soft focus-ring sm:w-auto"
                      >
                        UPI द्वारे योगदान द्या
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-6 space-y-3 rounded-2xl bg-ivory p-4 ring-1 ring-ink/8">
              <p className="text-sm text-ink-muted">
                योगदानासाठी मंडळाशी संपर्क साधा:
              </p>
              <a
                href={`tel:${donationConfig.phone}`}
                className="block font-display text-2xl text-vermillion focus-ring"
              >
                {donationConfig.phone}
              </a>
              <a
                href={`https://wa.me/91${donationConfig.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-medium text-terracotta hover:underline focus-ring"
              >
                WhatsApp करा →
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-6 w-full rounded-full border border-ink/15 px-4 py-3.5 text-sm font-medium text-ink hover:bg-ivory focus-ring"
          >
            बंद करा
          </button>
        </div>
      </dialog>
    </section>
  );
}
