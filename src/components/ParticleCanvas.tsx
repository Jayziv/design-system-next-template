"use client"

import * as React from "react"
import { cn } from "@jayziv/design-system-core"

export interface ParticleCanvasProps {
  className?: string
}

interface Particle {
  x: number
  y: number
  radius: number
  /** Pixels per second (not per frame) */
  vx: number
  vy: number
  opacity: number
  /** Visual spread of the soft glow */
  spread: number
  /** Pre-rendered offscreen image for this particle */
  image: HTMLCanvasElement
}

const PARTICLE_COUNT = 28
const BASE_SPEED = 18 // pixels per second

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/**
 * Pre-render a single soft-glow circle onto an offscreen canvas.
 * Uses a radial gradient instead of ctx.filter = blur() — this is
 * orders of magnitude cheaper because it avoids software blur per frame.
 */
function createGlowImage(radius: number, spread: number, opacity: number): HTMLCanvasElement {
  const size = Math.ceil((radius + spread) * 2)
  const offscreen = document.createElement("canvas")
  offscreen.width = size
  offscreen.height = size

  const ctx = offscreen.getContext("2d")
  if (ctx) {
    const cx = size / 2
    const cy = size / 2
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius + spread)
    gradient.addColorStop(0, `hsla(160, 84%, 39%, ${opacity})`)
    gradient.addColorStop(0.4, `hsla(160, 84%, 39%, ${opacity * 0.6})`)
    gradient.addColorStop(1, `hsla(160, 84%, 39%, 0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  return offscreen
}

function createParticle(width: number, height: number): Particle {
  const radius = randomBetween(2, 16)
  const spread = randomBetween(6, 20)
  const opacity = randomBetween(0.08, 0.45)
  const rawVx = randomBetween(-1, 1)
  const rawVy = randomBetween(-1, 1)

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    vx: (rawVx === 0 ? 0.4 : rawVx) * BASE_SPEED,
    vy: (rawVy === 0 ? 0.4 : rawVy) * BASE_SPEED,
    opacity,
    spread,
    image: createGlowImage(radius, spread, opacity),
  }
}

export const ParticleCanvas = React.forwardRef<HTMLDivElement, ParticleCanvasProps>(
  ({ className }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const particlesRef = React.useRef<Particle[]>([])
    const rafRef = React.useRef<number>(0)
    const lastTimeRef = React.useRef<number>(0)

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // ── Sizing ────────────────────────────────────────────────────────
      let currentWidth = 0
      let currentHeight = 0

      const updateSize = () => {
        const parent = canvas.parentElement
        if (!parent) return
        const w = parent.clientWidth
        const h = parent.clientHeight

        // Only re-seed if this is the first call (no particles yet)
        // On subsequent resizes, just rescale positions
        if (particlesRef.current.length === 0) {
          canvas.width = w
          canvas.height = h
          currentWidth = w
          currentHeight = h
          particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
            createParticle(w, h)
          )
        } else {
          // Proportionally remap positions to new dimensions
          const scaleX = w / (currentWidth || w)
          const scaleY = h / (currentHeight || h)
          canvas.width = w
          canvas.height = h
          for (const p of particlesRef.current) {
            p.x *= scaleX
            p.y *= scaleY
          }
          currentWidth = w
          currentHeight = h
        }

        if (prefersReducedMotion) {
          drawStatic(ctx, w, h)
        }
      }

      const drawStatic = (c: CanvasRenderingContext2D, w: number, h: number) => {
        c.clearRect(0, 0, w, h)
        for (const p of particlesRef.current) {
          const imgSize = p.image.width
          c.drawImage(p.image, p.x - imgSize / 2, p.y - imgSize / 2)
        }
      }

      updateSize()

      if (prefersReducedMotion) {
        const ro = new ResizeObserver(updateSize)
        ro.observe(canvas.parentElement!)
        return () => ro.disconnect()
      }

      // ── Animation loop (delta-time based) ─────────────────────────────
      const draw = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp
        const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1) // cap at 100ms to avoid jumps
        lastTimeRef.current = timestamp

        const w = canvas.width
        const h = canvas.height
        ctx.clearRect(0, 0, w, h)

        for (const p of particlesRef.current) {
          // Draw pre-rendered glow sprite (no ctx.filter!)
          const imgSize = p.image.width
          ctx.drawImage(p.image, p.x - imgSize / 2, p.y - imgSize / 2)

          // Advance position using delta-time for frame-rate independence
          p.x += p.vx * dt
          p.y += p.vy * dt

          // Wrap edges
          if (p.x < -imgSize) p.x = w + imgSize / 2
          if (p.x > w + imgSize) p.x = -imgSize / 2
          if (p.y < -imgSize) p.y = h + imgSize / 2
          if (p.y > h + imgSize) p.y = -imgSize / 2
        }

        rafRef.current = requestAnimationFrame(draw)
      }

      rafRef.current = requestAnimationFrame(draw)

      // Debounced resize to avoid thrashing
      let resizeTimer: ReturnType<typeof setTimeout>
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(updateSize, 100)
      })
      ro.observe(canvas.parentElement!)

      return () => {
        cancelAnimationFrame(rafRef.current)
        clearTimeout(resizeTimer)
        ro.disconnect()
      }
    }, [])

    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    )
  }
)
ParticleCanvas.displayName = "ParticleCanvas"
