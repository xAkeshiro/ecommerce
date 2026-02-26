"use client";

import { useState, useMemo } from "react";
import { type Product, type CategoryId } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

interface ProductsGridProps {
  products: Product[];
  initialCategory?: CategoryId;
}

export function ProductsGrid({ products, initialCategory = "all" }: ProductsGridProps) {
  const [category, setCategory] = useState<CategoryId>(initialCategory);
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    let list =
      category === "all"
        ? products.filter((p) => p.active)
        : products.filter((p) => p.active && p.category === category);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [products, category, sort]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter active={category} onChange={setCategory} />
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-ink-faint">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-line bg-transparent px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
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
