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
          images(first: 1) {
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

// ── Variant Map ─────────────────────────────────────────────────────────────
// Maps static product IDs ("1"–"8") to Shopify variant GIDs.
// Replace these placeholders with real IDs from your Shopify admin.

export const PRODUCT_VARIANT_MAP: Record<string, string> = {
  "1": "gid://shopify/ProductVariant/SIGNAL_VARIANT_ID",
  "2": "gid://shopify/ProductVariant/COMPOUND_VARIANT_ID",
  "3": "gid://shopify/ProductVariant/ELEMENT_VARIANT_ID",
  "4": "gid://shopify/ProductVariant/PROTOCOL_WHEY_VARIANT_ID",
  "5": "gid://shopify/ProductVariant/PROTOCOL_PLANT_VARIANT_ID",
  "6": "gid://shopify/ProductVariant/BASELINE_VARIANT_ID",
  "7": "gid://shopify/ProductVariant/CLARITY_VARIANT_ID",
  "8": "gid://shopify/ProductVariant/DRIFT_VARIANT_ID",
};

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
