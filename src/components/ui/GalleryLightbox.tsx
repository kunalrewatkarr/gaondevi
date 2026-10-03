"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";
import { useTranslation, type Language } from "@/context/LanguageContext";
import { formatStatNumber } from "@/lib/numerals";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ALL = "all";

function galleryImageAlt(
  image: GalleryImage,
  t: (key: string, vars?: Record<string, string | number>) => string,
  language: Language
) {
  const label = t(image.altKey ?? `gallery.alt.${image.category}`);
  const numerals = language === "en" ? "latin" : "devanagari";
  const count =
    image.altTotal > 1 ? ` ${formatStatNumber(image.altIndex, numerals)}` : "";
  return `${label}${count} — ${t("imageAlt.galleryCredit")}`;
}

const PAGE_SIZE = 12;

interface GalleryLightboxProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const { t, language } = useTranslation();
  const current = images[index];
  const currentAlt = current ? galleryImageAlt(current, t, language) : "";

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Preload adjacent images
  useEffect(() => {
    const preloadIndex = (idx: number) => {
      const img = new window.Image();
      img.src = images[idx].src;
    };
    preloadIndex((index + 1) % images.length);
    preloadIndex((index - 1 + images.length) % images.length);
  }, [index, images]);

  // Touch swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const threshold = 50;

    if (diff > threshold) {
      goNext();
    } else if (diff < -threshold) {
      goPrev();
    }
    touchStartRef.current = null;
  }, [goNext, goPrev]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [onClose, goNext, goPrev]);

  if (!current || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-night/96 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={t("a11y.lightbox")}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeRef}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-ring-dark sm:right-4 sm:top-4"
        aria-label={t("common.close")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 focus-ring-dark md:left-6"
        aria-label={t("a11y.prevPhoto")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div
        className="lightbox-image-container relative z-10 mx-3 max-h-full w-fit max-w-[90vw] overflow-y-auto overscroll-contain sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto w-fit max-w-[90vw] overflow-hidden rounded-2xl ring-1 ring-saffron/30 sm:rounded-3xl">
          <Image
            src={current.src}
            alt={currentAlt}
            width={1200}
            height={900}
            sizes="90vw"
            className="h-auto w-auto max-h-[85vh] max-w-[90vw] object-contain"
            priority
          />
        </div>
        <div className="mt-4 shrink-0 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center">
          <p className="text-base font-medium leading-snug text-cream sm:text-lg">
            {currentAlt}
          </p>
          <p className="mt-1 text-sm text-saffron">{t(`gallery.categories.${current.category}`)}</p>
          <p className="mt-2 text-sm text-cream/65" aria-live="polite">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 focus-ring-dark md:right-6"
        aria-label={t("a11y.nextPhoto")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>,
    document.body
  );
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const { t, language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [ALL, ...new Set(images.map((i) => i.category))],
    [images]
  );

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? images
        : images.filter((i) => i.category === activeCategory),
    [images, activeCategory]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId));
  }, []);

  return (
    <>
      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label={t("a11y.galleryFilters")}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              aria-pressed={isActive}
              className={cn(
                "min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-ring-dark",
                isActive
                  ? "bg-gradient-to-r from-saffron to-gold-bright text-on-gold shadow-md shadow-saffron/30"
                  : "border border-saffron/45 bg-transparent text-cream/75 hover:border-saffron hover:text-cream"
              )}
            >
              {cat === ALL ? t("gallery.all") : t(`gallery.categories.${cat}`)}
              {cat !== ALL && (
                <span className="ml-1.5 opacity-70">
                  ({images.filter((i) => i.category === cat).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-center text-sm text-cream/65">
        {t("gallery.count", { count: filtered.length })}
        {hasMore && t("gallery.shown", { shown: visible.length })}
      </p>

      <div className="gallery-grid-uniform gallery-filter-transition">
        {visible.map((image) => (
          <div
            key={image.id}
            className="gallery-card"
          >
            {/* Skeleton placeholder */}
            {!loadedImages.has(image.id) && (
              <div className="gallery-card-skeleton" />
            )}

            <Image
              src={image.src}
              alt={galleryImageAlt(image, t, language)}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full object-cover transition-transform duration-600",
                loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => handleImageLoad(image.id)}
            />

            {/* Dark overlay on hover */}
            <div className="gallery-overlay" />

            {/* Eye icon button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(filtered.indexOf(image))}
              className="gallery-eye-btn focus-ring-dark"
              aria-label={t("a11y.viewPhoto")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <Button
            type="button"
            variant="outline-light"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            {t("gallery.more", {
              count: Math.min(PAGE_SIZE, filtered.length - visibleCount),
            })}
          </Button>
        </div>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
