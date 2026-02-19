import Link from "next/link";

export const metadata = {
  title: "V2 — Brand Strategy | AKIRA LABS",
  description:
    "The positioning, product structure, and conversion logic behind AKIRA LABS — a daily performance ritual system.",
};

/* ─── Tiny reusable atoms ─── */

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] tracking-[3px] text-ink-faint">
        {index}
      </span>
      <div className="h-px flex-1 bg-line" />
      <span className="font-mono text-[10px] uppercase tracking-[3px] text-ink-faint">
        {label}
      </span>
    </div>
  );
}

function Pillar({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-b border-line pb-6">
      <span className="font-mono text-2xl font-bold text-ink-faint">
        {index}
      </span>
      <h3 className="mt-3 font-mono text-xs uppercase tracking-[2px] text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-3">{body}</p>
    </div>
  );
}

function RitualCard({
  time,
  name,
  tagline,
  problem,
  items,
}: {
  time: string;
  name: string;
  tagline: string;
  problem: string;
  items: { type: string; product: string; note: string }[];
}) {
  return (
    <div className="group border border-line bg-card p-8 transition-all duration-500 hover:border-line-hover">
      <span className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
        {time}
      </span>
      <h3 className="mt-4 text-2xl font-light tracking-tight text-ink">
        {name}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
        {tagline}
      </p>

      <div className="mt-6 border-t border-line-subtle pt-4">
        <p className="text-[10px] font-mono uppercase tracking-[2px] text-ink-faint">
          Problem it solves
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">{problem}</p>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.product}
            className="flex items-start justify-between border-b border-line-subtle pb-3"
          >
            <div>
              <span className="badge mr-2">{item.type}</span>
              <span className="text-sm text-ink">{item.product}</span>
            </div>
            <span className="font-mono text-[9px] tracking-[2px] text-ink-muted">
              {item.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-3xl font-bold text-ink">{value}</p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function AdConcept({
  index,
  hook,
  visual,
  copy,
  cta,
}: {
  index: string;
  hook: string;
  visual: string;
  copy: string;
  cta: string;
}) {
  return (
    <div className="border border-line bg-card p-6 transition-all duration-300 hover:border-line-hover">
      <div className="flex items-start justify-between">
        <span className="font-mono text-2xl font-bold text-ink-faint">
          {index}
        </span>
        <span className="badge">Ad Concept</span>
      </div>
      <h4 className="mt-4 text-lg font-light text-ink">{hook}</h4>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
            Visual
          </span>
          <p className="mt-1">{visual}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
            Copy
          </span>
          <p className="mt-1">{copy}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
            CTA
          </span>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-ink-2">
            {cta}
          </p>
        </div>
      </div>
    </div>
  );
}

function HomepageSection({
  index,
  title,
  why,
}: {
  index: string;
  title: string;
  why: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-line-subtle py-5">
      <span className="col-span-1 font-mono text-sm font-bold text-ink-faint">
        {index}
      </span>
      <div className="col-span-4 sm:col-span-3">
        <span className="font-mono text-xs uppercase tracking-[2px] text-ink">
          {title}
        </span>
      </div>
      <p className="col-span-7 sm:col-span-8 text-sm leading-relaxed text-ink-3">
        {why}
      </p>
    </div>
  );
}

/* ─── Page ─── */

export default function V2Page() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-32 sm:px-10">
      {/* ── Hero ── */}
      <div className="animate-fade-up">
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-ink-muted">
          Brand Strategy &middot; V2
        </span>
        <h1
          className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] tracking-tight text-ink"
        >
          Not a supplement store.
          <br />
          A daily performance{" "}
          <em className="font-normal italic">ritual system.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-3">
          AKIRA LABS sits at the intersection of gym performance, recovery,
          skincare, focus, and sleep — unified into a single disciplined
          practice. Small daily discipline &gt; motivation.
        </p>
      </div>

      {/* ── Brand Thesis ── */}
      <div className="mt-20 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="border border-line bg-card p-8 sm:p-12">
          <p className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
            Brand Thesis
          </p>
          <blockquote className="mt-5 text-xl font-light leading-snug tracking-tight text-ink sm:text-2xl">
            &ldquo;AKIRA LABS is the operating system for men who have outgrown
            motivation and now run on discipline — a ritual-grade daily protocol
            that merges performance supplementation with clinical skincare into
            one calm, non-negotiable routine.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — CORE CUSTOMER
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="01" label="Core Customer" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
              Persona
            </p>
            <h2 className="mt-4 text-2xl font-light tracking-tight text-ink">
              The Quiet Architect
            </h2>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
              Male, 24–34 &middot; Urban professional
            </p>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                Identity
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                He does not post gym selfies. He trains at 6 AM because he has
                learned that the body is infrastructure — it either supports his
                ambition or limits it. He reads Huberman, respects Japanese
                design, and curates his environment with intention. He would
                rather own four perfect things than forty mediocre ones.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                Frustrations
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                His bathroom counter is chaos — seven different brands, none
                that feel like <em>him</em>. He knows he should take better care
                of his skin but has never found a brand that doesn&apos;t feel
                like it was designed for teenagers or women. He is quietly
                insecure that his routine is ad-hoc and unoptimized, not
                matching the discipline he applies everywhere else.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                Aspiration
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                He wants a system he can trust and stop thinking about — the way
                he trusts his training program. One brand, one shelf, one
                ritual. He wants to look in the mirror and see someone who has
                his entire life dialled in, not just his career or his lifts.
              </p>
            </div>

            <div className="border border-line bg-elevated p-5">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                Psychographic Summary
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                He buys identity, not products. He adopts systems, not
                subscriptions. He is loyal to brands that respect his
                intelligence and never try to hype him. If AKIRA LABS feels like
                the <span className="text-ink">Aesop of performance wellness</span>,
                he is already sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — BRAND PHILOSOPHY
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="02" label="Brand Philosophy" />

        <h2 className="mt-10 text-2xl font-light tracking-tight text-ink">
          Five pillars of AKIRA LABS
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-3">
          These aren&apos;t marketing angles. They are constraints that govern
          every product, label, and sentence we publish.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Pillar
            index="01"
            title="Ritual Over Impulse"
            body="We design for daily repetition, not one-time excitement. Every product must earn its place in a morning or evening routine — if it doesn't fit a ritual, it doesn't ship."
          />
          <Pillar
            index="02"
            title="Systems Over Products"
            body="We never sell standalone items. Every SKU belongs to a named protocol. Customers adopt a system, not a shopping cart. This creates stickiness and identity."
          />
          <Pillar
            index="03"
            title="Calm Over Loud"
            body="No neon. No screaming labels. No influencer energy. Our aesthetic is clinical silence — the visual language of competence, not hype. Think lab coat, not locker room."
          />
          <Pillar
            index="04"
            title="Transparency as Brand"
            body="Every dose disclosed. Every ingredient justified. No proprietary blends. We treat the customer as an intelligent adult who reads labels — and we reward that behavior."
          />
          <Pillar
            index="05"
            title="Discipline as Identity"
            body="We don't sell motivation. We don't sell transformation. We sell the daily proof that you are the kind of person who shows up — for your body, your skin, your mind — every single day."
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — RITUAL-BASED PRODUCT STRUCTURE
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="03" label="Ritual Systems" />

        <h2 className="mt-10 text-2xl font-light tracking-tight text-ink">
          Three protocols. One daily architecture.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-3">
          Products are never sold as isolated items. They exist inside named
          ritual systems — each solving a specific block of the day with
          supplements and skincare combined.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <RitualCard
            time="06:00 — 08:00"
            name="PROTOCOL: IGNITION"
            tagline="The morning activation ritual"
            problem="Most men start their day reactive — coffee, scroll, rush. No intentional priming of body or skin. By the time they train, they're already behind."
            items={[
              {
                type: "Supplement",
                product: "SIGNAL Pre-Workout",
                note: "Focus + power",
              },
              {
                type: "Supplement",
                product: "ELEMENT Electrolytes",
                note: "Hydration",
              },
              {
                type: "Skincare",
                product: "AM Defense Moisturizer",
                note: "SPF + barrier",
              },
              {
                type: "Skincare",
                product: "Caffeine Eye Serum",
                note: "De-puff",
              },
            ]}
          />

          <RitualCard
            time="12:00 — 16:00"
            name="PROTOCOL: COMPOUND"
            tagline="The recovery & rebuild window"
            problem="Post-training nutrition is scattered — a random shake, maybe creatine remembered half the time. Recovery is treated as passive when it should be engineered."
            items={[
              {
                type: "Supplement",
                product: "COMPOUND Whey Isolate",
                note: "30g protein",
              },
              {
                type: "Supplement",
                product: "STRUCTURE Creatine",
                note: "5g mono",
              },
              {
                type: "Supplement",
                product: "REBUILD BCAAs",
                note: "Recovery",
              },
              {
                type: "Skincare",
                product: "Post-Gym Face Wash",
                note: "Deep clean",
              },
            ]}
          />

          <RitualCard
            time="21:00 — 22:00"
            name="PROTOCOL: DESCENT"
            tagline="The night wind-down ritual"
            problem="Sleep quality is the number one bottleneck for recovery, cognitive performance, and skin regeneration — yet most men have zero evening protocol."
            items={[
              {
                type: "Supplement",
                product: "CLARITY Nootropic",
                note: "Calm focus",
              },
              {
                type: "Supplement",
                product: "BASELINE Greens",
                note: "Micronutrients",
              },
              {
                type: "Skincare",
                product: "PM Repair Serum",
                note: "Retinol",
              },
              {
                type: "Skincare",
                product: "Night Recovery Cream",
                note: "Barrier repair",
              },
            ]}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — HERO BUNDLE
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="04" label="Hero Bundle" />

        <div className="mt-10 border border-line bg-card">
          <div className="border-b border-line p-8 sm:p-12">
            <span className="badge">Starter Kit</span>
            <h2 className="mt-5 text-2xl font-light tracking-tight text-ink sm:text-3xl">
              THE DAILY PROTOCOL
            </h2>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
              Everything you need. Nothing you don&apos;t.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-3">
              The first purchase a new customer makes. Designed to demonstrate
              the system — morning, recovery, and night in one box. This is not
              a &ldquo;bundle deal.&rdquo; It is an onboarding experience into a
              new daily architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "SIGNAL Pre-Workout", ritual: "Ignition" },
              { name: "COMPOUND Whey Isolate", ritual: "Compound" },
              { name: "STRUCTURE Creatine", ritual: "Compound" },
              { name: "BASELINE Daily Greens", ritual: "Descent" },
              { name: "AM Defense Moisturizer", ritual: "Ignition" },
              { name: "PM Repair Serum", ritual: "Descent" },
            ].map((item, i) => (
              <div
                key={item.name}
                className={`flex items-start justify-between p-6 ${
                  i < 5 ? "border-b border-line sm:border-b" : ""
                } ${i % 3 !== 2 ? "lg:border-r lg:border-line" : ""}`}
              >
                <div>
                  <p className="text-sm text-ink">{item.name}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
                    {item.ritual}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                  Why it converts
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-3">
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-ink-faint">&mdash;</span>
                    <span>
                      <strong className="text-ink">Reduces decision
                      paralysis.</strong>{" "}
                      New customers don&apos;t know where to start. This tells
                      them: &ldquo;Start here. This is the system.&rdquo;
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-ink-faint">&mdash;</span>
                    <span>
                      <strong className="text-ink">Anchors the brand as a
                      system.</strong>{" "}
                      First impression is &ldquo;this is a protocol I adopt,&rdquo;
                      not &ldquo;this is a store I browse.&rdquo;
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 text-ink-faint">&mdash;</span>
                    <span>
                      <strong className="text-ink">Bridges supplement +
                      skincare.</strong>{" "}
                      The bundle forces the cross-category discovery that
                      individual product pages never achieve.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                  Price Anchoring Strategy
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-baseline justify-between border-b border-line-subtle pb-3">
                    <span className="text-sm text-ink-3">
                      Individual retail total
                    </span>
                    <span className="font-mono text-sm text-ink-muted line-through">
                      $287.00
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-b border-line-subtle pb-3">
                    <span className="text-sm text-ink">
                      The Daily Protocol bundle
                    </span>
                    <span className="font-mono text-lg font-bold text-ink">
                      $219.00
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink-3">You save</span>
                    <span className="font-mono text-sm text-ink-2">
                      $68.00 (24%)
                    </span>
                  </div>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                  The price sits below $250 — the psychological threshold where
                  a &ldquo;considered purchase&rdquo; becomes a &ldquo;big
                  decision.&rdquo; The 24% saving is meaningful without
                  cheapening the brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — HOMEPAGE STRUCTURE
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="05" label="Homepage Structure" />

        <h2 className="mt-10 text-2xl font-light tracking-tight text-ink">
          Section order &amp; conversion logic
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-3">
          Every section earns its position. The homepage is a persuasion
          sequence — each block answers a psychological objection in the order a
          new visitor experiences them.
        </p>

        <div className="mt-10">
          <HomepageSection
            index="01"
            title="Hero Statement"
            why="Lead with identity, not product. The visitor must feel 'this brand understands me' within 3 seconds. No product grid. One bold thesis: 'Your daily performance ritual.' Subtext positions the cross-category promise."
          />
          <HomepageSection
            index="02"
            title="Credibility Bar"
            why="Immediately answer 'why should I trust you?' — micro-stats (clinical doses, third-party tested, zero fillers) in a quiet horizontal strip. Builds authority without shouting."
          />
          <HomepageSection
            index="03"
            title="The 3 Rituals"
            why="Show the system before showing products. Visitors see Morning / Recovery / Night protocols. This reframes the entire store as a daily architecture — not a catalogue. Highest-impact section for differentiation."
          />
          <HomepageSection
            index="04"
            title="Hero Bundle CTA"
            why="First conversion opportunity. 'Start The Protocol' — a single action that removes all decision fatigue. Anchor price against individual total. This is the #1 revenue driver for DTC wellness brands."
          />
          <HomepageSection
            index="05"
            title="Philosophy Block"
            why="For the visitor who scrolled past the CTA — they need deeper conviction. Brand manifesto: radical transparency, no proprietary blends, clinical doses. Converts the skeptic who reads labels."
          />
          <HomepageSection
            index="06"
            title="Social Proof"
            why="Testimonials framed as routine adoption stories, not product reviews. 'I replaced 6 products with one system.' Identity reinforcement, not star ratings."
          />
          <HomepageSection
            index="07"
            title="Individual Products"
            why="For visitors who want to explore before committing to a bundle. Organized by ritual (not category) to maintain the system framing. Each card links to its parent protocol."
          />
          <HomepageSection
            index="08"
            title="Ingredient Transparency"
            why="Full-width section showing one product's complete label. 'Every dose. Every ingredient. Nothing hidden.' Addresses the #1 objection in the supplement industry."
          />
          <HomepageSection
            index="09"
            title="Closing CTA"
            why="Minimal. Restates the thesis. Single button: 'Begin The Protocol.' No discount pop-up, no urgency hack. The calm confidence of the CTA is itself a brand signal."
          />
          <HomepageSection
            index="10"
            title="Footer"
            why="Clean utility: shipping info, return policy, contact. A 'Science & Testing' link to a transparency page builds lasting trust beyond the homepage visit."
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — AD CREATIVE ANGLES
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="06" label="Ad Creative" />

        <h2 className="mt-10 text-2xl font-light tracking-tight text-ink">
          Five identity-driven ad concepts
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-3">
          These sell who the customer becomes — not what the product contains.
          No supplement facts in ads. No before/after. No influencer energy.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdConcept
            index="01"
            hook="The Counter"
            visual="Overhead shot of a perfectly arranged bathroom shelf — five minimal AKIRA LABS products in a row. Clean marble. Morning light. No person visible."
            copy="You can tell a lot about a man by the shelf above his sink."
            cta="Build Your Protocol →"
          />
          <AdConcept
            index="02"
            hook="The 5 AM Frame"
            visual="Dark apartment, single light on. A hand placing a pre-workout scoop into a glass. Clock reads 5:47. Everything else is still asleep."
            copy="Discipline doesn't need an audience."
            cta="Start The Ritual →"
          />
          <AdConcept
            index="03"
            hook="The Replacement"
            visual="Split frame: left side shows a cluttered bathroom counter with 8+ random products. Right side shows one clean AKIRA LABS shelf. Same counter."
            copy="You outgrew the brands. You just haven't replaced them yet."
            cta="One System. Every Day. →"
          />
          <AdConcept
            index="04"
            hook="The Ingredients List"
            visual="Tight macro shot of a product label — every ingredient and dose clearly legible. Camera slowly pulls back to reveal the full bottle. Silence."
            copy="We put the label on the front because we have nothing to put on the back."
            cta="Read The Label →"
          />
          <AdConcept
            index="05"
            hook="The Non-Negotiable"
            visual="Quick-cut montage: alarm off, feet on floor, scoop measured, face washed, serum applied, door closed. 15 seconds. Same routine. Different days. Same precision."
            copy="It's not motivation. It's architecture."
            cta="Adopt The Protocol →"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — LAUNCH STRATEGY
      ══════════════════════════════════════════════ */}
      <section className="mt-28">
        <SectionLabel index="07" label="Launch Strategy" />

        <h2 className="mt-10 text-2xl font-light tracking-tight text-ink">
          Minimal SKU launch &mdash; less converts more
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm leading-relaxed text-ink-3">
              The biggest conversion killer for new DTC brands is
              overchoice. Every additional product on a homepage competes
              for attention, dilutes the brand message, and increases the
              cognitive load required to make a purchase decision.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              AKIRA LABS should launch with the minimum viable system — just
              enough products to demonstrate the ritual architecture, and
              nothing more. New SKUs are earned by demand, not guesswork.
            </p>

            <div className="mt-8 flex gap-12">
              <StatBlock value="6–8" label="Launch SKUs" />
              <StatBlock value="1" label="Hero Bundle" />
              <StatBlock value="3" label="Ritual Tracks" />
            </div>
          </div>

          <div className="border border-line bg-card">
            <div className="border-b border-line p-6">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
                Recommended Launch SKUs
              </p>
            </div>
            {[
              {
                name: "SIGNAL",
                type: "Pre-Workout",
                ritual: "Ignition",
              },
              {
                name: "COMPOUND",
                type: "Whey Isolate",
                ritual: "Compound",
              },
              {
                name: "STRUCTURE",
                type: "Creatine Mono",
                ritual: "Compound",
              },
              {
                name: "BASELINE",
                type: "Daily Greens",
                ritual: "Descent",
              },
              {
                name: "FOUNDATION",
                type: "Multivitamin",
                ritual: "Ignition",
              },
              {
                name: "AM Moisturizer",
                type: "SPF Defense",
                ritual: "Ignition",
                source: "Selfnamed",
              },
              {
                name: "PM Serum",
                type: "Retinol Repair",
                ritual: "Descent",
                source: "Selfnamed",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border-b border-line-subtle px-6 py-4"
              >
                <div>
                  <p className="text-sm text-ink">{item.name}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[2px] text-ink-muted">
                    {item.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {item.source && (
                    <span className="badge">{item.source}</span>
                  )}
                  <span className="font-mono text-[9px] uppercase tracking-[2px] text-ink-faint">
                    {item.ritual}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why fewer SKUs */}
        <div className="mt-12 border border-line bg-elevated p-8 sm:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-ink-muted">
            Why too many SKUs kills conversion
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                title: "Decision Fatigue",
                body: "Every additional product increases cognitive load by ~15%. Past 12 SKUs, new visitor conversion drops sharply. The homepage becomes a catalogue, not a system pitch.",
              },
              {
                title: "Inventory Risk",
                body: "More SKUs = more capital locked in stock, more supplier MOQs, more fulfillment complexity. Launch lean, let sell-through data dictate expansion.",
              },
              {
                title: "Brand Dilution",
                body: "A brand that sells 30 products on day one looks like a dropship store. A brand that sells 7 products inside 3 named rituals looks like it has a point of view.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="font-mono text-xs uppercase tracking-[2px] text-ink">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="mt-28 border-t border-line pt-12 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[3px] text-ink-faint">
          End of Strategy Document
        </p>
        <h2 className="mt-6 text-2xl font-light tracking-tight text-ink sm:text-3xl">
          Small daily discipline &gt; motivation.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-3">
          This is not a supplement store. It is a system people adopt. Every
          decision — product naming, homepage order, bundle structure, ad
          creative — serves that single thesis.
        </p>
        <div className="mt-8">
          <Link href="/products" className="btn-primary">
            View Current Protocol
          </Link>
        </div>
      </section>
    </div>
  );
}
