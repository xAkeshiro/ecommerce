const PRINTIFY_API_URL = "https://api.printify.com/v1";

function getHeaders(): HeadersInit {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) {
    throw new Error("PRINTIFY_API_TOKEN is not set");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function getShopId(): string {
  const shopId = process.env.PRINTIFY_SHOP_ID;
  if (!shopId) {
    throw new Error("PRINTIFY_SHOP_ID is not set");
  }
  return shopId;
}

// ---------- Types ----------

export interface PrintifyImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
}

export interface PrintifyVariant {
  id: number;
  title: string;
  sku: string;
  cost: number;
  price: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  options: number[];
  quantity: number;
}

export interface PrintifyOption {
  name: string;
  type: string;
  values: { id: number; title: string }[];
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: PrintifyOption[];
  variants: PrintifyVariant[];
  images: PrintifyImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: unknown[];
  sales_channel_properties: unknown[];
}

export interface PrintifyProductListResponse {
  current_page: number;
  data: PrintifyProduct[];
  last_page: number;
  total: number;
}

export interface PrintifyOrderLineItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

export interface PrintifyOrderAddress {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface PrintifyOrder {
  id: string;
  status: string;
  total_price: number;
  total_shipping: number;
  created_at: string;
  line_items: PrintifyOrderLineItem[];
  address_to: PrintifyOrderAddress;
}

// ---------- API Functions ----------

export async function getProducts(
  page = 1,
  limit = 20
): Promise<PrintifyProductListResponse> {
  const shopId = getShopId();
  const res = await fetch(
    `${PRINTIFY_API_URL}/shops/${shopId}/products.json?page=${page}&limit=${limit}`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProduct(productId: string): Promise<PrintifyProduct> {
  const shopId = getShopId();
  const res = await fetch(
    `${PRINTIFY_API_URL}/shops/${shopId}/products/${productId}.json`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function createOrder(
  lineItems: PrintifyOrderLineItem[],
  address: PrintifyOrderAddress
): Promise<PrintifyOrder> {
  const shopId = getShopId();
  const res = await fetch(
    `${PRINTIFY_API_URL}/shops/${shopId}/orders.json`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        external_id: `order-${Date.now()}`,
        label: "Web Store Order",
        line_items: lineItems,
        shipping_method: 1,
        send_shipping_notification: true,
        address_to: address,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create order: ${res.status} ${error}`);
  }

  return res.json();
}

export async function getShippingCost(
  lineItems: PrintifyOrderLineItem[],
  address: Pick<PrintifyOrderAddress, "country" | "region" | "zip">
): Promise<{ standard: number; express?: number }> {
  const shopId = getShopId();
  const res = await fetch(
    `${PRINTIFY_API_URL}/shops/${shopId}/orders/shipping.json`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        line_items: lineItems,
        address_to: address,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get shipping cost: ${res.status}`);
  }

  return res.json();
}

// ---------- Helpers ----------

export function getDefaultImage(product: PrintifyProduct): string {
  const defaultImg = product.images.find((img) => img.is_default);
  return defaultImg?.src ?? product.images[0]?.src ?? "/placeholder.png";
}

export function getEnabledVariants(product: PrintifyProduct): PrintifyVariant[] {
  return product.variants.filter((v) => v.is_enabled && v.is_available);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getPriceRange(product: PrintifyProduct): {
  min: number;
  max: number;
} {
  const enabledVariants = getEnabledVariants(product);
  if (enabledVariants.length === 0) {
    return { min: 0, max: 0 };
  }
  const prices = enabledVariants.map((v) => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
