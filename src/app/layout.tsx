import * as React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@jayziv/design-system-core"
import "./globals.css"

export const metadata: Metadata = {
  title: "My App",
  description: "Built with @jayziv/design-system-core",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          defaultColorTheme="default"
          defaultPreset="minimal"
          persist
          persistScope="colorMode"
          storageKey="my-app-theme" /* TODO: rename to your project slug */
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
