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
  title: "Faeble Studio — We craft digital moments",
  description: "Full-service development and design studio for startups and scale-ups.",
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
