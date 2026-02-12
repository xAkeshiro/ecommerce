import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Akira | Custom Print-on-Demand",
  description:
    "Shop unique custom-made products at Akira. High-quality print-on-demand apparel, accessories, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CartProvider>
            <div className="grain-overlay" />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <div className="scroll-line" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
