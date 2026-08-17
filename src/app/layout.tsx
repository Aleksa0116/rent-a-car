import type { Metadata, Viewport } from "next";
// Inter is now self-hosted via @fontsource-variable/inter (imported in globals.css)
// This eliminates the Google Fonts network call that caused repeated build warnings.
import "./globals.css";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppFAB from "@/components/shared/WhatsAppFAB";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  logo: `${siteConfig.url}/logo.png`,
  image: `${siteConfig.url}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bulevar Kralja Aleksandra 1",
    addressLocality: "Beograd",
    postalCode: "11000",
    addressCountry: "RS",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8178,
    longitude: 20.4612,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "2400",
  },
  priceRange: "€28 – €180 dnevno",
  currenciesAccepted: "EUR, RSD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  areaServed: {
    "@type": "Country",
    name: "Srbija",
  },
  sameAs: [siteConfig.socialLinks.instagram, siteConfig.socialLinks.facebook],
};


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "rent a car Beograd",
    "iznajmljivanje automobila Beograd",
    "AleRak Rent",
    "povoljno iznajmljivanje vozila",
    "jeftino rent a car",
    "luksuzna vozila Beograd",
    "SUV iznajmljivanje",
    "rent a car WhatsApp",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,

  /*
   * PWA / home-screen experience
   * ────────────────────────────
   * `capable`        → removes Safari's URL bar when launched from home screen
   * `title`          → label shown below the icon on the iOS home screen
   * `statusBarStyle` → "default" = white bar with dark text (matches our Navbar)
   *
   * Next.js injects these as:
   *   <meta name="apple-mobile-web-app-capable" content="yes">
   *   <meta name="apple-mobile-web-app-title" content="AleRak Rent">
   *   <meta name="apple-mobile-web-app-status-bar-style" content="default">
   */
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },

  openGraph: {
    type: "website",
    locale: "sr_RS",
    alternateLocale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Premium Rent-a-Car`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  /*
   * Icons and manifest are intentionally omitted here.
   * Next.js file conventions handle them automatically:
   *   • src/app/icon.tsx       → <link rel="icon">
   *   • src/app/apple-icon.tsx → <link rel="apple-touch-icon">
   *   • src/app/manifest.ts    → <link rel="manifest">
   */
};

export const viewport: Viewport = {
  /*
   * theme-color — must match the Navbar background (#ffffff = clean white).
   *
   * In regular browser mode: colours the browser's address bar / tabs so the
   * UI blends with our header.
   * In standalone PWA mode:  colours the system status bar so it reads as
   * a seamless extension of our Navbar (no visible chrome boundary).
   *
   * Both media variants are declared so the correct colour applies
   * regardless of the OS's appearance preference (we are always light).
   */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#ffffff" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#18181b] antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
