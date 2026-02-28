"use client"

import * as React from "react"
import { cn } from "@jayziv/design-system-core"

export interface ParticleCanvasProps {
  className?: string
}

// ── Layer definitions ─────────────────────────────────────────────────────────
// Each layer has its own colour, size range, speed, and "drift" (erratic wobble).

interface LayerConfig {
  /** Number of particles in this layer */
  count: number
  /** Particle radius range [min, max] */
  radius: [number, number]
  /** Soft-glow spread range [min, max] */
  spread: [number, number]
  /** Opacity range [min, max] */
  opacity: [number, number]
  /** Base linear speed in px/s */
  speed: number
  /** Amplitude of the sine-wave wobble in px (0 = straight line) */
  drift: number
  /** Frequency multiplier for the wobble */
  driftFreq: number
  /** HSLA colour without the alpha — e.g. "160, 84%, 39%" */
  hsl: string
  /** When true, renders a bright solid core + wide halo (firefly look) */
  firefly?: boolean
  /** Inner core HSLA (firefly only) — hot bright centre */
  coreHsl?: string
}

const LAYERS: LayerConfig[] = [
  // Back — large, slow emerald glows (original feel, slightly fewer)
  {
    count: 16,
    radius: [8, 18],
    spread: [12, 24],
    opacity: [0.07, 0.3],
    speed: 14,
    drift: 0,
    driftFreq: 0,
    hsl: "160, 84%, 39%",
  },
  // Mid — smaller teal sparkles, moderate erratic drift
  {
    count: 18,
    radius: [2, 7],
    spread: [4, 10],
    opacity: [0.12, 0.45],
    speed: 28,
    drift: 30,
    driftFreq: 1.8,
    hsl: "174, 72%, 52%",
  },
  // Front — fantasy fireflies: hard bright core + wide warm halo
  {
    count: 14,
    radius: [1.5, 3.5],
    spread: [14, 28],
    opacity: [0.55, 0.85],
    speed: 36,
    drift: 50,
    driftFreq: 2.6,
    hsl: "48, 80%, 68%",
    firefly: true,
    coreHsl: "50, 100%, 94%",
  },
]

