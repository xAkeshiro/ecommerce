"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { type Product, formatPrice, PRODUCTS } from "@/lib/products";
import { PRODUCT_EXTENDED } from "@/lib/product-data";
import { ProductVisual } from "@/components/product-visual";
import { ProductCard } from "@/components/product-card";

interface ProductDetailProps {
  product: Product;
  allProducts?: Product[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-ink-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${i <= rating ? "fill-current" : "fill-none stroke-current opacity-30"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-ink-2">
          {title}
        </span>
        <span className="font-mono text-sm text-ink-muted">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export function ProductDetail({ product, allProducts }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">(
    "one-time"
  );
  const [frequency, setFrequency] = useState("30");

  const ext = PRODUCT_EXTENDED[product.id];
  const discountedPrice = Math.round(product.price * 0.85);
  const displayPrice =
    purchaseType === "subscribe" ? discountedPrice : product.price;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: displayPrice,
      quantity,
      image: product.image,
      imageUrl: product.imageUrl,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // Complementary products for "Complete Your Stack"
  const products = allProducts || PRODUCTS;
  const stackProducts = ext
    ? ext.complementaryIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => !!p && p.active)
    : products
        .filter((p) => p.id !== product.id && p.active)
        .slice(0, 3);

  // Average rating
  const avgRating = ext
    ? ext.reviews.reduce((sum, r) => sum + r.rating, 0) / ext.reviews.length
    : 0;

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-8 animate-fade-up">
        <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li className="text-ink-faint">/</li>
          <li>
            <Link
              href="/products"
              className="transition-colors hover:text-ink"
            >
              Wellness
            </Link>
          </li>
          <li className="text-ink-faint">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Visual */}
        <div className="animate-fade-up">
          <div className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card">
            <ProductVisual
              image={product.image}
              imageUrl={product.imageUrl}
              name={product.name}
              subtitle={product.subtitle}
            />
            {product.badge && (
              <span className="badge absolute left-4 top-4">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-2">
            {product.tagline}
          </p>
          <h1 className="mt-2 font-mono text-2xl uppercase tracking-wider text-ink">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">{product.subtitle}</p>

          {/* Rating summary */}
          {ext && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} />
              <span className="font-mono text-[10px] text-ink-muted">
                {avgRating.toFixed(1)} ({ext.reviews.length} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-4">
            {purchaseType === "subscribe" ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg text-ink-2">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="font-mono text-sm text-ink-faint line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <p className="font-mono text-lg text-ink-2">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-3">
            {product.description}
          </p>

          {/* Subscribe & Save toggle */}
          <div className="mt-8 space-y-3 border border-line p-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="purchaseType"
                checked={purchaseType === "one-time"}
                onChange={() => setPurchaseType("one-time")}
                className="accent-[var(--text-primary)]"
              />
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-ink-2">
                One-time purchase
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="purchaseType"
                checked={purchaseType === "subscribe"}
                onChange={() => setPurchaseType("subscribe")}
                className="accent-[var(--text-primary)]"
              />
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-ink-2">
                Subscribe &amp; save — 15% off
              </span>
            </label>
            {purchaseType === "subscribe" && (
              <div className="ml-6 mt-1">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="border border-line bg-transparent px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink outline-none"
                >
                  <option value="30">Every 30 days</option>
                  <option value="60">Every 60 days</option>
                  <option value="90">Every 90 days</option>
                </select>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Qty
            </span>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center border border-line font-mono text-sm text-ink-muted transition-colors hover:border-line-hover hover:text-ink"
            >
              −
            </button>
            <span className="w-8 text-center font-mono text-sm text-ink">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center border border-line font-mono text-sm text-ink-muted transition-colors hover:border-line-hover hover:text-ink"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} className="btn-primary mt-8 w-full">
            {added
              ? "Added to Cart"
              : purchaseType === "subscribe"
                ? "Subscribe"
                : "Add to Cart"}
          </button>

          <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[2px] text-ink-faint">
            Free shipping over $100
          </p>
        </div>
      </div>

      {/* ── Rich content sections ── */}
      <div className="mt-20 grid grid-cols-1 gap-0 border-t border-line lg:grid-cols-2">
        {/* Left column: Benefits + How to Use */}
        <div className="border-b border-line p-8 lg:border-b-0 lg:border-r lg:p-12">
          {ext && (
            <>
              <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
                Why {product.name}
              </h2>
              <ul className="mt-6 space-y-4">
                {ext.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-[10px] text-ink-faint">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-3">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
                  How to Use
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-3">
                  {ext.howToUse}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right column: Supplement Facts */}
        <div className="p-8 lg:p-12">
          {ext && (
            <>
              <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
                Supplement Facts
              </h2>
              <div className="mt-6 border border-line">
                <div className="border-b border-line bg-card px-4 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink">
                    Serving Size: {ext.servingSize}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    Servings Per Container: {ext.servingsPerContainer}
                  </p>
                </div>
                <div className="border-b-2 border-ink px-4 py-1.5">
                  <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink">
                    <span>Amount Per Serving</span>
                  </div>
                </div>
                {ext.supplementFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-line-subtle px-4 py-2"
                  >
                    <span className="text-xs text-ink-3">
                      {fact.ingredient}
                    </span>
                    <span className="font-mono text-xs text-ink-2">
                      {fact.amount}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── FAQ Accordion ── */}
      {ext && (
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 border-t border-line">
            {ext.faq.map((item, i) => (
              <Accordion key={i} title={item.question}>
                <p className="text-sm leading-relaxed text-ink-3">
                  {item.answer}
                </p>
              </Accordion>
            ))}
          </div>
        </div>
      )}

      {/* ── Reviews ── */}
      {ext && (
        <div className="mx-auto mt-20 max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
              Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} />
              <span className="font-mono text-[10px] text-ink-muted">
                {avgRating.toFixed(1)} out of 5 — {ext.reviews.length} reviews
              </span>
            </div>
          </div>
          <div className="mt-8 space-y-0 divide-y divide-line-subtle">
            {ext.reviews.map((review, i) => (
              <div key={i} className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <span className="font-mono text-xs text-ink">
                      {review.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Complete Your Stack ── */}
      {stackProducts.length > 0 && (
        <div className="mt-20 border-t border-line pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
            Complete Your Stack
          </p>
          <h2 className="mt-3 text-2xl font-light tracking-tight text-ink">
            Pairs well with
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stackProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
