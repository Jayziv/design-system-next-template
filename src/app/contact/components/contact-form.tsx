"use client"

import * as React from "react"
import {
  Button,
  Input,
  Textarea,
  Label,
  Text,
} from "@jayziv/design-system-core"
import type { ContactPageData } from "@/lib/cms"

export interface ContactFormProps {
  formData: ContactPageData["form"]
}

export function ContactForm({ formData }: ContactFormProps) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setError(null)

    const formElement = e.currentTarget
    const formDataObj = new FormData(formElement)
    const body = {
      name: formDataObj.get("name") as string,
      email: formDataObj.get("email") as string,
      subject: formDataObj.get("subject") as string,
      message: formDataObj.get("message") as string,
      // Honeypot — always empty for real users
      website: formDataObj.get("website") as string,
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
          {formData.successMessage}
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
          <Label htmlFor="name">{formData.fields.name.label}</Label>
          <Input
            id="name"
            name="name"
            placeholder={formData.fields.name.placeholder}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{formData.fields.email.label}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={formData.fields.email.placeholder}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{formData.fields.subject.label}</Label>
        <Input
          id="subject"
          name="subject"
          placeholder={formData.fields.subject.placeholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{formData.fields.message.label}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={formData.fields.message.placeholder}
          rows={formData.fields.message.rows}
          required
        />
      </div>

      {error && (
        <Text className="text-destructive text-sm">{error}</Text>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? formData.loadingLabel : formData.submitLabel}
      </Button>
    </form>
  )
}

ContactForm.displayName = "ContactForm"
