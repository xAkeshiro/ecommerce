import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-line px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
      <span className="font-mono text-[9px] tracking-[4px] text-ink-faint">
        &copy; {new Date().getFullYear()} AKIRA LABS
      </span>
      <div className="flex gap-6">
        <Link href="/products" className="nav-link text-[9px]">
          Shop
        </Link>
        <Link href="/about" className="nav-link text-[9px]">
          About
        </Link>
      </div>
    </footer>
  );
}
