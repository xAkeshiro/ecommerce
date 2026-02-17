export const metadata = {
  title: "About | AKIRA LABS",
  description: "Performance supplements engineered for discipline. Clinical doses. Zero filler. Tokyo-based.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          About
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          Akira Labs
        </h1>
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-3">
        <p className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Born in Tokyo, built for discipline. AKIRA LABS creates performance
          supplements stripped to what works. No proprietary blends, no
          unnecessary fillers, no compromises. Every formula is engineered with
          clinical doses of researched ingredients — nothing more, nothing less.
        </p>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            The Protocol
          </h2>
          <div className="mt-4 space-y-0 border-t border-line">
            {[
              { step: "01", label: "Research", desc: "Every ingredient backed by peer-reviewed studies." },
              { step: "02", label: "Formulate", desc: "Clinical doses only. Zero proprietary blends." },
              { step: "03", label: "Test", desc: "Third-party verified for purity and potency." },
              { step: "04", label: "Deliver", desc: "Direct to your door. No middlemen, no markup." },
            ].map((item) => (
              <div key={item.step} className="detail-spec">
                <span className="font-mono text-xs text-ink-faint">{item.step}</span>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink">{item.label}</span>
                  <span className="ml-3 text-ink-3">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Clean Formulations
          </h2>
          <p className="mt-3">
            We work with certified manufacturers to produce supplements that
            meet the highest standards. No artificial colors, no unnecessary
            binders, no fillers. Just what your body needs to perform at its
            best.
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Transparency
          </h2>
          <p className="mt-3">
            Every product label shows the exact dose of every ingredient. No
            hiding behind proprietary blends. You deserve to know exactly what
            you&apos;re putting in your body. Every batch is third-party tested
            and certificates of analysis are available on request.
          </p>
        </div>
      </div>
    </div>
  );
}
