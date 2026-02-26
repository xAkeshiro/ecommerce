export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  price: number; // in cents
  category: "performance" | "protein" | "daily";
  description: string;
  details: string[];
  badge: string | null;
  image: string;
  imageUrl?: string;
  imageUrls?: string[];
  tagline: string;
  active: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "SIGNAL",
    subtitle: "Pre-Workout — 30 Servings",
    slug: "signal",
    price: 4800,
    category: "performance",
    description:
      "Clinical-dose pre-workout engineered for sustained focus and power output. Zero crash formula with L-Citrulline, Beta-Alanine, and 200mg natural caffeine.",
    details: [
      "30 servings per container",
      "6g L-Citrulline Malate",
      "200mg Natural Caffeine",
      "Zero artificial colors",
    ],
    badge: "BEST SELLER",
    image: "pre-workout",
    tagline: "ACTIVATE",
    active: true,
  },
  {
    id: "2",
    name: "COMPOUND",
    subtitle: "Whey Isolate — 2lb",
    slug: "compound",
    price: 5800,
    category: "protein",
    description:
      "Cold-processed whey isolate. 27g protein per serving with minimal lactose. Micro-filtered for maximum bioavailability. Unflavored for clean stacking.",
    details: [
      "27g protein per serving",
      "< 1g sugar per serving",
      "Cold-processed isolate",
      "Third-party tested",
    ],
    badge: "NEW",
    image: "whey",
    tagline: "BUILD",
    active: true,
  },
  {
    id: "3",
    name: "ELEMENT",
    subtitle: "Electrolytes — 30 Sticks",
    slug: "element",
    price: 3200,
    category: "daily",
    description:
      "Precision electrolyte formula with optimal sodium, potassium, and magnesium ratios. Zero sugar. Designed for training days and daily hydration protocol.",
    details: [
      "1000mg Sodium",
      "200mg Potassium",
      "60mg Magnesium",
      "Zero sugar / Zero calories",
    ],
    badge: null,
    image: "electrolyte",
    tagline: "REPLENISH",
    active: true,
  },
  {
    id: "4",
    name: "STRUCTURE",
    subtitle: "Creatine Mono — 60 Servings",
    slug: "structure",
    price: 3800,
    category: "performance",
    description:
      "Pharmaceutical-grade creatine monohydrate. Micronized for rapid absorption. The most researched compound in sports nutrition. No fillers.",
    details: [
      "5g per serving",
      "Micronized for absorption",
      "Creapure® certified",
      "Unflavored / stackable",
    ],
    badge: null,
    image: "creatine",
    tagline: "STRENGTHEN",
    active: true,
  },
  {
    id: "5",
    name: "BASELINE",
    subtitle: "Daily Greens — 30 Servings",
    slug: "baseline",
    price: 5200,
    category: "daily",
    description:
      "Comprehensive greens formula with 40+ whole food ingredients. Digestive enzymes and probiotics included. Your nutritional foundation.",
    details: [
      "40+ whole food ingredients",
      "Digestive enzyme blend",
      "5B CFU probiotics",
      "No artificial sweeteners",
    ],
    badge: null,
    image: "greens",
    tagline: "SUSTAIN",
    active: true,
  },
  {
    id: "6",
    name: "REBUILD",
    subtitle: "Recovery BCAAs — 30 Servings",
    slug: "rebuild",
    price: 4500,
    category: "performance",
    description:
      "2:1:1 BCAA ratio with added L-Glutamine for accelerated recovery. Formulated for post-training muscle protein synthesis support.",
    details: [
      "7g BCAAs per serving",
      "2:1:1 Leucine ratio",
      "3g L-Glutamine",
      "Informed Sport certified",
    ],
    badge: "LOW STOCK",
    image: "bcaa",
    tagline: "RECOVER",
    active: true,
  },
  {
    id: "7",
    name: "CLARITY",
    subtitle: "Nootropic — 60 Capsules",
    slug: "clarity",
    price: 4200,
    category: "daily",
    description:
      "Cognitive performance stack with Lion's Mane, Alpha-GPC, and L-Theanine. Designed for sustained mental clarity without stimulant dependency.",
    details: [
      "500mg Lion's Mane",
      "300mg Alpha-GPC",
      "200mg L-Theanine",
      "60 capsules / 30 days",
    ],
    badge: null,
    image: "nootropic",
    tagline: "FOCUS",
    active: true,
  },
  {
    id: "8",
    name: "FOUNDATION",
    subtitle: "Daily Multi — 60 Capsules",
    slug: "foundation",
    price: 3600,
    category: "daily",
    description:
      "Bioavailable daily multivitamin with methylated B-vitamins and chelated minerals. Covers nutritional gaps that training amplifies.",
    details: [
      "Methylated B-Complex",
      "Chelated minerals",
      "Vitamin D3 + K2",
      "60 capsules / 30 days",
    ],
    badge: null,
    image: "multi",
    tagline: "BASELINE",
    active: true,
  },
];

export const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "performance", label: "PERFORMANCE" },
  { id: "protein", label: "PROTEIN" },
  { id: "daily", label: "DAILY" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  if (category === "all") return PRODUCTS.filter((p) => p.active);
  return PRODUCTS.filter((p) => p.active && p.category === category);
}

/**
 * Fetches Shopify products and merges image URLs into local product data.
 * Matches by slug/handle using fuzzy matching (slug contained in handle or vice versa).
 */
export async function getProductsWithImages(): Promise<Product[]> {
  try {
    const { getProducts } = await import("@/lib/shopify");
    const shopifyProducts = await getProducts(50);

    return PRODUCTS.map((product) => {
      const slug = product.slug.toLowerCase();
      const nameLower = product.name.toLowerCase();

      const match = shopifyProducts.find(
        (sp) =>
          sp.handle === slug ||
          sp.handle.includes(slug) ||
          slug.includes(sp.handle) ||
          sp.title.toLowerCase().includes(nameLower)
      );

      if (!match) return product;

      const allImageUrls = match.images?.edges?.map((e) => e.node.url).filter(Boolean) || [];
      const imageUrl = allImageUrls[0];
      const shopifyPrice = match.priceRange?.minVariantPrice?.amount;
      const price = shopifyPrice
        ? Math.round(parseFloat(shopifyPrice) * 100)
        : product.price;

      return {
        ...product,
        price,
        ...(imageUrl ? { imageUrl } : {}),
        ...(allImageUrls.length > 0 ? { imageUrls: allImageUrls } : {}),
      };
    });
  } catch (e) {
    console.error("Failed to fetch Shopify images:", e);
    return PRODUCTS;
  }
}

export async function getProductBySlugWithImage(slug: string): Promise<Product | undefined> {
  const products = await getProductsWithImages();
  return products.find((p) => p.slug === slug);
}
