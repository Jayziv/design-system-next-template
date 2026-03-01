"use client"

import * as React from "react"
import {
  NavigationBar,
  HeroSection,
  ServicesSection,
  WorkSection,
  AboutSection,
  ContactSection,
  ScrollReveal,
  SectionLabel,
  Heading,
  Text,
  Caption,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Avatar,
  AvatarFallback,
  Button,
  Input,
  Label,
  Textarea,
} from "@jayziv/design-system-core"
import { ParticleCanvas } from "@/components/ParticleCanvas"
import { WhyFaebleSection } from "@/components/WhyFaebleSection"
import { Footer } from "@/components/Footer"

// ── Scroll helpers ────────────────────────────────────────────────────────────
const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
const scrollToWork = () =>
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })

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
  { label: "Work", href: "#work" },
  { label: "Why Us", href: "#why-faeble" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const servicesData = [
  { id: "web", title: "Web Development", description: "React, Next.js, and edge-native architecture. Fast by default, accessible by design.", icon: "⬡" },
  { id: "ds", title: "Design Systems", description: "Component libraries and tokens that scale across products without sacrificing identity.", icon: "◈" },
  { id: "seo", title: "SEO & Content Strategy", description: "Technical SEO foundations paired with narrative-led content that earns organic reach.", icon: "⟡" },
  { id: "a11y", title: "Accessibility Auditing", description: "WCAG 2.2 AA compliance reviews, remediation roadmaps, and screen-reader testing.", icon: "✦" },
  { id: "cro", title: "Conversion Rate Optimisation", description: "Hypothesis-driven A/B programmes that turn visitors into customers without dark patterns.", icon: "◇" },
  { id: "perf", title: "Performance Optimisation", description: "Core Web Vitals tuning, bundle analysis, and rendering strategy for sub-second loads.", icon: "⬢" },
]

const workData = [
  { id: "verdant", title: "Verdant Finance", description: "Redesigned B2B SaaS dashboard. 38% reduction in time-to-task after design system migration.", category: "Design Systems" },
  { id: "solis", title: "Solis Creative", description: "Brand identity + marketing site for a London photography collective. Lighthouse 100 across all metrics.", category: "Web Development" },
  { id: "meridian", title: "Meridian Health", description: "Accessibility remediation for a patient portal serving 200k+ users. Achieved WCAG 2.2 AA.", category: "Accessibility" },
  { id: "arclight", title: "Arclight Studio", description: "E-commerce design system for an independent games studio — 47 components, 3 themes.", category: "Design Systems" },
]

const testimonials = [
  { id: "t1", quote: "Faeble delivered a design system that genuinely changed how our engineering team communicates. Remarkably fast, no shortcuts.", name: "Alex Pemberton", role: "Head of Product, Verdant Finance", initials: "AP" },
  { id: "t2", quote: "We'd worked with agencies before. Faeble was the first to push back constructively and make us build the right thing.", name: "Simone Chukwu", role: "Founder, Solis Creative", initials: "SC" },
  { id: "t3", quote: "If you need accessibility done properly — not just checked-off — these are the people to call.", name: "Dr Priya Nair", role: "Digital Lead, Meridian Health", initials: "PN" },
]

const aboutStats = [
  { value: "47+", label: "Projects shipped" },
  { value: "100%", label: "Lighthouse scores hit" },
  { value: "4.9★", label: "Average client rating" },
]

// Map to DS-compatible types (ServiceItem / WorkItem have no icon/category)
const services = servicesData.map(({ id, title, description }) => ({ id, title, description }))
const workItems = workData.map(({ id, title, description }) => ({ id, title, description }))

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
          label="✦ Crafted for the web"
          title={
            <Heading as="h1" className="font-display italic font-light text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              We craft<br />digital moments.
            </Heading>
          }
          subtitle="Full-service studio for startups and scale-ups who believe design and engineering are the same conversation."
          primaryAction={{ label: "See our work", onClick: scrollToWork }}
          secondaryAction={{ label: "Get in touch", onClick: scrollToContact }}
        />

        {/* ── Services ───────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <ServicesSection
            id="services"
            label="What we do"
            title="Services that move the needle."
            subtitle="Six disciplines, one unified approach. No handoff problems."
            services={services}
            columns={3}
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

        {/* ── Work ───────────────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.1}>
          <WorkSection
            id="work"
            label="Selected work"
            title="Projects we&#39;re proud of."
            subtitle="A sample of what we&#39;ve shipped for clients we love."
            workItems={workItems}
            columns={2}
            renderWorkItem={(item, index) => (
              <Card
                key={item.id}
                className="h-full transition-shadow duration-500 hover:shadow-[var(--shadow-md)]"
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <Caption className="text-primary uppercase tracking-widest text-xs">
                    {workData[index]?.category}
                  </Caption>
                  <Heading as="h3" className="text-lg">
                    {item.title}
                  </Heading>
                  <Text className="text-muted-foreground text-sm">
                    {item.description}
                  </Text>
                </CardContent>
              </Card>
            )}
          />
        </ScrollReveal>

        {/* ── Testimonials ───────────────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={0.1}>
          <section id="testimonials" className="py-16">
            <div className="container mx-auto px-6">
              <SectionLabel>Client stories</SectionLabel>
              <Heading as="h2" className="mt-2 mb-12">
                Words from those we&apos;ve worked with.
              </Heading>
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {testimonials.map((t) => (
                    <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full transition-shadow duration-500 hover:shadow-[var(--shadow-md)]">
                        <CardContent className="p-6 flex flex-col gap-4">
                          <Text className="text-4xl text-primary leading-none">&ldquo;</Text>
                          <Text className="text-foreground">{t.quote}</Text>
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <Avatar>
                              <AvatarFallback>{t.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Text className="font-semibold text-sm">{t.name}</Text>
                              <Caption className="text-muted-foreground">{t.role}</Caption>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>
        </ScrollReveal>

        {/* ── About ──────────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <AboutSection
            id="about"
            label="Our story"
            title="Built on the belief that craft is never finished."
            content="Faeble Studio was founded on a simple idea: that the best digital work lives at the boundary between engineering rigour and design intuition. We're a small, intentional studio — and we plan to stay that way. Every client engagement gets our full attention, not a team you never meet. The name comes from that blurry edge between the fae (the unseen, the liminal) and a fable (a story with purpose). We make the web feel a little more alive."
            stats={aboutStats}
          />
        </ScrollReveal>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <ContactSection
            id="contact"
            label="Let&#39;s talk"
            title="Got something to build?"
            subtitle="Tell us about your project. We&#39;ll respond within one business day."
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your project</Label>
                <Textarea id="message" placeholder="Tell us about your project…" rows={5} />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Send message
              </Button>
            </form>
          </ContactSection>
        </ScrollReveal>
      </main>

      <Footer />
    </>
  )
}
