"use client";

import { useState, FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    zip: "",
    country: "US",
    phone: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const inputClasses =
    "mt-1 block w-full border border-line bg-card px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-0 transition-colors";

  const labelClasses =
    "block font-mono text-[10px] uppercase tracking-wider text-ink-muted";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          address: {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            country: form.country,
            region: form.region,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            zip: form.zip,
          },
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="animate-fade-up font-mono text-2xl uppercase tracking-wider text-ink">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-10">
        {/* Contact */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Contact Information
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClasses}>Email</label>
              <input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>First Name</label>
              <input type="text" required value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Last Name</label>
              <input type="text" required value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className={inputClasses} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClasses}>Phone</label>
              <input type="tel" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClasses} />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Shipping Address
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClasses}>Address</label>
              <input type="text" required value={form.address1} onChange={(e) => updateField("address1", e.target.value)} className={inputClasses} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClasses}>Apartment, suite, etc. (optional)</label>
              <input type="text" value={form.address2} onChange={(e) => updateField("address2", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>City</label>
              <input type="text" required value={form.city} onChange={(e) => updateField("city", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>State / Region</label>
              <input type="text" required value={form.region} onChange={(e) => updateField("region", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>ZIP / Postal Code</label>
              <input type="text" required value={form.zip} onChange={(e) => updateField("zip", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Country</label>
              <select value={form.country} onChange={(e) => updateField("country", e.target.value)} className={inputClasses}>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="animate-fade-up border border-line bg-card p-6" style={{ animationDelay: "0.3s" }}>
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
            <span className="font-mono text-xs uppercase tracking-wider text-ink">Total</span>
            <span className="font-mono text-ink">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {error && (
          <div className="border border-red-500/20 bg-red-500/5 p-4 font-mono text-xs text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </button>
      </form>
    </div>
  );
}
