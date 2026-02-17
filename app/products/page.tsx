import { getProductsWithImages } from "@/lib/products";
import { ProductsGrid } from "@/components/products-grid";

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProductsWithImages();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Collection
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">
          All Products
        </h1>
        <p className="mt-3 text-sm text-ink-3">
          Performance supplements engineered for discipline.
        </p>
      </div>

      <ProductsGrid products={products} />
    </div>
  );
}
