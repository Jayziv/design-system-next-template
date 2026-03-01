// NOTE: This file uses inline styles intentionally.
// Next.js ImageResponse (next/og) renders JSX to a PNG via a canvas-based
// renderer that does NOT support Tailwind CSS or CSS custom properties.
// Inline styles with static hex/rgb values are required here.

import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "My App" // ← Replace with client site name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* ← Replace "My App" with the client site name */}
        <div style={{ fontSize: 72, fontWeight: 700, color: "#000000" }}>
          My App
        </div>
        {/* ← Replace with the client tagline */}
        <div style={{ fontSize: 32, color: "#666666", marginTop: "16px" }}>
          Replace this with your tagline
        </div>
      </div>
    ),
    { ...size }
  )
}
