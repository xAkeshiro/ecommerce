"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, PRODUCTS } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";
import { ProductCard } from "@/components/product-card";

const FREE_SHIPPING_THRESHOLD = 10000; // $100 in cents

function ShippingProgressBar({ totalPrice }: { totalPrice: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="mb-8 border border-line p-4">
      {remaining > 0 ? (
        <p className="text-center font-mono text-[10px] uppercase tracking-[2px] text-ink-2">
          You&apos;re {formatPrice(remaining)} away from free shipping!
        </p>
      ) : (
        <p className="text-center font-mono text-[10px] uppercase tracking-[2px] text-ink-2">
          You&apos;ve unlocked free shipping!
        </p>
      )}
      <div className="mt-3 h-1 w-full bg-inset">
        <div
          className="h-full bg-ink transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  // Estimate delivery: 5-7 business days from now
  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 5);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 7);
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // Suggestions: products not in cart
  const cartIds = new Set(items.map((i) => i.productId));
  const suggestions = PRODUCTS.filter(
    (p) => p.active && !cartIds.has(p.id)
  ).slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-mono text-2xl uppercase tracking-wider text-ink">
          Your Cart
        </h1>
        <p className="mt-4 text-sm text-ink-3">Your protocol awaits.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="animate-fade-up font-mono text-2xl uppercase tracking-wider text-ink">
          Your Cart
        </h1>
        <Link
          href="/products"
          className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted transition-colors hover:text-ink"
        >
          Continue Shopping &rarr;
        </Link>
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <ShippingProgressBar totalPrice={totalPrice} />

          <ul className="divide-y divide-line">
            {items.map((item, i) => (
              <li
                key={item.productId}
                className="animate-fade-up flex gap-6 py-6"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-line bg-card transition-colors hover:border-line-hover"
                >
                  <ProductVisual image={item.image} imageUrl={item.imageUrl} name={item.name} subtitle={item.subtitle} />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-ink">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="font-mono text-sm text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-line font-mono text-xs text-ink-muted transition-colors hover:border-line-hover hover:text-ink"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-mono text-xs text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="flex h-7 w-7 items-center justify-center border border-line font-mono text-xs text-ink-muted transition-colors hover:border-line-hover hover:text-ink"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="font-mono text-[10px] uppercase tracking-wider text-ink-faint transition-colors hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:col-span-4 lg:mt-0">
          <div className="animate-slide-in border border-line bg-card p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Order Summary
            </h2>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm text-ink-3">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-3">
                <span>Shipping</span>
                <span className="font-mono text-ink-muted">
                  {totalPrice >= FREE_SHIPPING_THRESHOLD ? "Free" : "At checkout"}
                </span>
              </div>
              <div className="border-t border-line pt-3">
                <div className="flex justify-between text-ink">
                  <span className="font-mono text-xs uppercase tracking-wider">Total</span>
                  <span className="font-mono">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Estimated delivery */}
            <div className="mt-4 border-t border-line-subtle pt-4">
              <p className="font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
                Estimated Delivery
              </p>
              <p className="mt-1 font-mono text-xs text-ink-2">
                {formatDate(deliveryStart)} – {formatDate(deliveryEnd)}
              </p>
            </div>

            <Link
              href="/checkout"
              className="btn-primary mt-6 w-full text-center"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[2px] text-ink-faint">
              Free shipping over $100
            </p>
          </div>
        </div>
      </div>

      {/* You Might Also Need */}
      {suggestions.length > 0 && (
        <div className="mt-16 border-t border-line pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
            You Might Also Need
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
