import Link from "next/link";

export const metadata = {
  title: "Order Confirmed | Akira",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <svg
          className="h-8 w-8 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        Order Confirmed!
      </h1>
      <p className="mt-4 text-gray-600 dark:text-zinc-400">
        Thank you for your purchase. You will receive an email confirmation
        shortly with your order details and tracking information.
      </p>
      <Link href="/products" className="btn-primary mt-8 inline-flex">
        Continue Shopping
      </Link>
    </div>
  );
}
