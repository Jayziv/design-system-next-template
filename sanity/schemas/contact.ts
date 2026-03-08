/**
 * Sanity Schema: Contact Page
 */

import { defineType, defineField } from "sanity"

export const contactSchema = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
        defineField({ name: "label", title: "Section Label", type: "string" }),
      ],
    }),
    defineField({
      name: "form",
      title: "Form Configuration",
      type: "object",
      fields: [
        defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
        defineField({ name: "loadingLabel", title: "Loading Button Label", type: "string" }),
        defineField({ name: "successMessage", title: "Success Message", type: "text" }),
        defineField({
          name: "fields",
          title: "Form Fields",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name Field",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
              ],
            }),
            defineField({
              name: "email",
              title: "Email Field",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
              ],
            }),
            defineField({
              name: "subject",
              title: "Subject Field",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
              ],
            }),
            defineField({
              name: "message",
              title: "Message Field",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
                defineField({
                  name: "rows",
                  title: "Rows",
                  type: "number",
                  initialValue: 5,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" }
    },
  },
})
