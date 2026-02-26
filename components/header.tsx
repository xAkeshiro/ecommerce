"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";
import { SearchOverlay } from "@/components/search-overlay";
import { AnnouncementBar } from "@/components/announcement-bar";

export function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const pathname = usePathname();

  const handleAnnouncementChange = useCallback((visible: boolean) => {
    setAnnouncementVisible(visible);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar onVisibilityChange={handleAnnouncementChange} />
      <nav
        className="fixed left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 animate-fade-in transition-[top] duration-300"
        style={{
          top: announcementVisible ? "36px" : "0px",
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
          <Link href="/faq" className="nav-link hidden sm:block">
            FAQ
          </Link>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="nav-link"
            aria-label="Search"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          {/* Theme toggle — hidden on mobile (available in mobile menu) */}
          <button onClick={toggleTheme} className="nav-link hidden sm:block">
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

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="nav-link sm:hidden"
            aria-label="Open menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-page border-l border-line animate-slide-in flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[4px] text-ink-muted">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="nav-link"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 px-6 py-8">
              <div className="space-y-0 border-t border-line">
                {[
                  { href: "/products", label: "Wellness" },
                  { href: "/about", label: "About" },
                  { href: "/faq", label: "FAQ" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between border-b border-line py-5 font-mono text-sm uppercase tracking-[3px] text-ink transition-colors hover:text-ink-2"
                  >
                    {link.label}
                    <span className="text-ink-faint">&rarr;</span>
                  </Link>
                ))}
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="mt-8 flex w-full items-center justify-between border border-line px-5 py-4 font-mono text-[10px] uppercase tracking-[2px] text-ink-2 transition-colors hover:text-ink"
              >
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                <span className="text-ink-faint">
                  {theme === "dark" ? "☀" : "●"}
                </span>
              </button>
            </div>

            {/* Footer branding */}
            <div className="border-t border-line px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center border border-ink-faint">
                  <div className="h-1.5 w-1.5 bg-ink" />
                </div>
                <span className="font-mono text-[9px] tracking-[4px] text-ink-muted uppercase">
                  Akira Labs
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
