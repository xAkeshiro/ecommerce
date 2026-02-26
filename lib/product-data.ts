// Extended product data: supplement facts, benefits, dosing, FAQ, reviews, and stack recommendations

export interface SupplementFact {
  ingredient: string;
  amount: string;
}

export interface ProductExtended {
  servingSize: string;
  servingsPerContainer: number;
  supplementFacts: SupplementFact[];
  benefits: string[];
  howToUse: string;
  faq: { question: string; answer: string }[];
  complementaryIds: string[]; // product IDs for "Complete Your Stack"
  reviews: {
    name: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

export const PRODUCT_EXTENDED: Record<string, ProductExtended> = {
  "1": {
    // SIGNAL — Pre-Workout
    servingSize: "1 scoop (12g)",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "L-Citrulline Malate (2:1)", amount: "6,000 mg" },
      { ingredient: "Beta-Alanine", amount: "3,200 mg" },
      { ingredient: "L-Tyrosine", amount: "1,500 mg" },
      { ingredient: "Caffeine Anhydrous (Natural)", amount: "200 mg" },
      { ingredient: "L-Theanine", amount: "100 mg" },
      { ingredient: "Pink Himalayan Salt", amount: "500 mg" },
      { ingredient: "BioPerine (Black Pepper Extract)", amount: "5 mg" },
    ],
    benefits: [
      "Sustained energy and focus without the crash",
      "Enhanced blood flow from clinical-dose L-Citrulline",
      "Smooth energy via caffeine + L-Theanine synergy",
      "Zero artificial colors, dyes, or fillers",
    ],
    howToUse:
      "Mix 1 scoop with 8-12oz cold water. Consume 20-30 minutes before training. Assess tolerance with half a scoop on first use. Do not exceed 2 scoops in 24 hours.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Every batch is tested by an independent lab for purity, potency, and heavy metals. Certificates of analysis are available on request.",
      },
      {
        question: "Are there any allergens?",
        answer:
          "SIGNAL is manufactured in a facility that also processes milk, soy, and tree nuts. The formula itself is free from all major allergens.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "Absolutely. SIGNAL pairs well with ELEMENT (Electrolytes) during training and REBUILD (BCAAs) post-workout.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["2", "3", "6"],
    reviews: [
      {
        name: "Marcus T.",
        rating: 5,
        date: "2025-12-15",
        text: "Clean energy without the jitters. I've tried at least a dozen pre-workouts and this is the first one that doesn't make me feel wired. The L-Theanine pairing is smart.",
      },
      {
        name: "Yuki S.",
        rating: 5,
        date: "2025-11-20",
        text: "Finally a pre-workout with transparent dosing. No proprietary blends, every ingredient listed. The pumps from the citrulline are real.",
      },
      {
        name: "Jordan P.",
        rating: 4,
        date: "2025-10-08",
        text: "Great formula. Mixes well and the unflavored option makes it easy to add to whatever I'm drinking. Would love a slight mint flavor option in the future.",
      },
      {
        name: "Elena R.",
        rating: 5,
        date: "2025-09-22",
        text: "I'm sensitive to most pre-workouts but this one sits well. The beta-alanine tingling is there but mild. Solid focus for early morning sessions.",
      },
    ],
  },

