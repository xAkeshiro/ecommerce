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
    <Link href={`/products/${product.id}`} className="product-card group block">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-card">
        <Image
          src={image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors group-hover:text-ink">
          {product.title}
        </h3>
        <p className="font-mono text-sm text-ink-muted">
          {min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`}
        </p>
      </div>
    </Link>
  );
}
