/**
 * Sanity Schema: Home Page
 */

import { defineType, defineField } from "sanity"

export const homeSchema = defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
        }),
        defineField({
          name: "primaryAction",
          title: "Primary Action",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
        defineField({
          name: "secondaryAction",
          title: "Secondary Action",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats Section",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: {
            list: [
              { title: "Default", value: "default" },
              { title: "Cards", value: "cards" },
              { title: "Minimal", value: "minimal" },
            ],
          },
          initialValue: "cards",
        }),
        defineField({
          name: "items",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                defineField({ name: "label", title: "Label", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "items",
          title: "Testimonials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "quote", title: "Quote", type: "text" }),
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({ name: "company", title: "Company", type: "string" }),
                defineField({ name: "avatarFallback", title: "Avatar Fallback", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "text" }),
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: {
            list: [
              { title: "Default", value: "default" },
              { title: "Primary", value: "primary" },
              { title: "Muted", value: "muted" },
            ],
          },
          initialValue: "primary",
        }),
        defineField({
          name: "primaryAction",
          title: "Primary Action",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
        defineField({
          name: "secondaryAction",
          title: "Secondary Action",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" }
    },
  },
})
