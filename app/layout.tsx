import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { SplashScreen } from "@/components/splash-screen";
import { PageTransition } from "@/components/page-transition";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akiralabs.com";

export const metadata: Metadata = {
  title: "AKIRA LABS — Performance Meets Ritual",
  description:
    "Clinical-dose supplements engineered for those who refuse to compromise. Wellness, stripped to what works.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "AKIRA LABS — Performance Meets Ritual",
    description:
      "Clinical-dose supplements engineered for those who refuse to compromise. Wellness, stripped to what works.",
    url: siteUrl,
    siteName: "AKIRA LABS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKIRA LABS — Performance Meets Ritual",
    description:
      "Clinical-dose supplements engineered for those who refuse to compromise.",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AKIRA LABS",
    url: siteUrl,
    description:
      "Clinical-dose supplements engineered for those who refuse to compromise.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <SplashScreen />
            <div className="grain-overlay" />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
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
