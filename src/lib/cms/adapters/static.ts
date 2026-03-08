/**
 * Static Content Adapter
 *
 * Returns hardcoded content for development and sites without a CMS.
 * This adapter maintains 100% parity with the original page content.
 */

import type { ContentAdapter } from "../adapter"
import type {
  HomePageData,
  AboutPageData,
  ServicesPageData,
  ContactPageData,
  SiteMetadata,
} from "../types"

/**
 * Static content adapter implementation
 */
export class StaticAdapter implements ContentAdapter {
  async getHomePageData(): Promise<HomePageData> {
    return Promise.resolve({
      hero: {
        title: "Welcome to [Client Name]",
        subtitle: "Your tagline goes here. Keep it to one powerful sentence.",
        primaryAction: {
          label: "Get Started",
          href: "/contact",
        },
        secondaryAction: {
          label: "Learn More",
          href: "/about",
        },
      },
      stats: {
        label: "By the numbers",
        items: [
          { value: "10+", label: "Years experience" },
          { value: "500+", label: "Happy clients" },
          { value: "99%", label: "Satisfaction rate" },
          { value: "24/7", label: "Support" },
        ],
        variant: "cards",
      },
      testimonials: {
        heading: "What our clients say",
        label: "Testimonials",
        items: [
          {
            quote: "Exceptional service. They delivered beyond our expectations.",
            name: "Jane Smith",
            role: "CEO",
            company: "Acme Corp",
            avatarFallback: "JS",
          },
          {
            quote: "Professional, fast, and reliable. Highly recommend.",
            name: "Mark Johnson",
            role: "Director",
            company: "TechStart",
            avatarFallback: "MJ",
          },
          {
            quote: "They understood our vision immediately. Results speak for themselves.",
            name: "Sarah Lee",
            role: "Founder",
            company: "GreenPath",
            avatarFallback: "SL",
          },
        ],
      },
      cta: {
        heading: "Ready to get started?",
        subtext: "Contact us today for a free consultation.",
        primaryAction: { label: "Get in touch", href: "/contact" },
        secondaryAction: { label: "See our work", href: "/services" },
        variant: "primary",
      },
    })
  }

  async getAboutPageData(): Promise<AboutPageData> {
    return Promise.resolve({
      about: {
        title: "We help businesses grow",
        subtitle: "About us",
        content:
          "Tell your brand story here. Who are you, what do you do, and why does it matter? This section supports rich content — add multiple paragraphs, lists, or images.",
        stats: [
          { value: "10+", label: "Years in business" },
          { value: "500+", label: "Projects delivered" },
        ],
      },
      stats: {
        label: "Our track record",
        items: [
          { value: "10+", label: "Years experience" },
          { value: "500+", label: "Projects completed" },
          { value: "50+", label: "Team members" },
          { value: "20+", label: "Countries served" },
        ],
        columns: 4,
        variant: "minimal",
      },
      team: {
        heading: "Meet the team",
        label: "Our people",
        members: [
          {
            name: "Alex Rivera",
            role: "Founder & CEO",
            bio: "Short bio about this team member.",
            avatarFallback: "AR",
          },
          {
            name: "Jordan Kim",
            role: "Head of Design",
            bio: "Short bio about this team member.",
            avatarFallback: "JK",
          },
          {
            name: "Sam Patel",
            role: "Lead Developer",
            bio: "Short bio about this team member.",
            avatarFallback: "SP",
          },
        ],
        columns: 3,
      },
    })
  }

  async getServicesPageData(): Promise<ServicesPageData> {
    return Promise.resolve({
      services: {
        title: "Services tailored to your needs",
        label: "What we do",
        items: [
          {
            id: "service-1",
            title: "Service One",
            description: "Describe this service and the value it delivers to clients.",
          },
          {
            id: "service-2",
            title: "Service Two",
            description: "Describe this service and the value it delivers to clients.",
          },
          {
            id: "service-3",
            title: "Service Three",
            description: "Describe this service and the value it delivers to clients.",
          },
        ],
      },
      faq: {
        heading: "Frequently asked questions",
        label: "FAQ",
        items: [
          {
            question: "How long does a typical project take?",
            answer:
              "Project timelines vary depending on scope. Most projects are delivered within 4–8 weeks.",
          },
          {
            question: "What is your pricing model?",
            answer:
              "We offer fixed-price packages for common projects and hourly rates for custom work.",
          },
          {
            question: "Do you offer ongoing support?",
            answer:
              "Yes, we offer monthly maintenance and support packages for all completed projects.",
          },
          {
            question: "How do we get started?",
            answer:
              "Simply fill out our contact form or give us a call. We will respond within one business day.",
          },
        ],
      },
      cta: {
        heading: "Interested in working together?",
        subtext: "Get in touch and we will put together a proposal tailored to your needs.",
        primaryAction: { label: "Request a quote", href: "/contact" },
        variant: "muted",
      },
    })
  }

  async getContactPageData(): Promise<ContactPageData> {
    return Promise.resolve({
      contact: {
        title: "Get in touch",
        subtitle: "We'd love to hear from you. Fill out the form and we'll be in touch shortly.",
        label: "Contact us",
      },
      form: {
        submitLabel: "Send message",
        loadingLabel: "Sending…",
        successMessage: "Thank you! We'll be in touch shortly.",
        fields: {
          name: { label: "Name", placeholder: "Your name" },
          email: { label: "Email", placeholder: "you@example.com" },
          subject: { label: "Subject", placeholder: "How can we help?" },
          message: {
            label: "Message",
            placeholder: "Tell us about your project or question...",
            rows: 5,
          },
        },
      },
    })
  }

  async getSiteMetadata(): Promise<SiteMetadata> {
    return Promise.resolve({
      name: "My App",
      description: "Replace with your site description (155 chars max)",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      locale: "en_US",
      openGraph: {
        title: "My App",
        description: "Replace with your site description",
        siteName: "My App",
        imageAlt: "My App",
      },
      twitter: {
        title: "My App",
        description: "Replace with your site description",
      },
    })
  }
}
