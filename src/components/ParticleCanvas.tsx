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

// Global radius bounds across all layers — used to compute per-particle depth
const GLOBAL_RADIUS_MIN = 1.5
const GLOBAL_RADIUS_MAX = 18

const LAYERS: LayerConfig[] = [
  // Back — large, slow emerald glows: soft bokeh, very diffuse
  {
    count: 16,
    radius: [8, 18],
    spread: [18, 32],
    opacity: [0.06, 0.22],
    speed: 14,
    drift: 0,
    driftFreq: 0,
    hsl: "160, 84%, 39%",
  },
  // Mid — teal sparkles, moderate definition
  {
    count: 18,
    radius: [2, 7],
    spread: [4, 10],
    opacity: [0.15, 0.5],
    speed: 28,
    drift: 0,
    driftFreq: 0,
    hsl: "174, 72%, 52%",
  },
  // Front — fantasy fireflies: hard bright core + tight halo
  {
    count: 14,
    radius: [1.5, 3.5],
    spread: [10, 20],
    opacity: [0.6, 0.9],
    speed: 36,
    drift: 0,
    driftFreq: 0,
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
  /** Depth factor 0 (foreground) → 1 (background) for scroll parallax */
  depth: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/**
 * Pre-render a soft radial-gradient glow onto an offscreen canvas.
 * `depth` (0 = foreground / solid, 1 = background / diffuse) controls
 * how solid the centre is vs. how much it bleeds into a soft bokeh.
 */
function createGlowImage(
  radius: number,
  spread: number,
  opacity: number,
  hsl: string,
  depth: number,
): HTMLCanvasElement {
  const size = Math.ceil((radius + spread) * 2)
  const off = document.createElement("canvas")
  off.width = size
  off.height = size
  const ctx = off.getContext("2d")
  if (ctx) {
    const c = size / 2
    const g = ctx.createRadialGradient(c, c, 0, c, c, radius + spread)

    // Depth-driven gradient shape:
    //   foreground (depth≈0) → solid core that holds colour longer, tight fade
    //   background (depth≈1) → core fades fast, wide soft bleed
    const coreFade   = 1 - depth * 0.55          // centre opacity multiplier  1.0 → 0.45
    const midStop    = 0.2 + (1 - depth) * 0.35  // where the mid ring sits    0.2 → 0.55
    const midFade    = 0.25 + (1 - depth) * 0.5   // mid-ring opacity factor   0.25 → 0.75

    g.addColorStop(0,       `hsla(${hsl}, ${opacity * coreFade})`)
    g.addColorStop(midStop,  `hsla(${hsl}, ${opacity * midFade})`)
    g.addColorStop(1,        `hsla(${hsl}, 0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  return off
}

/**
 * Firefly sprite: a small, very bright opaque core surrounded by a
 * warm halo.  `depth` tightens or loosens the halo to reinforce the
 * depth-of-field illusion (fireflies are foreground, so depth is low).
 */
function createFireflyImage(
  radius: number,
  spread: number,
  opacity: number,
  hsl: string,
  coreHsl: string,
  depth: number,
): HTMLCanvasElement {
  const size = Math.ceil((radius + spread) * 2)
  const off = document.createElement("canvas")
  off.width = size
  off.height = size
  const ctx = off.getContext("2d")
  if (ctx) {
    const c = size / 2
    const outer = radius + spread

    // Halo tightens for foreground particles (low depth)
    const haloFade = 0.8 + depth * 0.2  // 0.8 → 1.0

    // Outer warm halo
    const halo = ctx.createRadialGradient(c, c, 0, c, c, outer)
    halo.addColorStop(0,    `hsla(${hsl}, ${opacity * 0.9 * haloFade})`)
    halo.addColorStop(0.12, `hsla(${hsl}, ${opacity * 0.65 * haloFade})`)
    halo.addColorStop(0.4,  `hsla(${hsl}, ${opacity * 0.18})`)
    halo.addColorStop(1,    `hsla(${hsl}, 0)`)
    ctx.fillStyle = halo
    ctx.fillRect(0, 0, size, size)

    // Inner bright core (additive-feeling via "lighter" composite)
    // Foreground fireflies get an even punchier core
    const coreBoost = 0.3 + (1 - depth) * 0.15  // 0.30 → 0.45 extra
    ctx.globalCompositeOperation = "lighter"
    const core = ctx.createRadialGradient(c, c, 0, c, c, radius * 2.2)
    core.addColorStop(0,   `hsla(${coreHsl}, ${Math.min(opacity + coreBoost, 1)})`)
    core.addColorStop(0.25, `hsla(${coreHsl}, ${opacity * 0.75})`)
    core.addColorStop(1,   `hsla(${coreHsl}, 0)`)
    ctx.fillStyle = core
    ctx.beginPath()
    ctx.arc(c, c, radius * 2.2, 0, Math.PI * 2)
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

  // Depth factor: 0 = smallest particle (foreground), 1 = largest (background)
  const depth = Math.min(
    Math.max((radius - GLOBAL_RADIUS_MIN) / (GLOBAL_RADIUS_MAX - GLOBAL_RADIUS_MIN), 0),
    1,
  )

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
    depth,
    image: layer.firefly
      ? createFireflyImage(radius, spread, opacity, layer.hsl, layer.coreHsl ?? layer.hsl, depth)
      : createGlowImage(radius, spread, opacity, layer.hsl, depth),
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
    /** Current scroll progress 0-1 for parallax offset */
    const scrollYRef = React.useRef<number>(0)

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

      // ── Scroll tracking for inter-layer parallax ────────────────────
      // Tracks raw scroll position. Each layer gets a different speed
      // multiplier based on its depth, creating separation between layers.
      const onScroll = () => {
        scrollYRef.current = window.scrollY
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()

      // ── Animation loop (delta-time + scroll parallax) ───────────────
      const draw = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp
        const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1)
        lastTimeRef.current = timestamp
        elapsedRef.current += dt

        const w = canvas.width
        const h = canvas.height
        const t = elapsedRef.current
        const scrollY = scrollYRef.current
        ctx.clearRect(0, 0, w, h)

        for (const p of particlesRef.current) {
          // Inter-layer parallax: each layer scrolls at a different rate.
          //   back  (depth≈1) → speed 0.05  (barely moves, feels distant)
          //   mid   (depth≈0.3) → speed 0.18 (moderate shift)
          //   front (depth≈0) → speed 0.35 (moves fastest, feels close)
          // The offset is modulo canvas height so particles don't vanish.
          const parallaxSpeed = 0.05 + (1 - p.depth) * 0.3
          const scrollOffset = -(scrollY * parallaxSpeed) % h

          // Sine-wave wobble perpendicular to travel direction
          let drawX = p.x
          let drawY = p.y + scrollOffset
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
        window.removeEventListener("scroll", onScroll)
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
