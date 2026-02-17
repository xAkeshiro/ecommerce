"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { type Product, formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity,
      image: product.image,
      imageUrl: product.imageUrl,
      slug: product.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
      {/* Visual */}
      <div className="animate-fade-up">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card">
          <ProductVisual image={product.image} imageUrl={product.imageUrl} name={product.name} subtitle={product.subtitle} />
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

        <p className="mt-4 font-mono text-lg text-ink-2">
          {formatPrice(product.price)}
        </p>

        <p className="mt-6 text-sm leading-relaxed text-ink-3">
          {product.description}
        </p>

        {/* Supplement Facts */}
        <div className="mt-8 space-y-0 border-t border-line">
          <div className="border-b border-line-subtle py-3">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Supplement Facts
            </span>
          </div>
          {product.details.map((detail, i) => (
            <div key={i} className="detail-spec">
              <span className="text-ink-3">{detail}</span>
            </div>
          ))}
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
        <button
          onClick={handleAddToCart}
          className="btn-primary mt-8 w-full"
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[2px] text-ink-faint">
          Free shipping over $100 · Subscribe &amp; save 15%
        </p>
      </div>
    </div>
  );
}
