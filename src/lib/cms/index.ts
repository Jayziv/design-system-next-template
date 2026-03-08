/**
 * CMS Integration Barrel Export
 *
 * Re-exports all CMS types, interfaces, and the adapter factory.
 */

// Types
export type {
  Stat,
  Testimonial,
  TeamMember,
  Service,
  FAQItem,
  CTAAction,
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "./types"

// Adapter interface and factory
export type { ContentAdapter, CMSProvider } from "./adapter"
export { getContentAdapter } from "./adapter"
