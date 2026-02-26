// Shopify Storefront API client for headless checkout

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

// ── Generic fetch ───────────────────────────────────────────────────────────

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }

  return json.data as T;
}

// ── Types ───────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: { url: string; altText: string | null } }[];
  };
  variants: {
    edges: { node: { id: string; title: string; availableForSale: boolean } }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: { id: string; title: string };
      };
    }[];
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

// ── GraphQL Queries ─────────────────────────────────────────────────────────

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
          }
        }
      }
    }
  }
`;

// ── GraphQL Mutations ───────────────────────────────────────────────────────

const CREATE_CART_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ── Dynamic Variant Resolution ──────────────────────────────────────────────
// Fetches all Shopify products once, then matches by handle or title.
// Caches the result so subsequent calls in the same request don't re-fetch.

let cachedProducts: ShopifyProduct[] | null = null;

async function getAllShopifyProducts(): Promise<ShopifyProduct[]> {
  if (cachedProducts) return cachedProducts;
  cachedProducts = await getProducts(50);
  return cachedProducts;
}

export async function resolveVariantId(slug: string, name: string): Promise<string> {
  const products = await getAllShopifyProducts();
  const lower = slug.toLowerCase();
  const nameLower = name.toLowerCase();

  // 1. Exact handle match
  let product = products.find((p) => p.handle === lower);

  // 2. Handle contains our slug (e.g. "compound-whey-isolate" contains "compound")
  if (!product) {
    product = products.find((p) => p.handle.includes(lower));
  }

  // 3. Title match (case-insensitive)
  if (!product) {
    product = products.find((p) => p.title.toLowerCase().includes(nameLower));
  }

  // 4. Our name contained in their handle
  if (!product) {
    product = products.find((p) => p.handle.includes(nameLower));
  }

  if (!product) {
    const available = products.map((p) => `"${p.handle}" (${p.title})`).join(", ");
    throw new Error(
      `No Shopify product matched slug="${slug}" or name="${name}". Available: ${available}`
    );
  }

  const variant =
    product.variants.edges.find((e) => e.node.availableForSale)?.node ??
    product.variants.edges[0]?.node;
  if (!variant) {
    throw new Error(`No variants available for: ${product.title}`);
  }
  return variant.id;
}

// ── Exported Functions ──────────────────────────────────────────────────────

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(PRODUCTS_QUERY, { first });

  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });

  return data.productByHandle;
}

export async function createShopifyCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CREATE_CART_MUTATION, { lines });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join(", ")
    );
  }

  return data.cartCreate.cart;
}
