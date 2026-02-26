import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <div className="flex h-20 w-20 mx-auto items-center justify-center border border-ink-faint">
          <div className="h-6 w-6 bg-ink" />
        </div>
        <p className="mt-8 font-mono text-6xl font-light tracking-tight text-ink-faint">
          404
        </p>
        <h1 className="mt-4 font-mono text-xs uppercase tracking-[3px] text-ink-2">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm text-ink-3">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/products" className="btn-outline">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
