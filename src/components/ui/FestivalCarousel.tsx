"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface FestivalCarouselProps {
  photos: Photo[];
}

export function FestivalCarousel({ photos }: FestivalCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, photos.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % photos.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + photos.length) % photos.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-night/50 ring-1 ring-saffron/30">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority={index === 0}
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <span className="inline-block rounded-full bg-saffron/20 px-3 py-1 text-sm font-medium text-saffron backdrop-blur-sm ring-1 ring-saffron/30">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-night/60 backdrop-blur-sm text-cream transition-all hover:bg-night/80 hover:scale-110 focus-ring-dark md:left-4"
          aria-label="मागील फोटो"
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-night/60 backdrop-blur-sm text-cream transition-all hover:bg-night/80 hover:scale-110 focus-ring-dark md:right-4"
          aria-label="पुढील फोटो"
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
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 md:bottom-4">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeSlide
                  ? "w-6 bg-saffron"
                  : "w-2 bg-cream/40 hover:bg-cream/60"
              }`}
              aria-label={`फोटो ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
