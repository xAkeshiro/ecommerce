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
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-subtle opacity-20" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-subtle opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-subtle opacity-40" />
        </div>

        <div className="relative z-10 max-w-2xl px-4 text-center">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            Custom Made — Shipped Worldwide
          </p>
          <h1 className="animate-fade-up mt-6 text-5xl font-light tracking-tight text-ink sm:text-7xl" style={{ animationDelay: "0.1s" }}>
            Less noise.
            <br />
            More signal.
          </h1>
          <p className="animate-fade-up mt-6 text-sm leading-relaxed text-ink-3" style={{ animationDelay: "0.2s" }}>
            Unique print-on-demand products designed with intention
            and shipped directly to your door.
          </p>
          <div className="animate-fade-up mt-10 flex justify-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/products" className="btn-primary">
              Browse Collection
            </Link>
            <Link href="/about" className="btn-outline">
              About Us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Scroll
            </span>
            <div className="h-8 w-px bg-line" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                Collection
              </p>
              <h2 className="mt-2 text-2xl font-light tracking-tight text-ink">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
            >
              View all →
            </Link>
          </div>

          {hasProducts ? (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 8).map((product, i) => (
                <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 border border-dashed border-line p-16 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Products coming soon
              </p>
              <p className="mt-3 text-sm text-ink-3">
                Connect your Printify account to start displaying products.
                Set <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-ink-2">PRINTIFY_API_TOKEN</code> and{" "}
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-ink-2">PRINTIFY_SHOP_ID</code> in
                your environment variables.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                label: "Shipping",
                title: "Free Worldwide",
                desc: "On orders over $50. Fast and reliable delivery.",
              },
              {
                label: "Design",
                title: "Made to Order",
                desc: "Every product is uniquely designed and custom printed.",
              },
              {
                label: "Quality",
                title: "Premium Materials",
                desc: "Top-tier inks and fabrics. Satisfaction guaranteed.",
              },
            ].map((item, i) => (
              <div key={i} className="animate-fade-up text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                  {item.label}
                </p>
                <h3 className="mt-3 text-lg font-light text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
