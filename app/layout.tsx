import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AKIRA LABS — Engineered for Discipline",
  description:
    "Performance supplements engineered for discipline. Clinical doses. Zero filler. Tokyo-based.",
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
