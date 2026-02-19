"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";

export function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 animate-fade-in"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-primary) 60%, transparent)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center border border-ink-faint">
          <div className="h-2 w-2 bg-ink" />
        </div>
        <span className="font-mono text-xs tracking-[6px] text-ink uppercase">
          Akira Labs
        </span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <Link href="/products" className="nav-link hidden sm:block">
          Wellness
        </Link>
        <Link href="/about" className="nav-link hidden sm:block">
          About
        </Link>

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="nav-link">
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        {/* Cart */}
        <Link href="/cart" className="nav-link relative">
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[8px] font-mono text-page">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
