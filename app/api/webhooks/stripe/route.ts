import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrder, PrintifyOrderLineItem, PrintifyOrderAddress } from "@/lib/printify";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const printifyItems: PrintifyOrderLineItem[] = JSON.parse(
        session.metadata?.printify_items || "[]"
      );
      const address: PrintifyOrderAddress = JSON.parse(
        session.metadata?.shipping_address || "{}"
      );

      if (printifyItems.length > 0 && address.email) {
        await createOrder(printifyItems, address);
        console.log("Printify order created for session:", session.id);
      }
    } catch (err) {
      console.error("Failed to create Printify order:", err);
      // Don't return error — Stripe would retry the webhook
    }
  }

  return NextResponse.json({ received: true });
}
