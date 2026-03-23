"use client"

import * as React from "react"
import {
  NavigationBar,
  HeroSection,
  ServicesSection,
  AboutSection,
  ContactSection,
  ScrollReveal,
  SectionLabel,
  Heading,
  Text,
  Card,
  CardContent,
} from "@jayziv/design-system-core"
import { ParticleCanvas } from "@/components/ParticleCanvas"
import { WhyFaebleSection } from "@/components/WhyFaebleSection"
import { ContactForm } from "@/components/ContactForm"
import { Footer } from "@/components/Footer"

// ── Scroll helpers ────────────────────────────────────────────────────────────
const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
const scrollToWork = () =>
  document.getElementById("deliverables")?.scrollIntoView({ behavior: "smooth" })

// ── Logo ──────────────────────────────────────────────────────────────────────
function FaebleLogo() {
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-display italic font-light text-xl text-foreground">Faeble</span>
      <span style={{ fontFamily: "var(--font-body)" }} className="text-xs font-light text-muted-foreground tracking-widest uppercase">Studio</span>
    </span>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const navItems = [
  { label: "Services", href: "#services" },
  { label: "What you get", href: "#deliverables" },
  { label: "Why Us", href: "#why-faeble" },
  { label: "Our approach", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const servicesData = [
  { id: "web", title: "Custom Websites", description: "From landing pages to full business sites. Built with React & Next.js — mobile-first, fast by default, and designed to convert.", icon: "⬡" },
  { id: "redesign", title: "Website Redesigns", description: "Already have a site that's underperforming? We rebuild it with modern tech, better SEO, and faster load times.", icon: "◈" },
  { id: "seo", title: "SEO & Performance", description: "Technical SEO foundations, Core Web Vitals tuning, and content strategy to get you found on Google.", icon: "⟡" },
  { id: "support", title: "Ongoing Support", description: "Monthly retainers for hosting, updates, security patches, and performance monitoring. We keep it running so you don't have to.", icon: "✦" },
]

const deliverablesData = [
  { id: "responsive", title: "Mobile-first responsive design", description: "Every site works beautifully on phones, tablets, and desktops. No pinch-zooming, no broken layouts.", icon: "⬡" },
  { id: "performance", title: "90+ Lighthouse scores", description: "Performance, accessibility, best practices, and SEO — all scoring 90 or above, guaranteed.", icon: "◈" },
  { id: "seo-built", title: "Built-in SEO foundations", description: "Semantic HTML, structured data, meta tags, sitemap, and fast load times — everything Google looks for.", icon: "⟡" },
  { id: "accessible", title: "WCAG accessibility compliance", description: "Screen-reader tested, keyboard navigable, colour-contrast checked. Your site works for everyone.", icon: "✦" },
  { id: "cms", title: "CMS integration", description: "Edit your own content without touching code. We integrate headless CMS tools so you stay in control.", icon: "◇" },
  { id: "analytics", title: "Analytics dashboard", description: "Know exactly how your site performs. We set up tracking so you can see visitors, conversions, and growth.", icon: "⬢" },
]

const processSteps = [
  { id: "discover", step: "01", title: "Discovery call", description: "A free 30-minute call to understand your business, goals, and timeline. No pressure, no jargon — just an honest conversation about what you need." },
  { id: "build", step: "02", title: "Design & build", description: "We design and develop your site iteratively, sharing progress at every stage. You see real work early, not just wireframes — and you can give feedback as we go." },
  { id: "launch", step: "03", title: "Launch & support", description: "We handle deployment, DNS, analytics setup, and SEO indexing. After launch, we're still here — with optional monthly support to keep things running smoothly." },
]

const aboutStats = [
  { value: "7+", label: "Years in the industry" },
  { value: "React", label: "& Next.js specialists" },
  { value: "Leeds", label: "Based in the UK" },
]

// Map to DS-compatible types
const services = servicesData.map(({ id, title, description }) => ({ id, title, description }))

export default function HomePage() {
  return (
    <>
      <NavigationBar
        logo={<FaebleLogo />}
        navItems={navItems}
        ctaButton={{ label: "Start a project", onClick: scrollToContact }}
      />

      {/* ── Full-page particle background ─────────────────────────────── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticleCanvas />
      </div>

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <HeroSection
          label="✦ Web studio, Leeds UK"
          title={
            <Heading as="h1" className="font-display italic font-light text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Websites that work<br />as hard as you do.
            </Heading>
          }
          subtitle="A Leeds-based studio with 7+ years of industry experience, focused on one thing: websites that actually grow your business. No templates. No bloat. Just fast, accessible sites built to convert."
          primaryAction={{ label: "See what we build", onClick: scrollToWork }}
          secondaryAction={{ label: "Book a free call", onClick: scrollToContact }}
        />

        {/* ── Services ───────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <ServicesSection
            id="services"
            label="What we do"
            title="Everything you need to get online and grow."
            subtitle="Four focused services. No fluff, no upsells — just the work that matters."
            services={services}
            columns={2}
            renderService={(service, index) => (
              <Card
                key={service.id}
                className="h-full transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <Text className="text-2xl text-primary leading-none">
                    {servicesData[index]?.icon}
                  </Text>
                  <Heading as="h3" className="text-base font-semibold">
                    {service.title}
                  </Heading>
                  <Text className="text-muted-foreground text-sm">
                    {service.description}
                  </Text>
                </CardContent>
              </Card>
            )}
          />
        </ScrollReveal>

        {/* ── Why Faeble ─────────────────────────────────────────────────── */}
        <WhyFaebleSection />

        {/* ── What you get ──────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.1}>
          <section id="deliverables" className="py-16">
            <div className="container mx-auto px-6">
              <SectionLabel>What you get</SectionLabel>
              <Heading as="h2" className="mt-2 mb-4">
                Every site ships with these built in.
              </Heading>
              <Text className="text-muted-foreground mb-12 max-w-2xl">
                No add-ons, no extras. These are the standards we hold every project to.
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {deliverablesData.map((item) => (
                  <Card
                    key={item.id}
                    className="h-full transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
                  >
                    <CardContent className="p-6 flex flex-col gap-3">
                      <Text className="text-2xl text-primary leading-none">
                        {item.icon}
                      </Text>
                      <Heading as="h3" className="text-base font-semibold">
                        {item.title}
                      </Heading>
                      <Text className="text-muted-foreground text-sm">
                        {item.description}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Our approach ────────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.1}>
          <section id="process" className="py-16">
            <div className="container mx-auto px-6">
              <SectionLabel>Our approach</SectionLabel>
              <Heading as="h2" className="mt-2 mb-4">
                Three steps. No mystery.
              </Heading>
              <Text className="text-muted-foreground mb-12 max-w-2xl">
                We keep the process simple so you always know where things stand.
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {processSteps.map((step) => (
                  <Card
                    key={step.id}
                    className="h-full transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
                  >
                    <CardContent className="p-6 flex flex-col gap-3">
                      <Text className="text-3xl font-display italic font-light text-primary leading-none">
                        {step.step}
                      </Text>
                      <Heading as="h3" className="text-lg">
                        {step.title}
                      </Heading>
                      <Text className="text-muted-foreground text-sm">
                        {step.description}
                      </Text>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── About ──────────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <AboutSection
            id="about"
            label="Our story"
            title="7+ years of building for the web. Now building for you."
            content="Faeble Studio was founded by Jay after years of working across agencies and product teams — building everything from startup MVPs to enterprise platforms. The common thread? The best results always came from treating design and engineering as one conversation, not two departments. We started this studio to bring that same rigour to businesses that deserve better than a template. Every project gets our full attention. No juniors, no handoffs, no surprises. Just clear communication, honest timelines, and code we're proud to hand over."
            stats={aboutStats}
          />
        </ScrollReveal>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <ContactSection
            id="contact"
            label="Let&#39;s talk"
            title="Ready to get started?"
            subtitle="Book a free 30-minute discovery call, or drop us a message. We respond within one business day."
          >
            <ContactForm />
          </ContactSection>
        </ScrollReveal>
      </main>

      <Footer />
    </>
  )
}
