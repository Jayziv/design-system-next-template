// Services page — content fetched from CMS adapter
// Sections: Services → FAQ → CTA
//
// This is a server component. Content is fetched at build time (static)
// or request time (dynamic CMS) based on CMS_PROVIDER env var.

import {
  ServicesSection,
  FAQSection,
  CTABannerSection,
} from "@jayziv/design-system-core"
import type { Metadata } from "next"
import { getContentAdapter } from "@/lib/cms"

export const metadata: Metadata = {
  title: "Services",
  description: "Custom websites, redesigns, SEO, and ongoing support. Everything you need to get online and grow, from a Leeds-based studio.",
}

export default async function ServicesPage() {
  const adapter = getContentAdapter()
  const data = await adapter.getServicesPageData()

  return (
    <main>
      <ServicesSection
        label={data.services.label}
        title={data.services.title}
        services={data.services.items}
      />

      <FAQSection
        heading={data.faq.heading}
        label={data.faq.label}
        items={data.faq.items}
      />

      <CTABannerSection
        heading={data.cta.heading}
        subtext={data.cta.subtext}
        primaryAction={{
          label: data.cta.primaryAction.label,
          href: data.cta.primaryAction.href,
        }}
        secondaryAction={
          data.cta.secondaryAction
            ? {
                label: data.cta.secondaryAction.label,
                href: data.cta.secondaryAction.href,
              }
            : undefined
        }
        variant={data.cta.variant}
      />
    </main>
  )
}
