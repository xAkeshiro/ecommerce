"use client";

import { useState } from "react";
import { type Product, type CategoryId } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const [category, setCategory] = useState<CategoryId>("all");

  const filtered =
    category === "all"
      ? products.filter((p) => p.active)
      : products.filter((p) => p.active && p.category === category);

  return (
    <>
      <div className="mt-8">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => (
          <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
