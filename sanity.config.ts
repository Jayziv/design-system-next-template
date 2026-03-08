/**
 * Sanity Studio Configuration
 *
 * This file configures the embedded Sanity Studio for content management.
 *
 * To set up Sanity:
 * 1. Create a project at https://sanity.io/manage
 * 2. Copy your project ID and dataset name
 * 3. Set environment variables SANITY_PROJECT_ID and SANITY_DATASET
 * 4. Run `pnpm add @sanity/client sanity next-sanity @sanity/vision`
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { homeSchema } from "./sanity/schemas/home"
import { aboutSchema } from "./sanity/schemas/about"
import { servicesSchema } from "./sanity/schemas/services"
import { contactSchema } from "./sanity/schemas/contact"
import { siteSchema } from "./sanity/schemas/site"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

export default defineConfig({
  name: "default",
  title: "Content Studio",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [homeSchema, aboutSchema, servicesSchema, contactSchema, siteSchema],
  },
})
