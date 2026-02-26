"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ProductVisual } from "@/components/product-visual";

interface ProductGalleryProps {
  image: string;
  imageUrl?: string;
  imageUrls?: string[];
  name: string;
  subtitle: string;
  badge?: string | null;
}

export function ProductGallery({
  image,
  imageUrl,
  imageUrls,
  name,
  subtitle,
  badge,
}: ProductGalleryProps) {
  // Build slides from Shopify images if available, otherwise fall back to SVG
  const slides =
    imageUrls && imageUrls.length > 0
      ? imageUrls.map((url, i) => ({ url, label: i === 0 ? "Front" : `View ${i + 1}` }))
      : imageUrl
        ? [{ url: imageUrl, label: "Front" }]
        : [];

  const hasSvgOnly = slides.length === 0;

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
    if (hasSvgOnly) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, goTo, hasSvgOnly]);

  // Fallback: single SVG visual (no carousel needed)
  if (hasSvgOnly) {
    return (
      <div className="animate-fade-up">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card">
          <ProductVisual image={image} imageUrl={imageUrl} name={name} subtitle={subtitle} />
          {badge && (
            <span className="badge absolute left-4 top-4 z-10">{badge}</span>
          )}
        </div>
      </div>
    );
  }

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
              <Image
                src={slide.url}
                alt={`${name} — ${slide.label}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Badge */}
        {badge && (
          <span className="badge absolute left-4 top-4 z-10">{badge}</span>
        )}

        {/* Dot indicators (mobile) */}
        {slides.length > 1 && (
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
        )}
      </div>

      {/* Thumbnails — only show if more than 1 image */}
      {slides.length > 1 && (
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
              <Image
                src={slide.url}
                alt={`${name} — ${slide.label}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
