import { getProducts, PrintifyProduct } from "@/lib/printify";
import { ProductCard } from "@/components/product-card";

export const metadata = {
  title: "Products | Akira",
  description: "Browse our full collection of custom-made products.",
};

export default async function ProductsPage() {
  let products: PrintifyProduct[] = [];
  let hasProducts = false;

  try {
    const data = await getProducts(1, 50);
    products = data.data.filter((p) => p.visible);
    hasProducts = products.length > 0;
  } catch {
    // Printify not configured yet
  }

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
          Browse our full collection of custom-made products.
        </p>
      </div>

      {hasProducts ? (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-dashed border-line p-16 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            Products coming soon
          </p>
          <p className="mt-3 text-sm text-ink-3">
            Connect your Printify account to start displaying products. Set{" "}
            <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-ink-2">
              PRINTIFY_API_TOKEN
            </code>{" "}
            and{" "}
            <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-ink-2">
              PRINTIFY_SHOP_ID
            </code>{" "}
            in your environment variables.
          </p>
        </div>
      )}
    </div>
  );
}
