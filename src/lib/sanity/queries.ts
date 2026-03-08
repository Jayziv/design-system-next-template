/**
 * Sanity GROQ Queries
 *
 * All GROQ queries for fetching page content.
 */

export const homeQuery = `*[_type == "home"][0]{
  hero {
    title,
    subtitle,
    primaryAction { label, href },
    secondaryAction { label, href }
  },
  stats {
    label,
    variant,
    items[] { value, label }
  },
  testimonials {
    heading,
    label,
    items[] { quote, name, role, company, avatarFallback }
  },
  cta {
    heading,
    subtext,
    variant,
    primaryAction { label, href },
    secondaryAction { label, href }
  }
}`

export const aboutQuery = `*[_type == "about"][0]{
  about {
    title,
    subtitle,
    content,
    stats[] { value, label }
  },
  stats {
    label,
    columns,
    variant,
    items[] { value, label }
  },
  team {
    heading,
    label,
    columns,
    members[] { name, role, bio, avatarFallback }
  }
}`

export const servicesQuery = `*[_type == "services"][0]{
  services {
    title,
    label,
    items[] { id, title, description }
  },
  faq {
    heading,
    label,
    items[] { question, answer }
  },
  cta {
    heading,
    subtext,
    variant,
    primaryAction { label, href },
    secondaryAction { label, href }
  }
}`

export const contactQuery = `*[_type == "contact"][0]{
  contact {
    title,
    subtitle,
    label
  },
  form {
    submitLabel,
    loadingLabel,
    successMessage,
    fields {
      name { label, placeholder },
      email { label, placeholder },
      subject { label, placeholder },
      message { label, placeholder, rows }
    }
  }
}`

export const siteQuery = `*[_type == "site"][0]{
  name,
  description,
  locale,
  openGraph { title, description, siteName, imageAlt },
  twitter { title, description }
}`
