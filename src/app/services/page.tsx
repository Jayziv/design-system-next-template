// Services page — edit content below to match your client's service offerings
// Sections: Services → FAQ → CTA
//
// ServicesSection uses `title` prop (not `heading`).
// Each service requires an `id` field.

import {
  ServicesSection,
  FAQSection,
  CTABannerSection,
} from "@jayziv/design-system-core"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services we offer.", // ← Customise
}

export default function ServicesPage() {
  return (
    <main>
      {/* ← Replace title and services array with client's real offerings */}
      <ServicesSection
        label="What we do"
        title="Services tailored to your needs"
        services={[
          {
            id: "service-1",
            title: "Service One",
            description: "Describe this service and the value it delivers to clients.",
          },
          {
            id: "service-2",
            title: "Service Two",
            description: "Describe this service and the value it delivers to clients.",
          },
          {
            id: "service-3",
            title: "Service Three",
            description: "Describe this service and the value it delivers to clients.",
          },
        ]}
      />

      {/* ← Replace with real FAQs relevant to this client's business */}
      <FAQSection
        heading="Frequently asked questions"
        label="FAQ"
        items={[
          {
            question: "How long does a typical project take?",
            answer: "Project timelines vary depending on scope. Most projects are delivered within 4–8 weeks.",
          },
          {
            question: "What is your pricing model?",
            answer: "We offer fixed-price packages for common projects and hourly rates for custom work.",
          },
          {
            question: "Do you offer ongoing support?",
            answer: "Yes, we offer monthly maintenance and support packages for all completed projects.",
          },
          {
            question: "How do we get started?",
            answer: "Simply fill out our contact form or give us a call. We will respond within one business day.",
          },
        ]}
      />

      {/* ← Adjust CTA copy */}
      <CTABannerSection
        heading="Interested in working together?"
        subtext="Get in touch and we will put together a proposal tailored to your needs."
        primaryAction={{ label: "Request a quote", href: "/contact" }}
        variant="muted"
      />
    </main>
  )
}
