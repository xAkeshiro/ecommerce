export const metadata = {
  title: "About | Custom Store",
  description: "Learn about our custom print-on-demand store.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        About Us
      </h1>

      <div className="prose prose-gray mt-8">
        <p>
          We create unique, custom-made products that are printed and shipped on
          demand. Every item in our store is designed with care and produced only
          when you order it — reducing waste and ensuring you get something
          truly special.
        </p>

        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Browse</strong> — Explore our collection of custom designs.
          </li>
          <li>
            <strong>Order</strong> — Choose your size, color, and quantity.
          </li>
          <li>
            <strong>We Print</strong> — Your order is printed with premium
            materials.
          </li>
          <li>
            <strong>Delivered</strong> — Shipped directly to your doorstep.
          </li>
        </ol>

        <h2>Quality Promise</h2>
        <p>
          We partner with top-tier print providers to ensure every product meets
          our high standards. From the inks to the fabrics, quality is at the
          core of everything we do.
        </p>

        <h2>Sustainability</h2>
        <p>
          Print-on-demand means zero overproduction. We only create what you
          order, minimizing waste and our environmental footprint.
        </p>
      </div>
    </div>
  );
}
