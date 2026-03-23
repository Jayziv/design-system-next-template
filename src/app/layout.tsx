import * as React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Outfit } from "next/font/google"
import { ThemeProvider } from "@jayziv/design-system-core"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Faeble Studio — Web Design & Development in Leeds, UK",
  description:
    "Custom websites for UK businesses. Fast, accessible, SEO-optimised sites built with React & Next.js by a Leeds studio with 7+ years experience. Free discovery call.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.faeblestudio.com"
  ),
  openGraph: {
    title: "Faeble Studio — Web Design & Development in Leeds, UK",
    description:
      "Custom websites for UK businesses. Fast, accessible, SEO-optimised sites built with React & Next.js. Free discovery call.",
    url: "/",
    siteName: "Faeble Studio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faeble Studio — Web Design & Development in Leeds",
    description:
      "Custom websites for UK businesses. Fast, accessible, SEO-optimised. Free discovery call.",
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Faeble Studio",
              description:
                "Custom websites for UK businesses. Fast, accessible, SEO-optimised sites built with React & Next.js.",
              url: "https://www.faeblestudio.com",
              areaServed: {
                "@type": "Country",
                name: "United Kingdom",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Leeds",
                addressCountry: "GB",
              },
              serviceType: [
                "Web Design",
                "Web Development",
                "SEO",
                "Website Maintenance",
              ],
              priceRange: "$$",
            }),
          }}
        />
        <ThemeProvider
          defaultColorTheme="default"
          defaultPreset="bold"
          defaultColorMode="dark"
          persist
          persistScope="colorMode"
          storageKey="faeble-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
