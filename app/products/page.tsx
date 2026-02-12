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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        All Products
      </h1>
      <p className="mt-2 text-gray-600 dark:text-zinc-400">
        Browse our full collection of custom-made products.
      </p>

      {hasProducts ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-zinc-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100">
            Products coming soon
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
            Connect your Printify account to start displaying products. Set{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              PRINTIFY_API_TOKEN
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              PRINTIFY_SHOP_ID
            </code>{" "}
            in your environment variables.
          </p>
        </div>
      )}
    </div>
  );
}
