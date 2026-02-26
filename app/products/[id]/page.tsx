import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getProductsWithImages } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export const revalidate = 60;

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.id);
  if (!product) {
    return { title: "Product Not Found | AKIRA LABS" };
  }
  return {
    title: `${product.name} — ${product.subtitle} | AKIRA LABS`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const allProducts = await getProductsWithImages();
  const product = allProducts.find((p) => p.slug === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ProductDetail product={product} allProducts={allProducts} />
    </div>
  );
}
