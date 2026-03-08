/**
 * Sanity Schema: Services Page
 */

import { defineType, defineField } from "sanity"

export const servicesSchema = defineType({
  name: "services",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "services",
      title: "Services Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "items",
          title: "Services",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "id", title: "ID", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "items",
          title: "FAQ Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "question", title: "Question", type: "string" }),
                defineField({ name: "answer", title: "Answer", type: "text" }),
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
          initialValue: "muted",
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
      return { title: "Services Page" }
    },
  },
})
