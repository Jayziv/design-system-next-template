// Home page — edit section content below to match your client's brand
// Sections: Hero → Stats → Testimonials → CTA
//
// Note: HeroSection.primaryAction / secondaryAction use onClick callbacks.
// This page is marked "use client" so we can use useRouter for navigation.
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  HeroSection,
  StatsSection,
  TestimonialsSection,
  CTABannerSection,
} from "@jayziv/design-system-core"

export default function HomePage() {
  const router = useRouter()

  return (
    <main>
      {/* ← Replace heading/subheading/label text with client copy */}
      <HeroSection
        title="Welcome to [Client Name]"
        subtitle="Your tagline goes here. Keep it to one powerful sentence."
        primaryAction={{
          label: "Get Started",
          onClick: () => router.push("/contact"),
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => router.push("/about"),
        }}
      />

      {/* ← Replace stat values and labels with real client data */}
      <StatsSection
        label="By the numbers"
        stats={[
          { value: "10+", label: "Years experience" },
          { value: "500+", label: "Happy clients" },
          { value: "99%", label: "Satisfaction rate" },
          { value: "24/7", label: "Support" },
        ]}
        variant="cards"
      />

      {/* ← Replace testimonials with real client quotes */}
      <TestimonialsSection
        heading="What our clients say"
        label="Testimonials"
        testimonials={[
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
        ]}
      />

      {/* ← Adjust CTA copy and link targets */}
      <CTABannerSection
        heading="Ready to get started?"
        subtext="Contact us today for a free consultation."
        primaryAction={{ label: "Get in touch", href: "/contact" }}
        secondaryAction={{ label: "See our work", href: "/services" }}
        variant="primary"
      />
    </main>
  )
}
