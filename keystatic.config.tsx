/**
 * Keystatic CMS Configuration
 *
 * This file defines the content schema for Keystatic CMS.
 * Content is stored locally in the `content/` directory as JSON files.
 *
 * For GitHub mode (collaborative editing), see:
 * https://keystatic.com/docs/github-mode
 */

import { config, fields, singleton } from "@keystatic/core"

export default config({
  storage: {
    kind: "local",
  },

  singletons: {
    // =========================================================================
    // Home Page
    // =========================================================================
    home: singleton({
      label: "Home Page",
      path: "content/home",
      format: { data: "json" },
      schema: {
        hero: fields.object(
          {
            title: fields.text({
              label: "Title",
              description: "Main headline for the hero section",
            }),
            subtitle: fields.text({
              label: "Subtitle",
              description: "Supporting text below the headline",
              multiline: true,
            }),
            primaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Primary Action" }
            ),
            secondaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Secondary Action" }
            ),
          },
          { label: "Hero Section" }
        ),
        stats: fields.object(
          {
            label: fields.text({ label: "Section Label" }),
            variant: fields.select({
              label: "Variant",
              options: [
                { label: "Default", value: "default" },
                { label: "Cards", value: "cards" },
                { label: "Minimal", value: "minimal" },
              ],
              defaultValue: "cards",
            }),
            items: fields.array(
              fields.object({
                value: fields.text({ label: "Value" }),
                label: fields.text({ label: "Label" }),
              }),
              {
                label: "Stats",
                itemLabel: (props) => props.fields.label.value || "Stat",
              }
            ),
          },
          { label: "Stats Section" }
        ),
        testimonials: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            label: fields.text({ label: "Section Label" }),
            items: fields.array(
              fields.object({
                quote: fields.text({ label: "Quote", multiline: true }),
                name: fields.text({ label: "Name" }),
                role: fields.text({ label: "Role" }),
                company: fields.text({ label: "Company" }),
                avatarFallback: fields.text({
                  label: "Avatar Fallback",
                  description: "2-character initials (e.g., 'JS')",
                }),
              }),
              {
                label: "Testimonials",
                itemLabel: (props) => props.fields.name.value || "Testimonial",
              }
            ),
          },
          { label: "Testimonials Section" }
        ),
        cta: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            subtext: fields.text({ label: "Subtext", multiline: true }),
            variant: fields.select({
              label: "Variant",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
                { label: "Muted", value: "muted" },
              ],
              defaultValue: "primary",
            }),
            primaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Primary Action" }
            ),
            secondaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Secondary Action" }
            ),
          },
          { label: "CTA Section" }
        ),
      },
    }),

    // =========================================================================
    // About Page
    // =========================================================================
    about: singleton({
      label: "About Page",
      path: "content/about",
      format: { data: "json" },
      schema: {
        about: fields.object(
          {
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle" }),
            content: fields.text({
              label: "Content",
              description: "Main content for the about section",
              multiline: true,
            }),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: "Value" }),
                label: fields.text({ label: "Label" }),
              }),
              {
                label: "Inline Stats",
                itemLabel: (props) => props.fields.label.value || "Stat",
              }
            ),
          },
          { label: "About Section" }
        ),
        stats: fields.object(
          {
            label: fields.text({ label: "Section Label" }),
            columns: fields.select({
              label: "Columns",
              options: [
                { label: "2 Columns", value: "2" },
                { label: "3 Columns", value: "3" },
                { label: "4 Columns", value: "4" },
              ],
              defaultValue: "4",
            }),
            variant: fields.select({
              label: "Variant",
              options: [
                { label: "Default", value: "default" },
                { label: "Cards", value: "cards" },
                { label: "Minimal", value: "minimal" },
              ],
              defaultValue: "minimal",
            }),
            items: fields.array(
              fields.object({
                value: fields.text({ label: "Value" }),
                label: fields.text({ label: "Label" }),
              }),
              {
                label: "Stats",
                itemLabel: (props) => props.fields.label.value || "Stat",
              }
            ),
          },
          { label: "Stats Section" }
        ),
        team: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            label: fields.text({ label: "Section Label" }),
            columns: fields.select({
              label: "Columns",
              options: [
                { label: "2 Columns", value: "2" },
                { label: "3 Columns", value: "3" },
                { label: "4 Columns", value: "4" },
              ],
              defaultValue: "3",
            }),
            members: fields.array(
              fields.object({
                name: fields.text({ label: "Name" }),
                role: fields.text({ label: "Role" }),
                bio: fields.text({ label: "Bio", multiline: true }),
                avatarFallback: fields.text({
                  label: "Avatar Fallback",
                  description: "2-character initials",
                }),
              }),
              {
                label: "Team Members",
                itemLabel: (props) => props.fields.name.value || "Member",
              }
            ),
          },
          { label: "Team Section" }
        ),
      },
    }),

    // =========================================================================
    // Services Page
    // =========================================================================
    services: singleton({
      label: "Services Page",
      path: "content/services",
      format: { data: "json" },
      schema: {
        services: fields.object(
          {
            title: fields.text({ label: "Title" }),
            label: fields.text({ label: "Section Label" }),
            items: fields.array(
              fields.object({
                id: fields.text({ label: "ID" }),
                title: fields.text({ label: "Title" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
              }),
              {
                label: "Services",
                itemLabel: (props) => props.fields.title.value || "Service",
              }
            ),
          },
          { label: "Services Section" }
        ),
        faq: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            label: fields.text({ label: "Section Label" }),
            items: fields.array(
              fields.object({
                question: fields.text({ label: "Question" }),
                answer: fields.text({ label: "Answer", multiline: true }),
              }),
              {
                label: "FAQ Items",
                itemLabel: (props) => props.fields.question.value || "Question",
              }
            ),
          },
          { label: "FAQ Section" }
        ),
        cta: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            subtext: fields.text({ label: "Subtext", multiline: true }),
            variant: fields.select({
              label: "Variant",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
                { label: "Muted", value: "muted" },
              ],
              defaultValue: "muted",
            }),
            primaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Primary Action" }
            ),
            secondaryAction: fields.object(
              {
                label: fields.text({ label: "Button Label" }),
                href: fields.text({ label: "Button Link" }),
              },
              { label: "Secondary Action" }
            ),
          },
          { label: "CTA Section" }
        ),
      },
    }),

    // =========================================================================
    // Contact Page
    // =========================================================================
    contact: singleton({
      label: "Contact Page",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        contact: fields.object(
          {
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle", multiline: true }),
            label: fields.text({ label: "Section Label" }),
          },
          { label: "Contact Section" }
        ),
        form: fields.object(
          {
            submitLabel: fields.text({ label: "Submit Button Label" }),
            loadingLabel: fields.text({ label: "Loading Button Label" }),
            successMessage: fields.text({
              label: "Success Message",
              multiline: true,
            }),
            fields: fields.object(
              {
                name: fields.object({
                  label: fields.text({ label: "Label" }),
                  placeholder: fields.text({ label: "Placeholder" }),
                }),
                email: fields.object({
                  label: fields.text({ label: "Label" }),
                  placeholder: fields.text({ label: "Placeholder" }),
                }),
                subject: fields.object({
                  label: fields.text({ label: "Label" }),
                  placeholder: fields.text({ label: "Placeholder" }),
                }),
                message: fields.object({
                  label: fields.text({ label: "Label" }),
                  placeholder: fields.text({ label: "Placeholder" }),
                  rows: fields.number({
                    label: "Rows",
                    defaultValue: 5,
                  }),
                }),
              },
              { label: "Form Fields" }
            ),
          },
          { label: "Form Configuration" }
        ),
      },
    }),

    // =========================================================================
    // Site Metadata
    // =========================================================================
    site: singleton({
      label: "Site Settings",
      path: "content/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Site Name" }),
        description: fields.text({
          label: "Site Description",
          description: "SEO description (max 155 characters)",
          multiline: true,
        }),
        locale: fields.text({
          label: "Locale",
          defaultValue: "en_US",
        }),
        openGraph: fields.object(
          {
            title: fields.text({ label: "OG Title" }),
            description: fields.text({
              label: "OG Description",
              multiline: true,
            }),
            siteName: fields.text({ label: "OG Site Name" }),
            imageAlt: fields.text({ label: "OG Image Alt Text" }),
          },
          { label: "Open Graph Settings" }
        ),
        twitter: fields.object(
          {
            title: fields.text({ label: "Twitter Title" }),
            description: fields.text({
              label: "Twitter Description",
              multiline: true,
            }),
          },
          { label: "Twitter Settings" }
        ),
      },
    }),
  },
})
