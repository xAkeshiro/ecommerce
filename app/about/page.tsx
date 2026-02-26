import Link from "next/link";

export const metadata = {
  title: "About | AKIRA LABS",
  description: "Clinical-dose supplements engineered for those who refuse to compromise.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-card">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ background: "radial-gradient(ellipse at 70% 50%, var(--text-primary) 0%, transparent 70%)" }} />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-10">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-mono text-[10px] uppercase tracking-[4px] text-ink-muted">
              About
            </p>
            <h1 className="animate-fade-up mt-4 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] tracking-tight text-ink" style={{ animationDelay: "0.1s" }}>
              Born in Tokyo,
              <br />
              built for <em className="font-normal italic">discipline.</em>
            </h1>
            <p className="animate-fade-up mt-8 max-w-lg text-[15px] leading-relaxed text-ink-3" style={{ animationDelay: "0.2s" }}>
              AKIRA LABS creates clinical-dose supplements for those who refuse to
              compromise. No proprietary blends, no unnecessary fillers, no inflated
              claims. Every formula is engineered with researched ingredients at
              effective doses — nothing more, nothing less.
            </p>
          </div>
        </div>
      </section>

      {/* The Protocol — visual timeline */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <p className="animate-fade-up font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
            The Protocol
          </p>
          <h2 className="animate-fade-up mt-3 text-2xl font-light tracking-tight text-ink">
            From research to your door
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-0 border border-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", label: "Research", desc: "Every ingredient backed by peer-reviewed studies. We start with the science, not the marketing." },
              { step: "02", label: "Formulate", desc: "Clinical doses only. Zero proprietary blends. We use the exact amounts shown in research." },
              { step: "03", label: "Test", desc: "Third-party verified for purity and potency. Every batch tested, every certificate available." },
              { step: "04", label: "Deliver", desc: "Direct to your door. No middlemen, no markup. Just the products you need, when you need them." },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`animate-fade-up p-8 ${i < 3 ? "border-b border-line sm:border-b lg:border-b-0 lg:border-r" : ""} ${i < 2 ? "sm:border-r" : i === 2 ? "sm:border-r-0 lg:border-r" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="font-mono text-3xl font-bold text-ink-faint">{item.step}</span>
                <h3 className="mt-4 font-mono text-xs uppercase tracking-[2px] text-ink">
                  {item.label}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
            What We Stand For
          </p>
          <h2 className="mt-3 text-2xl font-light tracking-tight text-ink">
            Our principles
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Radical Transparency",
                desc: "Every product label shows the exact dose of every ingredient. No hiding behind proprietary blends. You deserve to know exactly what you're putting in your body.",
              },
              {
                title: "Clean Formulations",
                desc: "We work with certified manufacturers to meet the highest standards. No artificial colors, no unnecessary binders, no fillers. Just what your body needs to perform.",
              },
              {
                title: "Science First",
                desc: "Every formula starts with peer-reviewed research. We don't follow trends — we follow the evidence. If the science doesn't support it, we don't include it.",
              },
            ].map((value) => (
              <div key={value.title} className="border border-line p-8">
                <h3 className="font-mono text-xs uppercase tracking-[2px] text-ink">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-3">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
            Experience the difference
          </p>
          <h2 className="mt-4 text-2xl font-light tracking-tight text-ink">
            Ready to start your protocol?
          </h2>
          <Link href="/products" className="btn-primary mt-8 inline-flex">
            Shop Now &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
