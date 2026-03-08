/**
 * Keystatic Content Adapter
 *
 * Reads content from local JSON files managed by Keystatic CMS.
 * Content is stored in the `content/` directory.
 */

import { createReader } from "@keystatic/core/reader"
import keystaticConfig from "../../../../keystatic.config"
import type { ContentAdapter } from "../adapter"
import type {
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "../types"
import { StaticAdapter } from "./static"

// Create a reader for the Keystatic content
const reader = createReader(process.cwd(), keystaticConfig)

/**
 * Keystatic content adapter implementation
 */
export class KeystaticAdapter implements ContentAdapter {
  async getHomePageData(): Promise<HomePageData> {
    const home = await reader.singletons.home.read()

    if (!home) {
      // Fall back to static content if not found
      return new StaticAdapter().getHomePageData()
    }

    return {
      hero: {
        title: home.hero.title,
        subtitle: home.hero.subtitle,
        primaryAction: {
          label: home.hero.primaryAction.label,
          href: home.hero.primaryAction.href,
        },
        secondaryAction: home.hero.secondaryAction?.label
          ? {
              label: home.hero.secondaryAction.label,
              href: home.hero.secondaryAction.href,
            }
          : undefined,
      },
      stats: {
        label: home.stats.label,
        items: home.stats.items.map((item) => ({
          value: item.value,
          label: item.label,
        })),
        variant: home.stats.variant as "default" | "cards" | "minimal",
      },
      testimonials: {
        heading: home.testimonials.heading,
        label: home.testimonials.label,
        items: home.testimonials.items.map((item) => ({
          quote: item.quote,
          name: item.name,
          role: item.role,
          company: item.company,
          avatarFallback: item.avatarFallback,
        })),
      },
      cta: {
        heading: home.cta.heading,
        subtext: home.cta.subtext,
        variant: home.cta.variant as "default" | "primary" | "muted",
        primaryAction: {
          label: home.cta.primaryAction.label,
          href: home.cta.primaryAction.href,
        },
        secondaryAction: home.cta.secondaryAction?.label
          ? {
              label: home.cta.secondaryAction.label,
              href: home.cta.secondaryAction.href,
            }
          : undefined,
      },
    }
  }

  async getAboutPageData(): Promise<AboutPageData> {
    const about = await reader.singletons.about.read()

    if (!about) {
      // Fall back to static content if not found
      return new StaticAdapter().getAboutPageData()
    }

    return {
      about: {
        title: about.about.title,
        subtitle: about.about.subtitle,
        content: about.about.content,
        stats: about.about.stats.map((item) => ({
          value: item.value,
          label: item.label,
        })),
      },
      stats: {
        label: about.stats.label,
        items: about.stats.items.map((item) => ({
          value: item.value,
          label: item.label,
        })),
        columns: parseInt(about.stats.columns) as 2 | 3 | 4,
        variant: about.stats.variant as "default" | "cards" | "minimal",
      },
      team: {
        heading: about.team.heading,
        label: about.team.label,
        members: about.team.members.map((member) => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          avatarFallback: member.avatarFallback,
        })),
        columns: parseInt(about.team.columns) as 2 | 3 | 4,
      },
    }
  }

  async getServicesPageData(): Promise<ServicesPageData> {
    const services = await reader.singletons.services.read()

    if (!services) {
      // Fall back to static content if not found
      return new StaticAdapter().getServicesPageData()
    }

    return {
      services: {
        title: services.services.title,
        label: services.services.label,
        items: services.services.items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
        })),
      },
      faq: {
        heading: services.faq.heading,
        label: services.faq.label,
        items: services.faq.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      },
      cta: {
        heading: services.cta.heading,
        subtext: services.cta.subtext,
        variant: services.cta.variant as "default" | "primary" | "muted",
        primaryAction: {
          label: services.cta.primaryAction.label,
          href: services.cta.primaryAction.href,
        },
        secondaryAction: services.cta.secondaryAction?.label
          ? {
              label: services.cta.secondaryAction.label,
              href: services.cta.secondaryAction.href,
            }
          : undefined,
      },
    }
  }

  async getContactPageData(): Promise<ContactPageData> {
    const contact = await reader.singletons.contact.read()

    if (!contact) {
      // Fall back to static content if not found
      return new StaticAdapter().getContactPageData()
    }

    return {
      contact: {
        title: contact.contact.title,
        subtitle: contact.contact.subtitle,
        label: contact.contact.label,
      },
      form: {
        submitLabel: contact.form.submitLabel,
        loadingLabel: contact.form.loadingLabel,
        successMessage: contact.form.successMessage,
        fields: {
          name: {
            label: contact.form.fields.name.label,
            placeholder: contact.form.fields.name.placeholder,
          },
          email: {
            label: contact.form.fields.email.label,
            placeholder: contact.form.fields.email.placeholder,
          },
          subject: {
            label: contact.form.fields.subject.label,
            placeholder: contact.form.fields.subject.placeholder,
          },
          message: {
            label: contact.form.fields.message.label,
            placeholder: contact.form.fields.message.placeholder,
            rows: contact.form.fields.message.rows ?? 5,
          },
        },
      },
    }
  }

  async getSiteMetadata(): Promise<SiteMetadata> {
    const site = await reader.singletons.site.read()

    if (!site) {
      // Fall back to static content if not found
      return new StaticAdapter().getSiteMetadata()
    }

    return {
      name: site.name,
      description: site.description,
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      locale: site.locale,
      openGraph: {
        title: site.openGraph.title,
        description: site.openGraph.description,
        siteName: site.openGraph.siteName,
        imageAlt: site.openGraph.imageAlt,
      },
      twitter: {
        title: site.twitter.title,
        description: site.twitter.description,
      },
    }
  }
}
