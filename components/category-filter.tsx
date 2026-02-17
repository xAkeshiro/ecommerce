"use client";

import { CATEGORIES, type CategoryId } from "@/lib/products";

interface CategoryFilterProps {
  active: CategoryId;
  onChange: (category: CategoryId) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-6">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id as CategoryId)}
          className={`font-mono text-[10px] tracking-[2px] uppercase transition-colors duration-300 ${
            active === cat.id
              ? "text-ink"
              : "text-ink-muted hover:text-ink-2"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
