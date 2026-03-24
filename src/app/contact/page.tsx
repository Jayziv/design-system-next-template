// Contact page — content fetched from CMS adapter
// This is a server component that passes data to a client-side form.
//
// The form is a separate client component for interactivity.
// See components/contact-form.tsx for the form implementation.

import { ContactSection } from "@jayziv/design-system-core"
import type { Metadata } from "next"
import { getContentAdapter } from "@/lib/cms"
import { ContactForm } from "./components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free 30-minute discovery call or send us a message. We respond within one business day.",
}

export default async function ContactPage() {
  const adapter = getContentAdapter()
  const data = await adapter.getContactPageData()

  return (
    <main>
      <ContactSection
        title={data.contact.title}
        subtitle={data.contact.subtitle}
        label={data.contact.label}
      >
        <ContactForm formData={data.form} />
      </ContactSection>
    </main>
  )
}
