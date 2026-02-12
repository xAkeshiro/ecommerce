"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/printify";

interface Variant {
  id: number;
  title: string;
  price: number;
  options: number[];
  is_available: boolean;
}

interface Option {
  name: string;
  type: string;
  values: { id: number; title: string }[];
}

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    description: string;
    images: string[];
    options: Option[];
    variants: Variant[];
    defaultImage: string;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] ?? null
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [designOption, setDesignOption] = useState<"A" | "B">("A");
  const [added, setAdded] = useState(false);

  const images = product.images.length > 0 ? product.images : [product.defaultImage];

  function handleAddToCart() {
    if (!selectedVariant) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      image: images[0],
      designOption,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
      {/* Images */}
      <div className="animate-fade-up">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={images[selectedImage]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm border transition-colors ${
                  selectedImage === i
                    ? "border-ink"
                    : "border-line hover:border-line-hover"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="font-mono text-2xl uppercase tracking-wider text-ink">
          {product.title}
        </h1>

        {selectedVariant && (
          <p className="mt-3 font-mono text-lg text-ink-2">
            {formatPrice(selectedVariant.price)}
          </p>
        )}

        {/* Specifications */}
        <div className="mt-8 space-y-0 border-t border-line">
          {/* Design Option */}
          <div className="detail-spec">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Design
            </span>
            <div className="flex gap-2">
              {(["A", "B"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDesignOption(opt)}
                  className={`font-mono text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                    designOption === opt
                      ? "border-ink bg-ink text-page"
                      : "border-line text-ink-muted hover:border-line-hover hover:text-ink-2"
                  }`}
                >
                  Option {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Printify Options */}
          {product.options.map((option) => (
            <div key={option.name} className="detail-spec">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                {option.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const matchingVariants = product.variants.filter((v) =>
                    v.options.includes(value.id)
                  );
                  const isAvailable = matchingVariants.some(
                    (v) => v.is_available
                  );
                  const isSelected = selectedVariant?.options.includes(value.id);

                  return (
                    <button
                      key={value.id}
                      disabled={!isAvailable}
                      onClick={() => {
                        const variant = matchingVariants.find(
                          (v) => v.is_available
                        );
                        if (variant) setSelectedVariant(variant);
                      }}
                      className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                        isSelected
                          ? "border-ink bg-ink text-page"
                          : isAvailable
                          ? "border-line text-ink-muted hover:border-line-hover hover:text-ink-2"
                          : "cursor-not-allowed border-line-subtle text-ink-faint line-through"
                      }`}
                    >
                      {value.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="detail-spec">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Quantity
            </span>
            <div className="flex items-center gap-3">
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
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className="btn-primary mt-8 w-full"
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>

        {/* Description */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Description
          </h3>
          <div
            className="prose-sm mt-4 text-sm leading-relaxed text-ink-3 [&_a]:text-ink-2 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
}
