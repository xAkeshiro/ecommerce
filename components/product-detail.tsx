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
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Images */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                  selectedImage === i
                    ? "border-gray-900"
                    : "border-transparent"
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {product.title}
        </h1>

        {selectedVariant && (
          <p className="mt-3 text-2xl text-gray-900">
            {formatPrice(selectedVariant.price)}
          </p>
        )}

        {/* Options */}
        {product.options.map((option) => (
          <div key={option.name} className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">
              {option.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
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
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-gray-900 bg-gray-900 text-white"
                        : isAvailable
                        ? "border-gray-300 text-gray-700 hover:border-gray-900"
                        : "cursor-not-allowed border-gray-200 text-gray-400 line-through"
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
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant}
          className="btn-primary mt-8 w-full"
        >
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>

        {/* Description */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-900">Description</h3>
          <div
            className="prose prose-sm mt-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
}
