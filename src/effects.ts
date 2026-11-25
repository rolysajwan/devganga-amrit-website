import { useEffect, type RefObject } from 'react'

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Fades/slides in every [data-reveal] element once it enters the viewport. */
export function useReveal() {
  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/**
 * One rAF-throttled scroll listener reports header state, page progress, and
 * writes a --p (-1..1) variable onto visible [data-parallax] elements.
 */
export function useScrollEffects(onScrolled: (scrolled: boolean) => void) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    )
    const progress = document.querySelector<HTMLElement>('.scroll-progress')
    const still = reducedMotion()
    let raf = 0
    let lastScrolled: boolean | undefined

    const update = () => {
      raf = 0
      const scrolled = window.scrollY > 40
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled
        onScrolled(scrolled)
      }
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      progress?.style.setProperty(
        '--scroll-progress',
        (maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0)
          .toFixed(4),
      )
      if (still) return
      const vh = window.innerHeight
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -120 || r.top > vh + 120) continue
        const p = (r.top + r.height / 2 - vh / 2) / vh
        el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(4))
      }
    }

    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    update()

    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [onScrolled])
}

/** Shares one pointer listener and animation frame across glass and primary buttons. */
export function usePointerInteractions() {
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return

    type Effect = {
      element: HTMLElement
      kind: 'glass' | 'button'
      x: number
      y: number
      opacity: number
      targetX: number
      targetY: number
      targetOpacity: number
    }

    const effects = new Map<HTMLElement, Effect>()
    let raf = 0

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const getEffect = (
      element: HTMLElement,
      kind: Effect['kind'],
    ): Effect => {
      let effect = effects.get(element)
      if (!effect) {
        const center = kind === 'glass' ? 50 : 0
        effect = {
          element,
          kind,
          x: center,
          y: center,
          opacity: 0,
          targetX: center,
          targetY: center,
          targetOpacity: 0,
        }
        effects.set(element, effect)
      }
      return effect
    }

    const reset = (effect: Effect) => {
      const center = effect.kind === 'glass' ? 50 : 0
      effect.targetX = center
      effect.targetY = center
      effect.targetOpacity = 0
    }

    const update = () => {
      raf = 0
      let needsFrame = false
      for (const [element, effect] of effects) {
        effect.x += (effect.targetX - effect.x) * 0.18
        effect.y += (effect.targetY - effect.y) * 0.18
        effect.opacity += (effect.targetOpacity - effect.opacity) * 0.18

        const settled =
          Math.abs(effect.x - effect.targetX) < 0.03 &&
          Math.abs(effect.y - effect.targetY) < 0.03 &&
          Math.abs(effect.opacity - effect.targetOpacity) < 0.003
        if (settled) {
          effect.x = effect.targetX
          effect.y = effect.targetY
          effect.opacity = effect.targetOpacity
        } else {
          needsFrame = true
        }

        if (effect.kind === 'glass') {
          element.style.setProperty(
            '--glass-reflection-x',
            `${effect.x.toFixed(2)}%`,
          )
          element.style.setProperty(
            '--glass-reflection-y',
            `${effect.y.toFixed(2)}%`,
          )
          element.style.setProperty(
            '--glass-reflection-opacity',
            effect.opacity.toFixed(3),
          )
        } else {
          element.style.setProperty('--magnetic-x', `${effect.x.toFixed(2)}px`)
          element.style.setProperty('--magnetic-y', `${effect.y.toFixed(2)}px`)
        }

        const atRest =
          effect.targetOpacity === 0 &&
          (effect.kind === 'glass'
            ? Math.abs(effect.x - 50) < 0.03 && Math.abs(effect.y - 50) < 0.03
            : Math.abs(effect.x) < 0.03 && Math.abs(effect.y) < 0.03)
        if (settled && atRest) {
          element.style.removeProperty('--glass-reflection-x')
          element.style.removeProperty('--glass-reflection-y')
          element.style.removeProperty('--glass-reflection-opacity')
          element.style.removeProperty('--magnetic-x')
          element.style.removeProperty('--magnetic-y')
          effects.delete(element)
        }
      }
      if (needsFrame) schedule()
    }

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const target = event.target instanceof Element ? event.target : null
      const glass = target?.closest<HTMLElement>('.glass') ?? null
      const button = target?.closest<HTMLElement>('.btn-primary') ?? null
      let shouldSchedule = false

      for (const effect of effects.values()) {
        if (effect.element !== glass && effect.element !== button) {
          reset(effect)
          shouldSchedule = true
        }
      }

      if (glass) {
        const bounds = glass.getBoundingClientRect()
        if (bounds.width && bounds.height) {
          const effect = getEffect(glass, 'glass')
          effect.targetX = Math.max(
            0,
            Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
          )
          effect.targetY = Math.max(
            0,
            Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100),
          )
          effect.targetOpacity = 0.24
          shouldSchedule = true
        }
      }

      if (button) {
        const bounds = button.getBoundingClientRect()
        if (bounds.width && bounds.height) {
          const effect = getEffect(button, 'button')
          effect.targetX =
            (((event.clientX - bounds.left) / bounds.width) * 2 - 1) * 3.5
          effect.targetY =
            (((event.clientY - bounds.top) / bounds.height) * 2 - 1) * 2.5
          effect.targetOpacity = 1
          shouldSchedule = true
        }
      }
      if (shouldSchedule) schedule()
    }

    const pointerOut = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const related = event.relatedTarget
      const next = related instanceof Node ? related : null
      for (const selector of ['.glass', '.btn-primary']) {
        const element = target?.closest<HTMLElement>(selector)
        if (!element || (next && element.contains(next))) continue
        const effect = effects.get(element)
        if (effect) {
          reset(effect)
          schedule()
        }
      }
    }

    const resetAll = () => {
      if (!effects.size) return
      for (const effect of effects.values()) reset(effect)
      schedule()
    }

    document.addEventListener('pointermove', pointerMove, { passive: true })
    document.addEventListener('pointerout', pointerOut)
    window.addEventListener('blur', resetAll)

    return () => {
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerout', pointerOut)
      window.removeEventListener('blur', resetAll)
      if (raf) cancelAnimationFrame(raf)
      for (const element of effects.keys()) {
        element.style.removeProperty('--glass-reflection-x')
        element.style.removeProperty('--glass-reflection-y')
        element.style.removeProperty('--glass-reflection-opacity')
        element.style.removeProperty('--magnetic-x')
        element.style.removeProperty('--magnetic-y')
      }
    }
  }, [])
}

/** Tracks which section is under the middle of the viewport. */
export function useActiveSection(ids: string[], onChange: (id: string) => void) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onChange(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
    // ids is a stable module-level list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Smoothed pointer position (-1..1) written as --mx / --my on the element.
 * Only runs for fine pointers; touch users get the ambient float animation.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || !finePointer()) return

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const loop = () => {
      cx += (tx - cx) * 0.075
      cy += (ty - cy) * 0.075
      el.style.setProperty('--mx', cx.toFixed(4))
      el.style.setProperty('--my', cy.toFixed(4))
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      kick()
    }
    const leave = () => {
      tx = 0
      ty = 0
      kick()
    }

    el.addEventListener('pointermove', move, { passive: true })
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref])
}
