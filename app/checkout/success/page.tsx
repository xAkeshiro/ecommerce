import Link from "next/link";

export const metadata = {
  title: "Order Confirmed | AKIRA LABS",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-line">
          <svg
            className="h-8 w-8 text-ink"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="mt-8 font-mono text-2xl uppercase tracking-wider text-ink">
          Order Confirmed
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-3">
          Thank you for your purchase. You will receive an email confirmation
          shortly with your order details and tracking information.
        </p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
