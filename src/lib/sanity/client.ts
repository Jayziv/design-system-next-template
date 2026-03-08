/**
 * Sanity Client
 *
 * Configured client for fetching content from Sanity CMS.
 *
 * Required environment variables:
 * - NEXT_PUBLIC_SANITY_PROJECT_ID: Your Sanity project ID
 * - NEXT_PUBLIC_SANITY_DATASET: Dataset name (default: "production")
 * - SANITY_API_VERSION: API version (default: "2024-01-01")
 * - SANITY_TOKEN: Optional read token for private datasets
 */

import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01"
const token = process.env.SANITY_TOKEN

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: !token, // Use CDN if no token (public dataset)
})

/**
 * Fetch helper with typed response
 */
export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return sanityClient.fetch<T>(query, params)
}
