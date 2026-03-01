import * as React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@jayziv/design-system-core"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "My App",        // ← Replace with client site name
    template: "%s | My App",  // ← Page title prefix pattern (e.g. "About | Acme")
  },
  description: "Replace with your site description (155 chars max)", // ← Customise
  openGraph: {
    title: "My App",          // ← Replace with client site name
    description: "Replace with your site description", // ← Customise
    url: "/",
    siteName: "My App",       // ← Replace with client site name
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "My App",        // ← Replace with client site name
      },
    ],
    locale: "en_US",          // ← Adjust locale if needed
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My App",          // ← Replace with client site name
    description: "Replace with your site description", // ← Customise
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
    <html lang="en" suppressHydrationWarning>
      <body>
        {/*
          ThemeProvider in consumer apps manages colorMode (light/dark) only.
          The color palette and structural preset are baked into src/themes/active.css
          at project setup time — use `pnpm generate:theme` in the design system repo
          to re-export a different palette and paste it into src/themes/active.css
        */}
        <ThemeProvider
          storageKey="theme"
          defaultColorMode="light"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
