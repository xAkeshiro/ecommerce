"use client";

import { useState } from "react";
import Link from "next/link";

function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line-subtle">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-sm text-ink-2 pr-4">{question}</span>
        <span className="shrink-0 font-mono text-sm text-ink-muted">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-ink-3">{answer}</p>
      )}
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    id: "orders-shipping",
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does order processing take?",
        answer:
          "Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking information once your order ships.",
      },
      {
        question: "What shipping methods are available?",
        answer:
          "We offer standard shipping (5-7 business days) and express shipping (2-3 business days) within the United States. Free standard shipping on orders over $100.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship within the United States only. International shipping is planned for the near future. Sign up for our newsletter to be notified when we expand.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive an email with a tracking number and link. You can also track your order through the Shopify checkout confirmation page.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      {
        question: "Where are your ingredients sourced?",
        answer:
          "We source ingredients from certified suppliers in the US, Europe, and Japan. Every raw material is vetted for purity and potency before entering production.",
      },
      {
        question: "Are your products third-party tested?",
        answer:
          "Yes. Every batch of every product is independently tested by accredited labs for purity, potency, heavy metals, and microbial contamination. Certificates of analysis are available upon request.",
      },
      {
        question: "Do your products contain any major allergens?",
        answer:
          "COMPOUND (Whey Isolate) contains milk. All products are manufactured in facilities that may also process milk, soy, eggs, tree nuts, and wheat. Each product page lists specific allergen information.",
      },
      {
        question: "How should I store my supplements?",
        answer:
          "Store in a cool, dry place away from direct sunlight. Keep containers tightly sealed. No refrigeration required unless otherwise specified on the label.",
      },
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    items: [
      {
        question: "How does Subscribe & Save work?",
        answer:
          "Select the Subscribe & Save option on any product page to save 15% on every order. Choose your delivery frequency (every 30, 60, or 90 days) and we'll automatically ship your supplements on schedule.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes. You can cancel, pause, or modify your subscription at any time through your account dashboard or by contacting our support team. No commitments, no cancellation fees.",
      },
      {
        question: "Can I change my delivery frequency?",
        answer:
          "Absolutely. Log into your account to adjust your delivery schedule at any time. Changes take effect on your next upcoming order.",
      },
      {
        question: "What if a product is out of stock for my subscription?",
        answer:
          "If a product is temporarily unavailable, we'll notify you in advance and skip that shipment. You won't be charged until the product is back in stock and ships.",
      },
    ],
  },
  {
    id: "returns-refunds",
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee on your first order of any product. If you're not satisfied, contact us within 30 days of delivery for a full refund.",
      },
      {
        question: "What condition does the product need to be in?",
        answer:
          "Products can be opened and partially used — we want you to actually try them. Simply contact us with your order number and reason for the return.",
      },
      {
        question: "How long do refunds take to process?",
        answer:
          "Refunds are processed within 3-5 business days of approval. Depending on your bank, it may take an additional 5-10 business days to appear on your statement.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Support
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          Everything you need to know about our products and policies.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {FAQ_SECTIONS.map((section, sIndex) => (
          <div
            key={section.id}
            id={section.id}
            className="animate-fade-up"
            style={{ animationDelay: `${sIndex * 0.1}s` }}
          >
            <h2 className="font-mono text-xs uppercase tracking-[3px] text-ink-faint">
              {section.title}
            </h2>
            <div className="mt-4 border-t border-line">
              {section.items.map((item, i) => (
                <Accordion
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-10 text-center">
        <p className="text-sm text-ink-3">Still have questions?</p>
        <Link href="/about" className="btn-outline mt-4 inline-flex">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
