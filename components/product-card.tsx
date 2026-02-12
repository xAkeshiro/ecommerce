import Image from "next/image";
import Link from "next/link";
import {
  PrintifyProduct,
  getDefaultImage,
  getPriceRange,
  formatPrice,
} from "@/lib/printify";

interface ProductCardProps {
  product: PrintifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = getDefaultImage(product);
  const { min, max } = getPriceRange(product);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
        <Image
          src={image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-akira-600 dark:text-zinc-100 dark:group-hover:text-akira-500">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
          {min === max ? formatPrice(min) : `${formatPrice(min)} - ${formatPrice(max)}`}
        </p>
      </div>
    </Link>
  );
}
