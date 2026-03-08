/**
 * CMS Type Definitions
 *
 * Shared TypeScript interfaces for content data structures.
 * These types are used by all CMS adapters (static, keystatic, sanity)
 * to ensure consistent data shapes across providers.
 */

// =============================================================================
// Reusable Content Types
// =============================================================================

/**
 * A single statistic for display in StatsSection or AboutSection
 */
export interface Stat {
  value: string
  label: string
}

/**
 * A testimonial quote with attribution
 */
export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatarUrl?: string
  avatarFallback: string
}

/**
 * A team member profile
 */
export interface TeamMember {
  name: string
  role: string
  bio: string
  avatarUrl?: string
  avatarFallback: string
}

/**
 * A service offering
 */
export interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

/**
 * A FAQ item
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * A CTA action — either href (link) or onClick (callback)
 * Adapters should prefer href for server components;
 * client components can use onClick
 */
export interface CTAAction {
  label: string
  href?: string
}

// =============================================================================
// Page Content Types
// =============================================================================

/**
 * Home page content
 */
export interface HomePageData {
  hero: {
    title: string
    subtitle: string
    primaryAction: CTAAction
    secondaryAction?: CTAAction
  }
  stats: {
    label: string
    items: Stat[]
    variant?: "default" | "cards" | "minimal"
    columns?: 2 | 3 | 4
  }
  testimonials: {
    heading: string
    label: string
    items: Testimonial[]
  }
  cta: {
    heading: string
    subtext: string
    primaryAction: CTAAction
    secondaryAction?: CTAAction
    variant?: "default" | "primary" | "muted"
  }
}

/**
 * About page content
 */
export interface AboutPageData {
  about: {
    title: string
    subtitle: string
    content: string
    stats: Stat[]
  }
  stats: {
    label: string
    items: Stat[]
    columns?: 2 | 3 | 4
    variant?: "default" | "cards" | "minimal"
  }
  team: {
    heading: string
    label: string
    members: TeamMember[]
    columns?: 2 | 3 | 4
  }
}

/**
 * Services page content
 */
export interface ServicesPageData {
  services: {
    title: string
    label: string
    items: Service[]
  }
  faq: {
    heading: string
    label: string
    items: FAQItem[]
  }
  cta: {
    heading: string
    subtext: string
    primaryAction: CTAAction
    secondaryAction?: CTAAction
    variant?: "default" | "primary" | "muted"
  }
}

/**
 * Contact page content
 */
export interface ContactPageData {
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
}

/**
 * Global site metadata
 */
export interface SiteMetadata {
  name: string
  description: string
  url: string
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
}
