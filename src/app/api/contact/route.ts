import { NextResponse } from "next/server"
import { z } from "zod"

// ---------------------------------------------------------------------------
// In-memory rate limiter — 5 submissions per IP per 10 minutes.
// Resets on server restart. For persistent limits across serverless instances
// swap this out for Upstash Redis + @upstash/ratelimit (free tier available).
//
// TODO: Add Cloudflare Turnstile for CAPTCHA-level bot protection.
//   1. Register a site at https://dash.cloudflare.com/?to=/:account/turnstile
//   2. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY to .env.local
//   3. Render <Turnstile siteKey={...} /> in the form (react-turnstile package)
//   4. Send the token in the POST body and verify it here with:
//      POST https://challenges.cloudflare.com/turnstile/v0/siteverify
// ---------------------------------------------------------------------------
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5
const ipRequestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (ipRequestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) return true
  timestamps.push(now)
  ipRequestLog.set(ip, timestamps)
  return false
}

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  subject: z.string().max(200).optional(),
  // Honeypot — real users never see or fill this field; bots typically do.
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = ContactSchema.safeParse(body)

    // Honeypot check — silently succeed so bots don't know they were blocked
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, message, subject } = validation.data

    // Send email via Resend.
    // Ensure RESEND_API_KEY and RESEND_TO_EMAIL are set in .env.local
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_TO_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"

    if (!apiKey || !toEmail) {
      console.error("RESEND_API_KEY or RESEND_TO_EMAIL not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      )
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: subject ?? `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10B981;">New project enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="color: #6b7280; font-size: 12px;">
            Sent from faeblestudio.com contact form
          </p>
        </div>
      `,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
