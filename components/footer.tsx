import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        {/* Brand */}
        <div>
          <span className="font-mono text-xs tracking-[6px] text-ink uppercase">
            Akira Labs
          </span>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-ink-muted">
            Wellness and beauty, engineered for those who refuse to compromise.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-12">
          <div className="space-y-3">
            <span className="font-mono text-[8px] uppercase tracking-[2px] text-ink-faint">
              Shop
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="nav-link text-[9px]">
                Wellness
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <span className="font-mono text-[8px] uppercase tracking-[2px] text-ink-faint">
              Company
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="nav-link text-[9px]">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-line-subtle pt-6">
        <span className="font-mono text-[8px] tracking-[3px] text-ink-faint">
          &copy; {new Date().getFullYear()} AKIRA LABS
        </span>
      </div>
    </footer>
  );
}
