import Link from "next/link";
import Image from "next/image";
import { getProductsWithImages } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const revalidate = 60;

export default async function HomePage() {
  const allProducts = await getProductsWithImages();
  const products = allProducts.filter((p) => p.active);
  const heroProducts = products.slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Subtle background accent */}
        <div className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)" }} />

        <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-32 pb-16 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:pt-0">
          {/* Left: Editorial text */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="animate-fade-up">
              <span className="font-mono text-[10px] uppercase tracking-[4px] text-ink-muted">
                Wellness
              </span>
            </div>

            <h1 className="animate-fade-up mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink" style={{ animationDelay: "0.1s" }}>
              Performance
              <br />
              meets <em className="font-normal italic">ritual.</em>
            </h1>

            <p className="animate-fade-up mt-8 max-w-md text-[15px] leading-relaxed text-ink-3" style={{ animationDelay: "0.2s" }}>
              Clinical-dose supplements engineered for those who refuse to
              compromise. No fillers. No shortcuts. Just what works.
            </p>

            <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
              <Link href="/products" className="btn-primary">
                Shop Wellness
              </Link>
            </div>

            {/* Micro stats */}
            <div className="animate-fade-up mt-16 flex gap-12" style={{ animationDelay: "0.4s" }}>
              {[
                { value: "8+", label: "Formulas" },
                { value: "100%", label: "Transparent" },
                { value: "0", label: "Fillers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-2xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product image mosaic */}
          <div className="animate-fade-up lg:col-span-6 xl:col-span-7" style={{ animationDelay: "0.3s" }}>
            <div className="grid grid-cols-2 gap-3">
              {heroProducts.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-line bg-card transition-all duration-500 hover:border-line-hover"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-sm tracking-[4px] text-ink-muted">
                        {product.name}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-mono text-[10px] uppercase tracking-[2px] text-white">
                      {product.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 animate-fade-in sm:left-10" style={{ animationDelay: "1s" }}>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-line" />
            <span className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="border-y border-line overflow-hidden py-4">
        <div className="marquee-track">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex shrink-0 items-center gap-12 px-6">
              {[
                "Clinical Doses",
                "Science Backed",
                "Zero Filler",
                "Third-Party Tested",
                "No Proprietary Blends",
                "Performance Driven",
                "Transparent Labels",
                "Ritual Refined",
              ].map((text, i) => (
                <span key={i} className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[3px] text-ink-muted">
                  {text}
                  <span className="ml-12 text-ink-faint">&middot;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Collection ── */}
      <section className="border-b border-line">
        <Link
          href="/products"
          className="collection-card group flex flex-col justify-between p-10 sm:p-16"
        >
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
              01
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
              Wellness
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-3">
              Performance supplements engineered for discipline. Clinical doses of researched
              ingredients — pre-workouts, proteins, nootropics, and daily essentials.
            </p>
          </div>
          <div className="mt-8">
            <span className="font-mono text-[10px] uppercase tracking-[2px] text-ink-2 transition-colors group-hover:text-ink">
              Shop Now &rarr;
            </span>
          </div>
        </Link>
      </section>

      {/* ── Featured Products ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
                Featured
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-ink">
                The Protocol
              </h2>
            </div>
            <Link
              href="/products"
              className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted transition-colors hover:text-ink"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
                Philosophy
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Less noise.
                <br />
                More signal.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-3">
                We started AKIRA LABS because the wellness industry is full of
                noise — proprietary blends, inflated claims, unnecessary additives.
                We believe in radical transparency: every ingredient, every dose, every test
                result — out in the open.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-block font-mono text-[10px] uppercase tracking-[2px] text-ink-2 transition-colors hover:text-ink"
              >
                Our Story &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-0 border border-line sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Research",
                  desc: "Peer-reviewed studies behind every ingredient.",
                },
                {
                  step: "02",
                  title: "Formulate",
                  desc: "Clinical doses only. Zero proprietary blends.",
                },
                {
                  step: "03",
                  title: "Verify",
                  desc: "Third-party tested for purity and potency.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className={`p-6 ${i < 2 ? "border-b border-line sm:border-b-0 sm:border-r" : ""}`}
                >
                  <span className="font-mono text-2xl font-bold text-ink-faint">{item.step}</span>
                  <h3 className="mt-3 font-mono text-xs uppercase tracking-[2px] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-3">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
