import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct, formatPrice } from "@/lib/printify";

interface CheckoutItem {
  product_id: string;
  variant_id: number;
  quantity: number;
}

interface CheckoutAddress {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, address }: { items: CheckoutItem[]; address: CheckoutAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Build Stripe line items from Printify products
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await getProduct(item.product_id);
        const variant = product.variants.find((v) => v.id === item.variant_id);

        if (!variant) {
          throw new Error(`Variant ${item.variant_id} not found`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: variant.title,
              images: product.images
                .filter((img) => img.is_default)
                .map((img) => img.src)
                .slice(0, 1),
            },
            unit_amount: variant.price,
          },
          quantity: item.quantity,
        };
      })
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: address.email,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR"],
      },
      metadata: {
        printify_items: JSON.stringify(
          items.map((i) => ({
            product_id: i.product_id,
            variant_id: i.variant_id,
            quantity: i.quantity,
          }))
        ),
        shipping_address: JSON.stringify(address),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
