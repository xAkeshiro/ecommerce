import { notFound } from "next/navigation";
import {
  getProduct,
  getEnabledVariants,
  getDefaultImage,
  formatPrice,
} from "@/lib/printify";
import { ProductDetail } from "@/components/product-detail";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.title} | Custom Store`,
      description: product.description.replace(/<[^>]*>/g, "").slice(0, 160),
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }: Props) {
  let product;
  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  const variants = getEnabledVariants(product);
  const defaultImage = getDefaultImage(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductDetail
        product={{
          id: product.id,
          title: product.title,
          description: product.description,
          images: product.images.map((img) => img.src),
          options: product.options,
          variants: variants.map((v) => ({
            id: v.id,
            title: v.title,
            price: v.price,
            options: v.options,
            is_available: v.is_available,
          })),
          defaultImage,
        }}
      />
    </div>
  );
}
