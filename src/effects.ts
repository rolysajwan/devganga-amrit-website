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
 * One rAF-throttled scroll listener: reports whether the page has scrolled
 * and writes a --p (-1..1) progress variable onto [data-parallax] elements.
 */
export function useScrollEffects(onScrolled: (scrolled: boolean) => void) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    )
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
