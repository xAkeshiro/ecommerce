"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

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
      <h1 className="animate-fade-up font-mono text-2xl uppercase tracking-wider text-ink">
        Your Cart
      </h1>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-line">
            {items.map((item, i) => (
              <li
                key={item.productId}
                className="animate-fade-up flex gap-6 py-6"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-line bg-card">
                  <ProductVisual image={item.image} name={item.name} subtitle={item.subtitle} />
                </div>

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
                <span className="font-mono text-ink-muted">At checkout</span>
              </div>
              <div className="border-t border-line pt-3">
                <div className="flex justify-between text-ink">
                  <span className="font-mono text-xs uppercase tracking-wider">Total</span>
                  <span className="font-mono">{formatPrice(totalPrice)}</span>
                </div>
              </div>
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
    </div>
  );
}
