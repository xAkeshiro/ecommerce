import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-akira-600">
              Akira
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-zinc-400">
              Unique custom-made products, printed and shipped on demand.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-zinc-100">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-zinc-100">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Akira. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
