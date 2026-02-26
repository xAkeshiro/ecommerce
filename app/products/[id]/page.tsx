import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getProductsWithImages, formatPrice } from "@/lib/products";
import { PRODUCT_EXTENDED } from "@/lib/product-data";
import { ProductDetail } from "@/components/product-detail";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akiralabs.com";

export const revalidate = 60;

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.id);
  if (!product) {
    return { title: "Product Not Found | AKIRA LABS" };
  }

  const title = `${product.name} — ${product.subtitle} | AKIRA LABS`;
  const description = product.description.slice(0, 160);
  const url = `${siteUrl}/products/${product.slug}`;
  const imageUrl = product.imageUrl || `${siteUrl}/images/hero-scene.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, alt: `${product.name} — ${product.subtitle}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

function ProductJsonLd({ product }: { product: (typeof PRODUCTS)[number] }) {
  const ext = PRODUCT_EXTENDED[product.id];
  const avgRating = ext
    ? ext.reviews.reduce((sum, r) => sum + r.rating, 0) / ext.reviews.length
    : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${siteUrl}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "AKIRA LABS",
    },
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  if (ext && avgRating) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: ext.reviews.length,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }: Props) {
  const allProducts = await getProductsWithImages();
  const product = allProducts.find((p) => p.slug === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ProductJsonLd product={product} />
      <ProductDetail product={product} allProducts={allProducts} />
    </div>
  );
}