interface Particle {
  x: number
  y: number
  /** Base x for wobble calculation */
  baseX: number
  baseY: number
  radius: number
  vx: number
  vy: number
  opacity: number
  spread: number
  /** Per-particle random phase offset for sine wobble */
  phase: number
  /** Drift amplitude (px) — 0 for straight-line layers */
  drift: number
  /** Drift frequency multiplier */
  driftFreq: number
  /** Pre-rendered offscreen glow sprite */
  image: HTMLCanvasElement
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/**
 * Pre-render a soft radial-gradient glow onto an offscreen canvas.
 * Much cheaper than ctx.filter = blur() per frame.
 */
function createGlowImage(
  radius: number,
  spread: number,
  opacity: number,
  hsl: string,
): HTMLCanvasElement {
  const size = Math.ceil((radius + spread) * 2)
  const off = document.createElement("canvas")
  off.width = size
  off.height = size
  const ctx = off.getContext("2d")
  if (ctx) {
    const c = size / 2
    const g = ctx.createRadialGradient(c, c, 0, c, c, radius + spread)
    g.addColorStop(0, `hsla(${hsl}, ${opacity})`)
    g.addColorStop(0.4, `hsla(${hsl}, ${opacity * 0.55})`)
    g.addColorStop(1, `hsla(${hsl}, 0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  return off
}

/**
 * Firefly sprite: a small, very bright opaque core surrounded by a wide
 * warm halo that fades out smoothly. Gives a high-contrast "solid centre,
 * glowing edges" look — like fantasy fireflies or floating embers.
 */
function createFireflyImage(
  radius: number,
  spread: number,
  opacity: number,
  hsl: string,
  coreHsl: string,
): HTMLCanvasElement {
  const size = Math.ceil((radius + spread) * 2)
  const off = document.createElement("canvas")
  off.width = size
  off.height = size
  const ctx = off.getContext("2d")
  if (ctx) {
    const c = size / 2
    const outer = radius + spread

    // Outer warm halo
    const halo = ctx.createRadialGradient(c, c, 0, c, c, outer)
    halo.addColorStop(0, `hsla(${hsl}, ${opacity * 0.9})`)
    halo.addColorStop(0.15, `hsla(${hsl}, ${opacity * 0.7})`)
    halo.addColorStop(0.45, `hsla(${hsl}, ${opacity * 0.25})`)
    halo.addColorStop(1, `hsla(${hsl}, 0)`)
    ctx.fillStyle = halo
    ctx.fillRect(0, 0, size, size)

    // Inner bright core (additive-feeling via "lighter" composite)
    ctx.globalCompositeOperation = "lighter"
    const core = ctx.createRadialGradient(c, c, 0, c, c, radius * 2.5)
    core.addColorStop(0, `hsla(${coreHsl}, ${Math.min(opacity + 0.3, 1)})`)
    core.addColorStop(0.3, `hsla(${coreHsl}, ${opacity * 0.7})`)
    core.addColorStop(1, `hsla(${coreHsl}, 0)`)
    ctx.fillStyle = core
    ctx.beginPath()
    ctx.arc(c, c, radius * 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalCompositeOperation = "source-over"
  }
  return off
}

function createParticle(w: number, h: number, layer: LayerConfig): Particle {
  const radius = rand(...layer.radius)
  const spread = rand(...layer.spread)
  const opacity = rand(...layer.opacity)
  const angle = Math.random() * Math.PI * 2
  const speed = layer.speed * rand(0.6, 1.4) // ±40 % per-particle variation
  const x = Math.random() * w
  const y = Math.random() * h

  return {
    x,
    y,
    baseX: x,
    baseY: y,
    radius,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    opacity,
    spread,
    phase: Math.random() * Math.PI * 2,
    drift: layer.drift * rand(0.5, 1.5),
    driftFreq: layer.driftFreq * rand(0.8, 1.2),
    image: layer.firefly
      ? createFireflyImage(radius, spread, opacity, layer.hsl, layer.coreHsl ?? layer.hsl)
      : createGlowImage(radius, spread, opacity, layer.hsl),
  }
}

function seedAll(w: number, h: number): Particle[] {
  return LAYERS.flatMap((layer) =>
    Array.from({ length: layer.count }, () => createParticle(w, h, layer)),
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ParticleCanvas = React.forwardRef<HTMLDivElement, ParticleCanvasProps>(
  ({ className }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const particlesRef = React.useRef<Particle[]>([])
    const rafRef = React.useRef<number>(0)
    const lastTimeRef = React.useRef<number>(0)
    /** Elapsed time in seconds — drives the sine wobble */
    const elapsedRef = React.useRef<number>(0)

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      let currentWidth = 0
      let currentHeight = 0

      // ── Sizing ──────────────────────────────────────────────────────
      const updateSize = () => {
        const parent = canvas.parentElement
        if (!parent) return
        const w = parent.clientWidth
        const h = parent.clientHeight

        if (particlesRef.current.length === 0) {
          canvas.width = w
          canvas.height = h
          currentWidth = w
          currentHeight = h
          particlesRef.current = seedAll(w, h)
        } else {
          const sx = w / (currentWidth || w)
          const sy = h / (currentHeight || h)
          canvas.width = w
          canvas.height = h
          for (const p of particlesRef.current) {
            p.x *= sx
            p.y *= sy
            p.baseX *= sx
            p.baseY *= sy
          }
          currentWidth = w
          currentHeight = h
        }

        if (prefersReducedMotion) drawStatic(ctx, w, h)
      }

      const drawStatic = (c: CanvasRenderingContext2D, w: number, h: number) => {
        c.clearRect(0, 0, w, h)
        for (const p of particlesRef.current) {
          const s = p.image.width
          c.drawImage(p.image, p.x - s / 2, p.y - s / 2)
        }
      }

      updateSize()

      if (prefersReducedMotion) {
        const ro = new ResizeObserver(updateSize)
        ro.observe(canvas.parentElement!)
        return () => ro.disconnect()
      }

      // ── Animation loop (delta-time + sine wobble) ───────────────────
      const draw = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp
        const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1)
        lastTimeRef.current = timestamp
        elapsedRef.current += dt

        const w = canvas.width
        const h = canvas.height
        const t = elapsedRef.current
        ctx.clearRect(0, 0, w, h)

        for (const p of particlesRef.current) {
          // Sine-wave wobble perpendicular to travel direction
          let drawX = p.x
          let drawY = p.y
          if (p.drift > 0) {
            const wobble = Math.sin(t * p.driftFreq + p.phase) * p.drift
            // Perpendicular to velocity direction
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1
            drawX += (-p.vy / speed) * wobble * dt * 4
            drawY += (p.vx / speed) * wobble * dt * 4
          }

          const s = p.image.width
          ctx.drawImage(p.image, drawX - s / 2, drawY - s / 2)

          // Advance base position
          p.x += p.vx * dt
          p.y += p.vy * dt

          // Wrap edges (use sprite size for seamless wrap)
          if (p.x < -s) p.x = w + s / 2
          if (p.x > w + s) p.x = -s / 2
          if (p.y < -s) p.y = h + s / 2
          if (p.y > h + s) p.y = -s / 2
        }

        rafRef.current = requestAnimationFrame(draw)
      }

      rafRef.current = requestAnimationFrame(draw)

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
  },
)
ParticleCanvas.displayName = "ParticleCanvas"
