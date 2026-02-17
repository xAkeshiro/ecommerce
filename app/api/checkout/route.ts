import { NextRequest, NextResponse } from "next/server";
import { createShopifyCart, PRODUCT_VARIANT_MAP } from "@/lib/shopify";

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

    const lines = items.map((item) => {
      const variantId = PRODUCT_VARIANT_MAP[item.productId];
      if (!variantId) {
        throw new Error(`Unknown product: ${item.productId}`);
      }
      return { merchandiseId: variantId, quantity: item.quantity };
    });

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