  "2": {
    // COMPOUND — Whey Isolate
    servingSize: "1 scoop (32g)",
    servingsPerContainer: 28,
    supplementFacts: [
      { ingredient: "Protein (Whey Isolate)", amount: "27 g" },
      { ingredient: "Total Fat", amount: "0.5 g" },
      { ingredient: "Cholesterol", amount: "5 mg" },
      { ingredient: "Sodium", amount: "50 mg" },
      { ingredient: "Total Carbohydrate", amount: "1 g" },
      { ingredient: "Sugars", amount: "< 1 g" },
      { ingredient: "Calcium", amount: "120 mg" },
    ],
    benefits: [
      "27g pure protein per serving with under 1g sugar",
      "Cold-processed to preserve bioavailability",
      "Unflavored for versatile stacking and mixing",
      "Micro-filtered isolate — minimal lactose",
    ],
    howToUse:
      "Mix 1 scoop with 8-10oz water or milk of choice. Best consumed within 30 minutes post-workout, or anytime to meet daily protein needs. Can be added to smoothies, oats, or recipes.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Each batch is independently tested for purity, heavy metals, and accurate protein content.",
      },
      {
        question: "Is this suitable for lactose-intolerant individuals?",
        answer:
          "Whey isolate contains significantly less lactose than concentrate. Most lactose-intolerant individuals tolerate it well, though sensitivity varies.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "Yes. COMPOUND stacks perfectly with STRUCTURE (Creatine) post-workout and BASELINE (Greens) for a complete daily shake.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["4", "5", "1"],
    reviews: [
      {
        name: "Alex K.",
        rating: 5,
        date: "2025-12-02",
        text: "Best unflavored whey I've found. No weird aftertaste, mixes clean. I add it to my morning oats and post-workout shake without it changing the taste.",
      },
      {
        name: "Priya M.",
        rating: 5,
        date: "2025-11-15",
        text: "The quality is noticeable. Mixes completely with just a shaker bottle — no clumps. 27g protein with less than 1g sugar is exactly what I was looking for.",
      },
      {
        name: "David L.",
        rating: 4,
        date: "2025-10-30",
        text: "Solid isolate. Very clean ingredient list. Would love a larger size option for the value, but the quality speaks for itself.",
      },
      {
        name: "Sarah C.",
        rating: 5,
        date: "2025-09-18",
        text: "I have mild lactose sensitivity and this doesn't bother me at all. The cold-processing really does seem to make a difference.",
      },
    ],
  },

