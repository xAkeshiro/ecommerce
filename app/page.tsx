import Link from "next/link";
import { getProductsWithImages } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProtocolBundle } from "@/components/protocol-bundle";

export const revalidate = 60;

export default async function HomePage() {
  const allProducts = await getProductsWithImages();
  const products = allProducts.filter((p) => p.active);

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
            Engineered for discipline
          </p>
          <h1 className="animate-fade-up mt-6 text-5xl font-light tracking-tight text-ink sm:text-7xl" style={{ animationDelay: "0.1s" }}>
            No noise.
            <br />
            All signal.
          </h1>
          <p className="animate-fade-up mt-6 text-sm leading-relaxed text-ink-3" style={{ animationDelay: "0.2s" }}>
            Performance supplements stripped to what works. Clinical doses. Zero filler.
            Built for those who train with intention.
          </p>
          <div className="animate-fade-up mt-10 flex justify-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/products" className="btn-primary">
              The Protocol
            </Link>
            <Link href="/products" className="btn-outline">
              Shop All
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

      {/* Protocol Bundle Banner */}
      <ProtocolBundle />

      {/* Featured Products */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                Collection
              </p>
              <h2 className="mt-2 text-2xl font-light tracking-tight text-ink">
                The Protocol
              </h2>
            </div>
            <Link
              href="/products"
              className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
            >
              View all →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product, i) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                label: "Formula",
                title: "Clinical Doses",
                desc: "Every ingredient at researched effective doses. No proprietary blends.",
              },
              {
                label: "Purity",
                title: "Zero Filler",
                desc: "No artificial colors, no unnecessary additives. Clean formulations only.",
              },
              {
                label: "Testing",
                title: "Third-Party Verified",
                desc: "Every batch independently tested for purity and potency.",
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
