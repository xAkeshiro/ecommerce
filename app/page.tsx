import Link from "next/link";
import { getProductsWithImages } from "@/lib/products";
import { TESTIMONIALS } from "@/lib/product-data";
import { ProductCard } from "@/components/product-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ScrollFade } from "@/components/scroll-fade";

export const revalidate = 60;

export default async function HomePage() {
  const allProducts = await getProductsWithImages();
  const products = allProducts.filter((p) => p.active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        {/* Background image — hidden on mobile to keep text clean */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{ backgroundImage: "url('/images/hero-scene.jpg')", backgroundSize: "cover", backgroundPosition: "center bottom" }}
        />
        {/* Gradient overlay */}
        <div className="hero-overlay" />

        {/* Text content — left-aligned on desktop, centered on mobile */}
        <div className="relative z-10 flex h-full items-center px-6 sm:px-[8%]">
          <div className="w-full max-w-lg text-center sm:max-w-[40%] sm:text-left">
            <div className="animate-fade-up">
              <span className="font-mono text-[10px] uppercase tracking-[4px] text-ink-muted">
                Wellness
              </span>
            </div>

            <h1
              className="animate-fade-up mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink"
              style={{ animationDelay: "0.1s" }}
            >
              Performance
              <br />
              meets <em className="font-normal italic">ritual.</em>
            </h1>

            <p
              className="animate-fade-up mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-ink-3 sm:mx-0"
              style={{ animationDelay: "0.2s" }}
            >
              Clinical-dose supplements engineered for those who refuse to
              compromise. No fillers. No shortcuts. Just what works.
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap justify-center gap-4 sm:justify-start"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/products" className="btn-primary">
                Shop Wellness
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar — pinned to bottom */}
        <div className="hero-stats-strip absolute inset-x-0 bottom-0 z-10 border-t border-line/30">
          <div className="animate-fade-up flex items-center justify-center gap-8 px-6 py-4 sm:gap-16 sm:px-10" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "8+", label: "Formulas" },
              { value: "100%", label: "Transparent" },
              { value: "0", label: "Fillers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-lg font-bold text-ink sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[2px] text-ink-muted sm:text-[9px]">
                  {stat.label}
                </p>
              </div>
            ))}
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
        <ScrollFade>
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
        </ScrollFade>
      </section>

      {/* ── Featured Products ── */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <ScrollFade>
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
          </ScrollFade>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product, i) => (
              <ScrollFade
                key={product.id}
                delay={i * 0.06}
              >
                <ProductCard product={product} />
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <ScrollFade>
            <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
              The Community
            </p>
            <h2 className="mt-3 text-2xl font-light tracking-tight text-ink">
              What people are saying
            </h2>
          </ScrollFade>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollFade key={i} delay={i * 0.1}>
                <div className="border border-line p-8">
                  <p className="text-sm leading-relaxed text-ink-3 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <p className="font-mono text-xs text-ink">{t.name}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[2px] text-ink-faint">
                      {t.product}
                    </p>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ScrollFade>
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
            </ScrollFade>

            <ScrollFade delay={0.15}>
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
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-xl px-6 py-20 text-center sm:px-10">
          <ScrollFade>
            <NewsletterForm />
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
