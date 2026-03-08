/**
 * Sanity Content Adapter
 *
 * Fetches content from Sanity CMS using GROQ queries.
 * Includes ISR caching for optimal performance.
 */

import type { ContentAdapter } from "../adapter"
import type {
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "../types"
import { StaticAdapter } from "./static"

// Import client and queries lazily to avoid errors when Sanity is not installed
let sanityFetch: typeof import("../../sanity").sanityFetch
let queries: typeof import("../../sanity")

async function getClient() {
  if (!sanityFetch) {
    const module = await import("../../sanity")
    sanityFetch = module.sanityFetch
    queries = module
  }
  return { sanityFetch, queries }
}

/**
 * Sanity content adapter implementation
 */
export class SanityAdapter implements ContentAdapter {
  async getHomePageData(): Promise<HomePageData> {
    const { sanityFetch, queries } = await getClient()

    const data = await sanityFetch<{
      hero: {
        title: string
        subtitle: string
        primaryAction: { label: string; href: string }
        secondaryAction?: { label: string; href: string }
      }
      stats: {
        label: string
        variant: string
        items: Array<{ value: string; label: string }>
      }
      testimonials: {
        heading: string
        label: string
        items: Array<{
          quote: string
          name: string
          role: string
          company: string
          avatarFallback: string
        }>
      }
      cta: {
        heading: string
        subtext: string
        variant: string
        primaryAction: { label: string; href: string }
        secondaryAction?: { label: string; href: string }
      }
    }>(queries.homeQuery)

    if (!data) {
      // Fall back to static content if not found
      return new StaticAdapter().getHomePageData()
    }

    return {
      hero: {
        title: data.hero.title,
        subtitle: data.hero.subtitle,
        primaryAction: {
          label: data.hero.primaryAction.label,
          href: data.hero.primaryAction.href,
        },
        secondaryAction: data.hero.secondaryAction?.label
          ? {
              label: data.hero.secondaryAction.label,
              href: data.hero.secondaryAction.href,
            }
          : undefined,
      },
      stats: {
        label: data.stats.label,
        items: data.stats.items,
        variant: data.stats.variant as "default" | "cards" | "minimal",
      },
      testimonials: {
        heading: data.testimonials.heading,
        label: data.testimonials.label,
        items: data.testimonials.items,
      },
      cta: {
        heading: data.cta.heading,
        subtext: data.cta.subtext,
        variant: data.cta.variant as "default" | "primary" | "muted",
        primaryAction: {
          label: data.cta.primaryAction.label,
          href: data.cta.primaryAction.href,
        },
        secondaryAction: data.cta.secondaryAction?.label
          ? {
              label: data.cta.secondaryAction.label,
              href: data.cta.secondaryAction.href,
            }
          : undefined,
      },
    }
  }

  async getAboutPageData(): Promise<AboutPageData> {
    const { sanityFetch, queries } = await getClient()

    const data = await sanityFetch<{
      about: {
        title: string
        subtitle: string
        content: string
        stats: Array<{ value: string; label: string }>
      }
      stats: {
        label: string
        columns: number
        variant: string
        items: Array<{ value: string; label: string }>
      }
      team: {
        heading: string
        label: string
        columns: number
        members: Array<{
          name: string
          role: string
          bio: string
          avatarFallback: string
        }>
      }
    }>(queries.aboutQuery)

    if (!data) {
      // Fall back to static content if not found
      return new StaticAdapter().getAboutPageData()
    }

    return {
      about: {
        title: data.about.title,
        subtitle: data.about.subtitle,
        content: data.about.content,
        stats: data.about.stats,
      },
      stats: {
        label: data.stats.label,
        items: data.stats.items,
        columns: data.stats.columns as 2 | 3 | 4,
        variant: data.stats.variant as "default" | "cards" | "minimal",
      },
      team: {
        heading: data.team.heading,
        label: data.team.label,
        members: data.team.members,
        columns: data.team.columns as 2 | 3 | 4,
      },
    }
  }

  async getServicesPageData(): Promise<ServicesPageData> {
    const { sanityFetch, queries } = await getClient()

    const data = await sanityFetch<{
      services: {
        title: string
        label: string
        items: Array<{ id: string; title: string; description: string }>
      }
      faq: {
        heading: string
        label: string
        items: Array<{ question: string; answer: string }>
      }
      cta: {
        heading: string
        subtext: string
        variant: string
        primaryAction: { label: string; href: string }
        secondaryAction?: { label: string; href: string }
      }
    }>(queries.servicesQuery)

    if (!data) {
      // Fall back to static content if not found
      return new StaticAdapter().getServicesPageData()
    }

    return {
      services: {
        title: data.services.title,
        label: data.services.label,
        items: data.services.items,
      },
      faq: {
        heading: data.faq.heading,
        label: data.faq.label,
        items: data.faq.items,
      },
      cta: {
        heading: data.cta.heading,
        subtext: data.cta.subtext,
        variant: data.cta.variant as "default" | "primary" | "muted",
        primaryAction: {
          label: data.cta.primaryAction.label,
          href: data.cta.primaryAction.href,
        },
        secondaryAction: data.cta.secondaryAction?.label
          ? {
              label: data.cta.secondaryAction.label,
              href: data.cta.secondaryAction.href,
            }
          : undefined,
      },
    }
  }

  async getContactPageData(): Promise<ContactPageData> {
    const { sanityFetch, queries } = await getClient()

    const data = await sanityFetch<{
      contact: {
        title: string
        subtitle: string
        label: string
      }
      form: {
        submitLabel: string
        loadingLabel: string
        successMessage: string
        fields: {
          name: { label: string; placeholder: string }
          email: { label: string; placeholder: string }
          subject: { label: string; placeholder: string }
          message: { label: string; placeholder: string; rows: number }
        }
      }
    }>(queries.contactQuery)

    if (!data) {
      // Fall back to static content if not found
      return new StaticAdapter().getContactPageData()
    }

    return {
      contact: {
        title: data.contact.title,
        subtitle: data.contact.subtitle,
        label: data.contact.label,
      },
      form: {
        submitLabel: data.form.submitLabel,
        loadingLabel: data.form.loadingLabel,
        successMessage: data.form.successMessage,
        fields: {
          name: {
            label: data.form.fields.name.label,
            placeholder: data.form.fields.name.placeholder,
          },
          email: {
            label: data.form.fields.email.label,
            placeholder: data.form.fields.email.placeholder,
          },
          subject: {
            label: data.form.fields.subject.label,
            placeholder: data.form.fields.subject.placeholder,
          },
          message: {
            label: data.form.fields.message.label,
            placeholder: data.form.fields.message.placeholder,
            rows: data.form.fields.message.rows ?? 5,
          },
        },
      },
    }
  }

  async getSiteMetadata(): Promise<SiteMetadata> {
    const { sanityFetch, queries } = await getClient()

    const data = await sanityFetch<{
      name: string
      description: string
      locale: string
      openGraph: {
        title: string
        description: string
        siteName: string
        imageAlt: string
      }
      twitter: {
        title: string
        description: string
      }
    }>(queries.siteQuery)

    if (!data) {
      // Fall back to static content if not found
      return new StaticAdapter().getSiteMetadata()
    }

    return {
      name: data.name,
      description: data.description,
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      locale: data.locale,
      openGraph: {
        title: data.openGraph.title,
        description: data.openGraph.description,
        siteName: data.openGraph.siteName,
        imageAlt: data.openGraph.imageAlt,
      },
      twitter: {
        title: data.twitter.title,
        description: data.twitter.description,
      },
    }
  }
}
