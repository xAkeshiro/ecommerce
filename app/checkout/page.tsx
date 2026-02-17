"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-mono text-2xl uppercase tracking-wider text-ink">
          Checkout
        </h1>
        <p className="mt-4 text-sm text-ink-3">Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="animate-fade-up font-mono text-2xl uppercase tracking-wider text-ink">
        Checkout
      </h1>

      {/* Order Summary */}
      <div
        className="animate-fade-up mt-10 border border-line bg-card p-6"
        style={{ animationDelay: "0.1s" }}
      >
        <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          Order Summary
        </h2>
        <ul className="mt-4 divide-y divide-line">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex justify-between py-3 text-sm"
            >
              <span className="text-ink-3">
                {item.name} ({item.subtitle}) x{item.quantity}
              </span>
              <span className="font-mono text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-line pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-ink">
            Total
          </span>
          <span className="font-mono text-ink">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-ink-muted">
        You&apos;ll be redirected to Shopify to complete payment &amp; shipping.
      </p>

      {error && (
        <div className="mt-6 border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs text-red-400">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary mt-6 w-full"
      >
        {loading ? "Redirecting..." : "Proceed to Checkout"}
      </button>
    </div>
  );
}
