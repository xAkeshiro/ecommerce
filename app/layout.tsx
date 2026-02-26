import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { BackToTop } from "@/components/back-to-top";

export const metadata: Metadata = {
  title: "AKIRA LABS — Performance Meets Ritual",
  description:
    "Clinical-dose supplements engineered for those who refuse to compromise. Wellness, stripped to what works.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CartProvider>
            <div className="grain-overlay" />
            <AnnouncementBar />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <BackToTop />
            <div className="scroll-line" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
