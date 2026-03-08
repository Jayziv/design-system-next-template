// Home page — content fetched from CMS adapter
// Sections: Hero → Stats → Testimonials → CTA
//
// This is a server component. Content is fetched at build time (static)
// or request time (dynamic CMS) based on CMS_PROVIDER env var.

import {
  HeroSection,
  StatsSection,
  TestimonialsSection,
  CTABannerSection,
} from "@jayziv/design-system-core"
import { getContentAdapter } from "@/lib/cms"

export default async function HomePage() {
  const adapter = getContentAdapter()
  const data = await adapter.getHomePageData()

  return (
    <main>
      <HeroSection
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        primaryAction={{
          label: data.hero.primaryAction.label,
          href: data.hero.primaryAction.href,
        }}
        secondaryAction={
          data.hero.secondaryAction
            ? {
                label: data.hero.secondaryAction.label,
                href: data.hero.secondaryAction.href,
              }
            : undefined
        }
      />

      <StatsSection
        label={data.stats.label}
        stats={data.stats.items}
        variant={data.stats.variant}
      />

      <TestimonialsSection
        heading={data.testimonials.heading}
        label={data.testimonials.label}
        testimonials={data.testimonials.items}
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
