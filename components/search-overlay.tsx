"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/products";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = query.trim().length > 0
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.active &&
          (p.name.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q))
        );
      })
    : [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div
        className="absolute inset-0 bg-page/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-20 w-full max-w-xl px-6">
        <div className="border border-line bg-page shadow-lg">
          <div className="flex items-center border-b border-line px-5">
            <svg
              className="h-4 w-4 shrink-0 text-ink-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent px-4 py-4 font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
            />
            <button
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted transition-colors hover:text-ink"
            >
              Esc
            </button>
          </div>

          {query.trim().length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <ul className="divide-y divide-line-subtle">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-card"
                      >
                        <div>
                          <p className="font-mono text-xs uppercase tracking-wider text-ink">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-ink-muted">
                            {product.subtitle}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-ink-2">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-ink-3">No products found.</p>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[2px] text-ink-muted transition-colors hover:text-ink"
                  >
                    Browse all products &rarr;
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
