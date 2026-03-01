// Contact page — ContactSection requires `title` and `children`.
// The form below is a client component that submits to /api/contact.
// See src/app/api/contact/route.ts for the API handler.
"use client"

import * as React from "react"
import {
  ContactSection,
  Button,
  Input,
  Textarea,
  Label,
  Text,
} from "@jayziv/design-system-core"

// Server metadata cannot be exported from client components.
// Move this to a separate layout.tsx in this route folder if needed,
// or use a parent server component wrapper.
// export const metadata: Metadata = {
//   title: "Contact",
//   description: "Get in touch with us.",
// }

function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      // Honeypot — always empty for real users
      website: formData.get("website") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Something went wrong.")
        setStatus("error")
      } else {
        setStatus("success")
      }
    } catch {
      setError("Failed to send message. Please try again later.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-input bg-card p-8 text-center">
        <Text className="text-foreground font-medium">
          Thank you! We&apos;ll be in touch shortly.
        </Text>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/*
        Honeypot field — hidden from real users via sr-only + aria-hidden + tabIndex.
        Bots that enumerate and fill all form fields will populate this, triggering
        a silent server-side reject. Never use display:none or visibility:hidden here
        as modern bots detect those and skip the field.
      */}
      <div className="sr-only" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>

      <div className="space-y-2">
        {/* ← Optional subject field — remove if not needed */}
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="How can we help?" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project or question..."
          rows={5}
          required
        />
      </div>

      {error && (
        <Text className="text-destructive text-sm">{error}</Text>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}

// ← Replace title/subtitle with client copy
export default function ContactPage() {
  return (
    <main>
      <ContactSection
        title="Get in touch"
        subtitle="We'd love to hear from you. Fill out the form and we'll be in touch shortly."
        label="Contact us"
      >
        <ContactForm />
      </ContactSection>
    </main>
  )
}
