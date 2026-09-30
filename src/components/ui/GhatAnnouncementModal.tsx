"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function GhatAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("ghatAnnouncementShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("ghatAnnouncementShown", "true");
      setIsOpen(true);
      wasOpenRef.current = true;
      document.body.style.overflow = "hidden";
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (wasOpenRef.current) {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/60 backdrop-blur-sm transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ghat-announcement-title"
    >
      <div
        className="relative mx-4 w-full max-w-[360px] rounded-3xl bg-card p-5 shadow-2xl ring-1 ring-gold/30 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream/50 text-ink-muted transition-colors hover:bg-cream hover:text-ink focus-ring"
          aria-label="बंद करा"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <h2
          id="ghat-announcement-title"
          className="mb-4 pr-8 font-display text-xl font-semibold text-maroon"
        >
          🔔 घट बुकिंग सूचना
        </h2>

        <div className="mb-4 space-y-3 text-sm leading-relaxed text-ink">
          <p>
            यंदाच्या नवरात्र उत्सवासाठी घट बसवू इच्छिणाऱ्या सर्व भाविकांना विनंती आहे की, त्यांनी लवकरात लवकर आपल्या घटाची नोंदणी करावी.
          </p>
          <p>
            नोंदणीसाठी आवश्यक माहिती: आपले पूर्ण नाव आणि संपर्क क्रमांक.
          </p>

          <div className="space-y-2">
            <p className="font-medium text-ink">घट माहिती:</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-gold/50 bg-cream px-3 py-1.5 text-xs font-medium text-maroon">
                ज्योत कालावधी: ९ दिवस ९ रात्र (अखंड दिप प्रज्वलन)
              </span>
              <span className="inline-flex items-center rounded-full border border-gold/50 bg-cream px-3 py-1.5 text-xs font-medium text-maroon">
                संकल्प राशी: रु. ८०१/- फक्त
              </span>
              <span className="inline-flex items-center rounded-full border border-gold/50 bg-cream px-3 py-1.5 text-xs font-medium text-maroon">
                ज्योत आणणार आहे: श्री रेणुकादेवी मंदिर, माहूरगड, नांदेड येथून
              </span>
            </div>
          </div>

          <p>
  संपर्क: घट बुकिंगसाठी 7769886682 या फोन नंबरवर संपर्क साधावा.
  <br />
  नोंदणीची अंतिम तारीख: ५ ऑक्टोबर २०२६
</p>
        </div>

        <button
          onClick={handleClose}
          className="w-full rounded-2xl bg-vermillion px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-vermillion-dark focus-ring"
        >
          ठीक आहे
        </button>
      </div>
    </div>
  );
}
