import { NextRequest, NextResponse } from "next/server";
import { createShopifyCart, resolveVariantId } from "@/lib/shopify";
import { getProductById } from "@/lib/products";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items }: { items: CheckoutItem[] } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Resolve Shopify variant IDs dynamically by product handle/slug
    const lines = await Promise.all(
      items.map(async (item) => {
        const product = getProductById(item.productId);
        if (!product) {
          throw new Error(`Unknown product: ${item.productId}`);
        }
        const variantId = await resolveVariantId(product.slug);
        return { merchandiseId: variantId, quantity: item.quantity };
      })
    );

    const cart = await createShopifyCart(lines);

    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
