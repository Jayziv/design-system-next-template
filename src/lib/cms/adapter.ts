/**
 * CMS Adapter Interface & Factory
 *
 * Defines the contract for content adapters and provides a factory
 * function to instantiate the appropriate adapter based on environment.
 */

import type {
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "./types"

/**
 * Content Adapter Interface
 *
 * All CMS adapters must implement this interface.
 * Methods return Promises for async compatibility with remote CMSs.
 */
export interface ContentAdapter {
  /**
   * Fetch home page content
   */
  getHomePageData(): Promise<HomePageData>

  /**
   * Fetch about page content
   */
  getAboutPageData(): Promise<AboutPageData>

  /**
   * Fetch services page content
   */
  getServicesPageData(): Promise<ServicesPageData>

  /**
   * Fetch contact page content
   */
  getContactPageData(): Promise<ContactPageData>

  /**
   * Fetch global site metadata
   */
  getSiteMetadata(): Promise<SiteMetadata>
}

/**
 * CMS Provider type
 */
export type CMSProvider = "static" | "keystatic" | "sanity"

/**
 * Get the content adapter based on CMS_PROVIDER environment variable.
 *
 * Defaults to "static" if not set or invalid.
 *
 * @returns ContentAdapter instance
 */
export async function getContentAdapter(): Promise<ContentAdapter> {
  const provider = (process.env.CMS_PROVIDER ?? "static") as CMSProvider

  switch (provider) {
    case "keystatic": {
      // Dynamic import to avoid loading Keystatic when not needed
      const { KeystaticAdapter } = await import("./adapters/keystatic")
      return new KeystaticAdapter()
    }
    case "sanity": {
      // Dynamic import to avoid loading Sanity when not needed
      const { SanityAdapter } = await import("./adapters/sanity")
      return new SanityAdapter()
    }
    case "static":
    default: {
      const { StaticAdapter } = await import("./adapters/static")
      return new StaticAdapter()
    }
  }
}
