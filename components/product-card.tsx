"use client";

import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity: 1,
      image: product.image,
      imageUrl: product.imageUrl,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${product.slug}`} className="product-card group block">
      <div className="product-img-wrap relative aspect-square overflow-hidden rounded-sm border border-line bg-card transition-colors">
        <ProductVisual image={product.image} imageUrl={product.imageUrl} name={product.name} subtitle={product.subtitle} />
        {product.badge && (
          <span className="badge absolute left-3 top-3">
            {product.badge}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 font-mono text-[8px] tracking-[2px] text-ink-2 opacity-50"
        >
          {product.tagline}
        </span>

        {/* Quick Add overlay button */}
        <button
          onClick={handleQuickAdd}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-btn-bg py-3 font-mono text-[10px] uppercase tracking-[2px] text-btn-text opacity-0 transition-all duration-300 group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 max-sm:opacity-100"
        >
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors group-hover:text-ink">
          {product.name}
        </h3>
        <p className="text-[11px] text-ink-muted">{product.subtitle}</p>
        <p className="font-mono text-sm text-ink-muted">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
