import { NextResponse } from "next/server"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  subject: z.string().max(200).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = ContactSchema.safeParse(body)

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
      subject: subject ?? `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
