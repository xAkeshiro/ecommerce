"use client";

import { useState } from "react";
import { PRODUCTS, type CategoryId, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";

export default function ProductsPage() {
  const [category, setCategory] = useState<CategoryId>("all");
  const products = getProductsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Collection
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          All Products
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          Performance supplements engineered for discipline.
        </p>
      </div>

      <div className="mt-8">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
