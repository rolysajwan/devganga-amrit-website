import { useEffect, useRef, type ReactNode } from 'react'
import { reducedMotion } from './effects'
import './DevprayagDepthScene.css'

type Props = {
  /** Devprayag aerial photograph (background layer). */
  aerialSrc: string
  /** Alt text for the aerial photograph. */
  aerialAlt: string
  /** Existing product bottle artwork, shown unaltered (foreground layer). */
  productSrc: string
  /** Content that must stay readable and still, e.g. the confluence chip. */
  children?: ReactNode
}

/**
 * Three-layer scroll parallax for the Devprayag section.
 *
 *   background  – aerial photograph: slowest, with a slow push-in
 *   midground   – soft river-light veil: medium
 *   foreground  – product bottle card: fastest, rises through the frame
 *
 * One scrubbed GSAP ScrollTrigger drives all three layers. There is no
 * pinning, so the page height and layout never change. At scroll progress 50%
 * (frame centred in the viewport) every layer sits at its natural position.
 *
 * GSAP is loaded on demand and not at all when reduced motion is requested.
 * Everything GSAP creates lives inside one gsap.matchMedia(), which
 * `revert()` removes completely on unmount.
 */
export default function DevprayagDepthScene({
  aerialSrc,
  aerialAlt,
  productSrc,
  children,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const mistRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const bg = bgRef.current
    const mist = mistRef.current
    const product = productRef.current
    if (!root || !bg || !mist || !product) return
    if (reducedMotion()) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const mm = gsap.matchMedia()
        mm.add(
          {
            desktop:
              '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
            mobile:
              '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
          },
          (context) => {
            const mobile = Boolean(context.conditions?.mobile)

            // Travel, in % of each layer's own height, either side of rest.
            const bgTravel = mobile ? 3 : 5
            const mistTravel = mobile ? 6 : 10
            const productTravel = mobile ? 9 : 14

            gsap
              .timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                  trigger: root,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                bg,
                { yPercent: -bgTravel, scale: 1.04 },
                { yPercent: bgTravel, scale: 1.12 },
                0,
              )
              .fromTo(
                mist,
                { yPercent: -mistTravel },
                { yPercent: mistTravel },
                0,
              )
              .fromTo(
                product,
                { yPercent: productTravel },
                { yPercent: -productTravel },
                0,
              )
          },
        )

        cleanup = () => mm.revert()
      })
      .catch(() => {
        // If GSAP fails to load, the static layered composition stays in place.
      })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <div ref={rootRef} className="origin-frame dg-depth">
      <div ref={bgRef} className="dg-depth__layer dg-depth__bg">
        <img
          src={aerialSrc}
          width={864}
          height={1536}
          alt={aerialAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        ref={mistRef}
        className="dg-depth__layer dg-depth__mist"
        aria-hidden="true"
      />

      <div
        ref={productRef}
        className="dg-depth__layer dg-depth__product"
        aria-hidden="true"
      >
        <img
          src={productSrc}
          width={768}
          height={1151}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      {children}
    </div>
  )
}
