export const metadata = {
  title: "About | Akira",
  description: "Learn about Akira, our custom print-on-demand store.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          About
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          Akira
        </h1>
      </div>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-3">
        <p className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          We create unique, custom-made products that are printed and shipped on
          demand. Every item in our store is designed with care and produced only
          when you order it — reducing waste and ensuring you get something
          truly special.
        </p>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            How It Works
          </h2>
          <div className="mt-4 space-y-0 border-t border-line">
            {[
              { step: "01", label: "Browse", desc: "Explore our collection of custom designs." },
              { step: "02", label: "Order", desc: "Choose your size, color, and design option." },
              { step: "03", label: "We Print", desc: "Your order is printed with premium materials." },
              { step: "04", label: "Delivered", desc: "Shipped directly to your doorstep." },
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
            Quality Promise
          </h2>
          <p className="mt-3">
            We partner with top-tier print providers to ensure every product meets
            our high standards. From the inks to the fabrics, quality is at the
            core of everything we do.
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Sustainability
          </h2>
          <p className="mt-3">
            Print-on-demand means zero overproduction. We only create what you
            order, minimizing waste and our environmental footprint.
          </p>
        </div>
      </div>
    </div>
  );
}
