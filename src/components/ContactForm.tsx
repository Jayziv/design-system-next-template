"use client"

import * as React from "react"
import {
  Button,
  Input,
  Label,
  Textarea,
  Alert,
  AlertTitle,
  AlertDescription,
  Text,
} from "@jayziv/design-system-core"

type FormState = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [honeypot, setHoneypot] = React.useState("")
  const [formState, setFormState] = React.useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = React.useState("")
  const loadedAtRef = React.useRef(Date.now())

  const isValid = name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isValid) return

    setFormState("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _honeypot: honeypot,
          _loadedAt: loadedAtRef.current,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setFormState("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setFormState("success")
      setName("")
      setEmail("")
      setMessage("")
    } catch {
      setFormState("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  if (formState === "success") {
    return (
      <Alert className="border-primary">
        <AlertTitle className="text-primary">Message sent!</AlertTitle>
        <AlertDescription>
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={() => setFormState("idle")}
        >
          Send another message
        </Button>
      </Alert>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {formState === "error" && (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            disabled={formState === "submitting"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            disabled={formState === "submitting"}
          />
        </div>
      </div>

      {/* Honeypot — hidden from real users, bots will fill it */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
        <Label htmlFor="_hp">Leave this empty</Label>
        <Input
          id="_hp"
          name="_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your project</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project…"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
          disabled={formState === "submitting"}
        />
        <Text className="text-muted-foreground text-xs text-right">
          {message.length.toLocaleString()} / 5,000
        </Text>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={!isValid || formState === "submitting"}
      >
        {formState === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}
