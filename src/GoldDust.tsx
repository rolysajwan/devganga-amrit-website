import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  ph: number
  sp: number
  kind: 0 | 1
}

type Props = {
  /** Multiplier for particle count (1 = hero density). */
  density?: number
}

/**
 * Lightweight ambient canvas: champagne-gold dust plus tiny pale droplets.
 * Pre-rendered sprites (no per-frame blur), paused off-screen / hidden tab,
 * throttled on small screens, static for prefers-reduced-motion.
 */
export default function GoldDust({ density = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 720
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75)

    const makeSprite = (rgb: string) => {
      const s = document.createElement('canvas')
      s.width = s.height = 64
      const c = s.getContext('2d')
      if (c) {
        const g = c.createRadialGradient(32, 32, 0, 32, 32, 32)
        g.addColorStop(0, `rgba(${rgb},1)`)
        g.addColorStop(0.25, `rgba(${rgb},0.5)`)
        g.addColorStop(1, `rgba(${rgb},0)`)
        c.fillStyle = g
        c.fillRect(0, 0, 64, 64)
      }
      return s
    }
    const sprites = [makeSprite('228,198,134'), makeSprite('214,240,228')]

    let w = 0
    let h = 0
    let parts: Particle[] = []

    const make = (anywhere: boolean): Particle => {
      const z = Math.random()
      const kind: 0 | 1 = Math.random() < 0.72 ? 0 : 1
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 12,
        r: (kind === 0 ? 3 : 2.2) + z * (kind === 0 ? 7 : 4),
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(0.04 + z * 0.2),
        a: 0.25 + Math.random() * 0.5,
        ph: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 0.8,
        kind,
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      if (!w || !h) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((small ? 22 : 60) * density)
      parts = Array.from({ length: count }, () => make(true))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.vx + Math.sin(t * 0.0004 * p.sp + p.ph) * 0.1
        p.y += p.vy
        if (p.y < -20) Object.assign(p, make(false))
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.0012 * p.sp + p.ph)
        ctx.globalAlpha = p.a * twinkle
        const s = p.r * 2
        ctx.drawImage(sprites[p.kind], p.x - p.r, p.y - p.r, s, s)
      }
      ctx.globalAlpha = 1
    }

    resize()

    if (reduced) {
      draw(0)
      const ro = new ResizeObserver(() => {
        resize()
        draw(0)
      })
      ro.observe(canvas)
      return () => ro.disconnect()
    }

    let raf = 0
    let last = 0
    let visible = true
    const minDelta = small ? 33 : 0

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (t - last < minDelta) return
      last = t
      draw(t)
    }
    const start = () => {
      if (!raf && visible && document.visibilityState === 'visible') {
        raf = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') start()
      else stop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return <canvas ref={ref} className="gold-dust" aria-hidden="true" />
}
