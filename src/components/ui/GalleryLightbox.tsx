"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
  const current = images[index];

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [onClose, goNext, goPrev]);

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/96 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="फोटो गॅलरी — पूर्णस्क्रीन दृश्य"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute right-3 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 focus-ring-dark sm:right-4 sm:top-4"
        aria-label="बंद करा"
      >
        <span aria-hidden="true">✕</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors hover:bg-cream/20 focus-ring-dark md:left-6"
        aria-label="मागील फोटो"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div
        className="relative mx-3 max-h-[85dvh] w-full max-w-5xl overflow-y-auto sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[min(90vw,56rem)] overflow-hidden rounded-2xl ring-1 ring-gold/20 sm:rounded-3xl">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center">
          <p className="text-base font-medium leading-snug text-cream sm:text-lg">
            {current.alt}
          </p>
          <p className="mt-1 text-sm text-gold">{current.category}</p>
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
        aria-label="पुढील फोटो"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("सर्व");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(
    () => ["सर्व", ...new Set(images.map((i) => i.category))],
    [images]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "सर्व"
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

  return (
    <>
      <div
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="गॅलरी श्रेणी"
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
                  ? "bg-gradient-to-r from-vermillion to-terracotta text-cream shadow-md"
                  : "bg-cream/10 text-cream/80 hover:bg-cream/20"
              )}
            >
              {cat}
              {cat !== "सर्व" && (
                <span className="ml-1.5 opacity-70">
                  ({images.filter((i) => i.category === cat).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-center text-sm text-cream/65">
        {filtered.length} फोटो
        {hasMore && ` · ${visible.length} दाखवले`}
      </p>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(filtered.indexOf(image))}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl focus-ring-dark"
            aria-label={`${image.alt} — मोठ्या आकारात पहा`}
          >
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-cream/10">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night/90 via-night/25 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <div className="w-full p-4">
                  <p className="text-sm font-medium text-cream">{image.alt}</p>
                  <p className="mt-0.5 text-xs text-gold/90">{image.category}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <Button
            type="button"
            variant="outline-light"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            आणखी {Math.min(PAGE_SIZE, filtered.length - visibleCount)} फोटो पहा
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
