"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ProductVisual } from "@/components/product-visual";

interface ProductGalleryProps {
  image: string;
  imageUrl?: string;
  name: string;
  subtitle: string;
  badge?: string | null;
}

export function ProductGallery({
  image,
  imageUrl,
  name,
  subtitle,
  badge,
}: ProductGalleryProps) {
  // For now, duplicate the same image 3 times as placeholders.
  // Replace with real image arrays when available.
  const slides = [
    { image, imageUrl, label: "Front" },
    { image, imageUrl, label: "Side" },
    { image, imageUrl, label: "Detail" },
  ];

  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [slides.length]
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta < 0) goTo(active + 1);
      else goTo(active - 1);
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, goTo]);

  return (
    <div className="animate-fade-up">
      {/* Main image area */}
      <div
        className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide track */}
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(calc(-${(active * 100) / slides.length}% + ${touchDelta}px))`,
            transition: touchStart !== null ? "none" : undefined,
          }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative h-full" style={{ width: `${100 / slides.length}%` }}>
              <ProductVisual
                image={slide.image}
                imageUrl={slide.imageUrl}
                name={name}
                subtitle={subtitle}
              />
            </div>
          ))}
        </div>

        {/* Badge */}
        {badge && (
          <span className="badge absolute left-4 top-4 z-10">{badge}</span>
        )}

        {/* Dot indicators (mobile) */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:hidden">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-4 bg-ink"
                  : "w-1.5 bg-ink-faint"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails (visible on all sizes) */}
      <div className="mt-3 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative aspect-square w-16 overflow-hidden rounded-sm border transition-all duration-300 sm:w-20 ${
              i === active
                ? "border-ink"
                : "border-line opacity-60 hover:opacity-100"
            }`}
            aria-label={`View ${slide.label}`}
          >
            <ProductVisual
              image={slide.image}
              imageUrl={slide.imageUrl}
              name={name}
              subtitle={subtitle}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
