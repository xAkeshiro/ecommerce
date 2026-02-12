export const metadata = {
  title: "About | Akira",
  description: "Learn about Akira, our custom print-on-demand store.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">
        About Akira
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-zinc-400">
        <p>
          We create unique, custom-made products that are printed and shipped on
          demand. Every item in our store is designed with care and produced only
          when you order it — reducing waste and ensuring you get something
          truly special.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">How It Works</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <strong className="text-gray-900 dark:text-zinc-100">Browse</strong> — Explore our collection of custom designs.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-zinc-100">Order</strong> — Choose your size, color, and quantity.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-zinc-100">We Print</strong> — Your order is printed with premium
            materials.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-zinc-100">Delivered</strong> — Shipped directly to your doorstep.
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Quality Promise</h2>
        <p>
          We partner with top-tier print providers to ensure every product meets
          our high standards. From the inks to the fabrics, quality is at the
          core of everything we do.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Sustainability</h2>
        <p>
          Print-on-demand means zero overproduction. We only create what you
          order, minimizing waste and our environmental footprint.
        </p>
      </div>
    </div>
  );
}
