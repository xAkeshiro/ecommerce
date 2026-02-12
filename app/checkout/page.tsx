"use client";

import { useState, FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/printify";
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
    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-akira-600 focus:outline-none focus:ring-1 focus:ring-akira-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-akira-500 dark:focus:ring-akira-500";

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
            product_id: item.productId,
            variant_id: item.variantId,
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

      // Redirect to Stripe checkout
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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
          Checkout
        </h1>
        <p className="mt-4 text-gray-600 dark:text-zinc-400">Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Contact */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
            Contact Information
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Email
              </label>
              <input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                First Name
              </label>
              <input type="text" required value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Last Name
              </label>
              <input type="text" required value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className={inputClasses} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Phone
              </label>
              <input type="tel" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClasses} />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
            Shipping Address
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Address
              </label>
              <input type="text" required value={form.address1} onChange={(e) => updateField("address1", e.target.value)} className={inputClasses} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Apartment, suite, etc. (optional)
              </label>
              <input type="text" value={form.address2} onChange={(e) => updateField("address2", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                City
              </label>
              <input type="text" required value={form.city} onChange={(e) => updateField("city", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                State / Region
              </label>
              <input type="text" required value={form.region} onChange={(e) => updateField("region", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                ZIP / Postal Code
              </label>
              <input type="text" required value={form.zip} onChange={(e) => updateField("zip", e.target.value)} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                Country
              </label>
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
        <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-900">
          <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">Order Summary</h2>
          <ul className="mt-4 divide-y divide-gray-200 dark:divide-zinc-800">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.variantId}-${item.designOption ?? ""}`}
                className="flex justify-between py-3 text-sm"
              >
                <span className="text-gray-600 dark:text-zinc-400">
                  {item.title} ({item.variantTitle}
                  {item.designOption && ` / Design ${item.designOption}`}) x{item.quantity}
                </span>
                <span className="font-medium dark:text-zinc-100">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-medium dark:border-zinc-700">
            <span className="dark:text-zinc-100">Total</span>
            <span className="dark:text-zinc-100">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
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
