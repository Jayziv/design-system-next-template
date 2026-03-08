/**
 * Sanity Schema: About Page
 */

import { defineType, defineField } from "sanity"

export const aboutSchema = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({ name: "content", title: "Content", type: "text" }),
        defineField({
          name: "stats",
          title: "Inline Stats",
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
      name: "stats",
      title: "Stats Section",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "columns",
          title: "Columns",
          type: "number",
          options: { list: [2, 3, 4] },
          initialValue: 4,
        }),
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
          initialValue: "minimal",
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
      name: "team",
      title: "Team Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "label", title: "Section Label", type: "string" }),
        defineField({
          name: "columns",
          title: "Columns",
          type: "number",
          options: { list: [2, 3, 4] },
          initialValue: 3,
        }),
        defineField({
          name: "members",
          title: "Team Members",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({ name: "bio", title: "Bio", type: "text" }),
                defineField({ name: "avatarFallback", title: "Avatar Fallback", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" }
    },
  },
})