  "3": {
    // ELEMENT — Electrolytes
    servingSize: "1 stick pack (6g)",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "Sodium (Sodium Citrate)", amount: "1,000 mg" },
      { ingredient: "Potassium (Potassium Citrate)", amount: "200 mg" },
      { ingredient: "Magnesium (Magnesium Malate)", amount: "60 mg" },
      { ingredient: "Chloride", amount: "200 mg" },
      { ingredient: "Calcium (Calcium Carbonate)", amount: "40 mg" },
      { ingredient: "Zinc (Zinc Bisglycinate)", amount: "3 mg" },
    ],
    benefits: [
      "Optimal sodium-to-potassium ratio for hydration",
      "Zero sugar, zero calories — no unnecessary carbs",
      "Bioavailable mineral forms for rapid absorption",
      "Convenient stick packs for training and travel",
    ],
    howToUse:
      "Mix 1 stick pack with 16-32oz water. Use during training, first thing in the morning, or anytime you need hydration support. Adjust water volume to taste preference.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Every batch is independently verified for purity, potency, and absence of contaminants.",
      },
      {
        question: "Why is the sodium content so high?",
        answer:
          "Active individuals lose significant sodium through sweat. 1,000mg replaces what's lost during moderate-to-intense training without excessive intake.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "ELEMENT pairs perfectly with SIGNAL (Pre-Workout) before training and REBUILD (BCAAs) for intra-workout hydration.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["1", "6", "4"],
    reviews: [
      {
        name: "Chris W.",
        rating: 5,
        date: "2025-12-10",
        text: "Game changer for early morning training. I mix a stick pack first thing and the difference in energy and focus is immediate. No sugar crash like sports drinks.",
      },
      {
        name: "Amanda B.",
        rating: 5,
        date: "2025-11-05",
        text: "The stick packs are so convenient. I keep a few in my gym bag and a few at my desk. Clean taste, dissolves instantly.",
      },
      {
        name: "Ryan H.",
        rating: 4,
        date: "2025-10-20",
        text: "Great electrolyte profile. Noticeably less cramping during long runs. Slightly salty taste but that's expected with proper sodium content.",
      },
      {
        name: "Lisa T.",
        rating: 5,
        date: "2025-09-15",
        text: "I was spending too much on fancy electrolyte drinks with added sugar. This is cleaner, more effective, and better value.",
      },
    ],
  },

  "4": {
    // STRUCTURE — Creatine
    servingSize: "1 scoop (5g)",
    servingsPerContainer: 60,
    supplementFacts: [
      { ingredient: "Creatine Monohydrate (Creapure®)", amount: "5,000 mg" },
    ],
    benefits: [
      "Pharmaceutical-grade Creapure® for highest purity",
      "Micronized for effortless mixing and absorption",
      "The most researched sports supplement in existence",
      "Supports strength, power, and lean muscle gains",
    ],
    howToUse:
      "Mix 1 scoop (5g) with any beverage. Timing is flexible — consistency matters more than timing. Take daily, including rest days. No loading phase required.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Creapure® is produced in Germany under strict quality standards. Each batch is also independently tested for purity.",
      },
      {
        question: "Do I need a loading phase?",
        answer:
          "No. Taking 5g daily will saturate muscles within 3-4 weeks. A loading phase (20g/day for 5 days) can accelerate this but isn't necessary.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "STRUCTURE mixes seamlessly with COMPOUND (Protein) post-workout or SIGNAL (Pre-Workout) before training.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["2", "1", "6"],
    reviews: [
      {
        name: "Tom R.",
        rating: 5,
        date: "2025-12-08",
        text: "Pure creatine, no fillers, Creapure certified. Exactly what I want — nothing more, nothing less. Mixes completely clear.",
      },
      {
        name: "Mike J.",
        rating: 5,
        date: "2025-11-22",
        text: "60 servings for this price with Creapure quality is a steal. I mix it into my post-workout protein shake. Zero taste, zero grit.",
      },
      {
        name: "Nina F.",
        rating: 5,
        date: "2025-10-15",
        text: "I've been taking creatine for years and this is the cleanest I've used. Micronized powder dissolves instantly. Noticeable strength gains within a month.",
      },
      {
        name: "James D.",
        rating: 4,
        date: "2025-09-28",
        text: "Quality product. Simple, effective, no nonsense. Only wish the tub was a bit larger for the price, but the Creapure quality is worth it.",
      },
    ],
  },

  "5": {
    // BASELINE — Daily Greens
    servingSize: "1 scoop (10g)",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "Organic Greens Blend", amount: "4,000 mg" },
      { ingredient: "Spirulina", amount: "1,500 mg" },
      { ingredient: "Chlorella (Broken Cell Wall)", amount: "1,000 mg" },
      { ingredient: "Digestive Enzyme Blend", amount: "500 mg" },
      { ingredient: "Probiotic Blend (5B CFU)", amount: "250 mg" },
      { ingredient: "Ashwagandha (KSM-66)", amount: "300 mg" },
      { ingredient: "Organic Turmeric Extract", amount: "200 mg" },
    ],
    benefits: [
      "40+ whole food ingredients in a single scoop",
      "Digestive enzymes and probiotics for gut health",
      "Adaptogenic herbs for stress response support",
      "Your daily nutritional insurance policy",
    ],
    howToUse:
      "Mix 1 scoop with 8-12oz water or add to your morning smoothie. Best taken on an empty stomach or with a light meal. Use daily for cumulative benefits.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Every batch is tested for purity, heavy metals, and microbial contamination by an independent lab.",
      },
      {
        question: "Does this replace a multivitamin?",
        answer:
          "BASELINE provides whole food nutrition that complements a multivitamin. For complete coverage, we recommend pairing with FOUNDATION (Daily Multi).",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "BASELINE pairs perfectly with FOUNDATION (Daily Multi) and COMPOUND (Protein) for a comprehensive morning stack.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["8", "2", "7"],
    reviews: [
      {
        name: "Rachel K.",
        rating: 5,
        date: "2025-12-05",
        text: "This is the only greens powder I've been able to drink consistently. It doesn't taste like lawn clippings. Mild, earthy, actually pleasant.",
      },
      {
        name: "Dan M.",
        rating: 4,
        date: "2025-11-12",
        text: "Comprehensive formula with quality ingredients. The probiotic and enzyme blend is a nice touch. My digestion has noticeably improved after 3 weeks.",
      },
      {
        name: "Sophie L.",
        rating: 5,
        date: "2025-10-25",
        text: "I travel a lot and this keeps my nutrition consistent on the road. The ingredient list is genuinely impressive compared to other greens on the market.",
      },
      {
        name: "Kevin O.",
        rating: 5,
        date: "2025-09-10",
        text: "Started taking this with FOUNDATION every morning. Energy levels are more consistent throughout the day. The ashwagandha is a smart addition.",
      },
    ],
  },

  "6": {
    // REBUILD — Recovery BCAAs
    servingSize: "1 scoop (10g)",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "L-Leucine", amount: "3,500 mg" },
      { ingredient: "L-Isoleucine", amount: "1,750 mg" },
      { ingredient: "L-Valine", amount: "1,750 mg" },
      { ingredient: "L-Glutamine", amount: "3,000 mg" },
      { ingredient: "Coconut Water Powder", amount: "500 mg" },
      { ingredient: "Vitamin B6 (P-5-P)", amount: "2 mg" },
    ],
    benefits: [
      "Optimal 2:1:1 BCAA ratio for muscle recovery",
      "3g L-Glutamine for immune and gut support",
      "Informed Sport certified for competitive athletes",
      "Ideal for intra-workout or post-training recovery",
    ],
    howToUse:
      "Mix 1 scoop with 12-16oz cold water. Sip during training or consume immediately post-workout. Can be used on rest days to support recovery.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. REBUILD is Informed Sport certified, meaning it's tested for over 250 banned substances — safe for competitive athletes.",
      },
      {
        question: "Should I take this during or after my workout?",
        answer:
          "Both work. Intra-workout sipping can reduce muscle breakdown during training. Post-workout supports recovery. Many users do both.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "REBUILD is the perfect post-workout partner to SIGNAL (Pre-Workout) and ELEMENT (Electrolytes).",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["1", "3", "2"],
    reviews: [
      {
        name: "Jake S.",
        rating: 5,
        date: "2025-12-12",
        text: "The recovery difference is real. I train 6 days a week and started using REBUILD intra-workout. Soreness has dropped noticeably.",
      },
      {
        name: "Maria G.",
        rating: 5,
        date: "2025-11-28",
        text: "Informed Sport certified was the deciding factor for me. As a competitive athlete, I can't risk anything. This is my go-to recovery supplement.",
      },
      {
        name: "Ben T.",
        rating: 4,
        date: "2025-10-14",
        text: "Good BCAA formula with a solid glutamine dose. The coconut water powder is a nice addition for extra hydration. Wish it came in more sizes.",
      },
      {
        name: "Ashley N.",
        rating: 5,
        date: "2025-09-30",
        text: "I pair this with ELEMENT during my workouts and the combination is perfect. Clean ingredients, effective doses, no junk.",
      },
    ],
  },

  "7": {
    // CLARITY — Nootropic
    servingSize: "2 capsules",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "Lion's Mane Extract (8:1)", amount: "500 mg" },
      { ingredient: "Alpha-GPC (50%)", amount: "300 mg" },
      { ingredient: "L-Theanine", amount: "200 mg" },
      { ingredient: "Bacopa Monnieri (50% bacosides)", amount: "300 mg" },
      { ingredient: "Rhodiola Rosea (3% rosavins)", amount: "200 mg" },
      { ingredient: "BioPerine", amount: "5 mg" },
    ],
    benefits: [
      "Sustained focus without stimulant dependency",
      "Neuroprotective compounds for long-term brain health",
      "Adaptogenic herbs for stress resilience",
      "Clean cognitive enhancement — no jitters or crash",
    ],
    howToUse:
      "Take 2 capsules with food in the morning or early afternoon. Consistent daily use for 4-6 weeks yields best results. Do not exceed recommended dose.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Every batch is independently tested for purity, potency, and heavy metals. Certificates of analysis available on request.",
      },
      {
        question: "Does this contain caffeine?",
        answer:
          "No. CLARITY is stimulant-free, making it stackable with coffee or SIGNAL if you want the cognitive benefits without additional stimulants.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "CLARITY stacks beautifully with FOUNDATION (Daily Multi) for a complete daily wellness protocol and BASELINE (Greens) for comprehensive nutrition.",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["8", "5", "1"],
    reviews: [
      {
        name: "Andrew W.",
        rating: 5,
        date: "2025-12-01",
        text: "Three weeks in and the difference in my ability to deep focus is dramatic. I work as a software engineer and this has replaced my afternoon coffee.",
      },
      {
        name: "Mei L.",
        rating: 5,
        date: "2025-11-18",
        text: "The Lion's Mane and Alpha-GPC combo is well-researched. I appreciate that this doesn't rely on stimulants. Steady, calm focus all day.",
      },
      {
        name: "Patrick H.",
        rating: 4,
        date: "2025-10-22",
        text: "Subtle but real effects. It took about 2 weeks to notice the difference. Now on my second bottle and the consistency is key.",
      },
      {
        name: "Diana C.",
        rating: 5,
        date: "2025-09-05",
        text: "I stack this with FOUNDATION every morning. The Rhodiola really helps with stress — I'm calmer during intense work periods. Highly recommend.",
      },
    ],
  },

  "8": {
    // FOUNDATION — Daily Multi
    servingSize: "2 capsules",
    servingsPerContainer: 30,
    supplementFacts: [
      { ingredient: "Vitamin D3 (Cholecalciferol)", amount: "2,000 IU" },
      { ingredient: "Vitamin K2 (MK-7)", amount: "100 mcg" },
      { ingredient: "Methylated B-Complex", amount: "—" },
      { ingredient: "  Vitamin B12 (Methylcobalamin)", amount: "1,000 mcg" },
      { ingredient: "  Folate (5-MTHF)", amount: "400 mcg" },
      { ingredient: "  Vitamin B6 (P-5-P)", amount: "25 mg" },
      { ingredient: "Magnesium (Bisglycinate)", amount: "200 mg" },
      { ingredient: "Zinc (Bisglycinate)", amount: "15 mg" },
      { ingredient: "Selenium (Selenomethionine)", amount: "200 mcg" },
      { ingredient: "Boron (Bororganic Glycine)", amount: "3 mg" },
    ],
    benefits: [
      "Methylated B-vitamins for optimal absorption",
      "Chelated minerals — no cheap oxides or carbonates",
      "Vitamin D3 + K2 synergy for bone and heart health",
      "Fills nutritional gaps that training amplifies",
    ],
    howToUse:
      "Take 2 capsules daily with food. Morning consumption with breakfast is recommended. Consistent daily use is important for cumulative benefits.",
    faq: [
      {
        question: "Is this third-party tested?",
        answer:
          "Yes. Every batch is independently verified for purity, potency, and absence of contaminants.",
      },
      {
        question: "Why methylated B-vitamins?",
        answer:
          "Up to 40% of people have MTHFR gene variants that reduce their ability to process synthetic folic acid and B12. Methylated forms bypass this issue entirely.",
      },
      {
        question: "Can I stack this with other AKIRA LABS products?",
        answer:
          "FOUNDATION is designed to be the base of any stack. It pairs especially well with CLARITY (Nootropic) and BASELINE (Greens).",
      },
      {
        question: "What's the return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not happy, contact us for a full refund on your first order.",
      },
    ],
    complementaryIds: ["7", "5", "2"],
    reviews: [
      {
        name: "Robert A.",
        rating: 5,
        date: "2025-12-18",
        text: "The chelated minerals and methylated B-vitamins tell me this was formulated by someone who actually understands bioavailability. Superior to any multi I've used.",
      },
      {
        name: "Olivia S.",
        rating: 5,
        date: "2025-11-08",
        text: "I have MTHFR and most multis use folic acid. This uses 5-MTHF. Finally a supplement company that pays attention to the science.",
      },
      {
        name: "Marcus B.",
        rating: 4,
        date: "2025-10-18",
        text: "Comprehensive formula with quality ingredient forms. The D3+K2 combo and magnesium bisglycinate are exactly what I'd choose individually, bundled into one.",
      },
      {
        name: "Tina W.",
        rating: 5,
        date: "2025-09-25",
        text: "Been taking this for 3 months now alongside CLARITY. My energy is more consistent and I feel like my recovery from training has improved too.",
      },
    ],
  },
};

// Homepage testimonials
export const TESTIMONIALS = [
  {
    quote:
      "I've tried every supplement brand out there. AKIRA LABS is the first one where I can actually verify every ingredient at its clinical dose. No games.",
    name: "Marcus T.",
    product: "SIGNAL Pre-Workout",
  },
  {
    quote:
      "The transparency is what sold me. Every dose listed, every batch tested. This is what the supplement industry should look like.",
    name: "Priya M.",
    product: "COMPOUND Whey Isolate",
  },
  {
    quote:
      "Simple, effective, no nonsense. I take FOUNDATION and CLARITY every morning. The quality difference is noticeable within weeks.",
    name: "Andrew W.",
    product: "CLARITY Nootropic",
  },
];
