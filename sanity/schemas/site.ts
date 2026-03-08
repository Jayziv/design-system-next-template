/**
 * Sanity Schema: Site Settings
 */

import { defineType, defineField } from "sanity"

export const siteSchema = defineType({
  name: "site",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      description: "SEO description (max 155 characters)",
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      initialValue: "en_US",
    }),
    defineField({
      name: "openGraph",
      title: "Open Graph Settings",
      type: "object",
      fields: [
        defineField({ name: "title", title: "OG Title", type: "string" }),
        defineField({ name: "description", title: "OG Description", type: "text" }),
        defineField({ name: "siteName", title: "OG Site Name", type: "string" }),
        defineField({ name: "imageAlt", title: "OG Image Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "twitter",
      title: "Twitter Settings",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Twitter Title", type: "string" }),
        defineField({ name: "description", title: "Twitter Description", type: "text" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" }
    },
  },
})
