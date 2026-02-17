import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";
import { ProductVisual } from "@/components/product-visual";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card group block">
      <div className="product-img-wrap relative aspect-square overflow-hidden rounded-sm border border-line bg-card transition-colors">
        <ProductVisual image={product.image} name={product.name} subtitle={product.subtitle} />
        {product.badge && (
          <span className="badge absolute left-3 top-3">
            {product.badge}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 font-mono text-[8px] tracking-[2px] text-ink-2 opacity-50"
        >
          {product.tagline}
        </span>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors group-hover:text-ink">
          {product.name}
        </h3>
        <p className="text-[11px] text-ink-muted">{product.subtitle}</p>
        <p className="font-mono text-sm text-ink-muted">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
