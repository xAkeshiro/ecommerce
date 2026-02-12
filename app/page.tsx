import Link from "next/link";
import { getProducts, PrintifyProduct } from "@/lib/printify";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  let products: PrintifyProduct[] = [];
  let hasProducts = false;

  try {
    const data = await getProducts(1, 8);
    products = data.data.filter((p) => p.visible);
    hasProducts = products.length > 0;
  } catch {
    // Printify not configured yet — show placeholder content
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Custom Made,
              <br />
              <span className="text-akira-500">Just For You</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Discover unique print-on-demand products designed with care and
              shipped directly to your door.
            </p>
            <div className="mt-10 flex gap-4">
              <Link href="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link href="/about" className="btn-secondary border-gray-600 text-white hover:bg-white/10 dark:border-zinc-600 dark:text-white dark:hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-akira-600 hover:text-akira-700 dark:text-akira-500 dark:hover:text-akira-400"
          >
            View all &rarr;
          </Link>
        </div>

        {hasProducts ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-zinc-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
              Products coming soon
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
              Connect your Printify account to start displaying products.
              Set <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">PRINTIFY_API_TOKEN</code> and{" "}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">PRINTIFY_SHOP_ID</code> in
              your environment variables.
            </p>
          </div>
        )}
      </section>

      {/* Value Props */}
      <section className="border-t border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-akira-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium dark:text-zinc-100">Free Shipping</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                On orders over $50. Fast and reliable delivery worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-akira-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium dark:text-zinc-100">Custom Designs</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                Every product is uniquely designed and made to order.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-akira-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium dark:text-zinc-100">Quality Guaranteed</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
                Premium materials and printing. Satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
