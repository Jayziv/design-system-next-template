// Server layout for the /contact route — provides metadata for the client page.
import * as React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us.", // ← Customise
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
