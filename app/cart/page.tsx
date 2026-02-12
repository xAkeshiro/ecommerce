"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/printify";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
          Your Cart
        </h1>
        <p className="mt-4 text-gray-600 dark:text-zinc-400">Your cart is empty.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        Your Cart
      </h1>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.variantId}-${item.designOption ?? ""}`}
                className="flex gap-6 py-6"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">
                        {item.variantTitle}
                        {item.designOption && (
                          <span className="ml-2 inline-flex rounded bg-akira-100 px-1.5 py-0.5 text-xs font-medium text-akira-700 dark:bg-akira-900/30 dark:text-akira-400">
                            Design {item.designOption}
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.variantId,
                            item.quantity - 1,
                            item.designOption
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm dark:text-zinc-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.variantId,
                            item.quantity + 1,
                            item.designOption
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.productId, item.variantId, item.designOption)
                      }
                      className="text-sm text-gray-500 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
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
        <div className="mt-8 lg:col-span-4 lg:mt-0">
          <div className="rounded-lg bg-gray-50 p-6 dark:bg-zinc-900">
            <h2 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
              Order Summary
            </h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-zinc-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-2 dark:border-zinc-700">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-zinc-100">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="btn-primary mt-6 w-full text-center"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/products"
              className="mt-3 block text-center text-sm text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
