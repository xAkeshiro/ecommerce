import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <p className="font-mono text-8xl font-light text-ink-faint">404</p>
        <p className="mt-4 text-sm text-ink-3">Page not found.</p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Go Home
        </Link>
      </div>
    </div>
  );
}
