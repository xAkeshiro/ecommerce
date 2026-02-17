import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";

interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
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

    const lineItems = items.map((item) => {
      const product = getProductById(item.productId);
      const name = product ? product.name : item.name;
      const subtitle = product ? product.subtitle : "";
      const unitAmount = product ? product.price : item.price;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            description: subtitle,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
        order_items: JSON.stringify(
          items.map((i) => ({
            productId: i.productId,
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
