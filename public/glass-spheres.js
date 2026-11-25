const sphereLayers = {
  far: { speed: 0.035 },
  mid: { speed: 0.13 },
  near: { speed: 0.29 },
}

const sphereDesigns = [
  {
    layer: 'far',
    x: 0.83,
    y: 0.17,
    size: 0.072,
    color: '#acd9e8',
    opacity: 0.76,
    drift: 0.16,
    rotation: 0.00012,
    phase: 0.4,
  },
  {
    layer: 'far',
    x: 0.15,
    y: 0.59,
    size: 0.055,
    color: '#c4ccd5',
    opacity: 0.68,
    drift: -0.13,
    rotation: -0.00016,
    phase: 1.8,
    mobile: false,
  },
  {
    layer: 'far',
    x: 0.76,
    y: 0.98,
    size: 0.063,
    color: '#c7bce0',
    opacity: 0.82,
    drift: -0.1,
    rotation: 0.00015,
    phase: 2.7,
  },
  {
    layer: 'mid',
    x: 0.68,
    y: 0.39,
    size: 0.13,
    color: '#dac89f',
    opacity: 0.9,
    drift: -0.12,
    rotation: -0.00034,
    phase: 1.1,
  },
  {
    layer: 'mid',
    x: 0.1,
    y: 0.83,
    size: 0.105,
    color: '#afd8c8',
    opacity: 0.84,
    drift: 0.14,
    rotation: 0.00042,
    phase: 3.2,
    mobile: false,
  },
  {
    layer: 'mid',
    x: 0.96,
    y: 0.11,
    size: 0.088,
    color: '#dfc1c8',
    opacity: 0.88,
    drift: -0.11,
    rotation: -0.00038,
    phase: 4.1,
  },
  {
    layer: 'near',
    x: 0.015,
    y: 0.43,
    size: 0.22,
    color: '#a9d9e3',
    opacity: 0.96,
    drift: 0.095,
    rotation: 0.00078,
    phase: 0.8,
  },
  {
    layer: 'near',
    x: 0.91,
    y: 0.81,
    size: 0.235,
    color: '#dfc99e',
    opacity: 0.93,
    drift: -0.08,
    rotation: -0.00082,
    phase: 2.2,
  },
  {
    layer: 'near',
    x: 0.5,
    y: 1.18,
    size: 0.17,
    color: '#c3b9df',
    opacity: 0.98,
    drift: 0.07,
    rotation: 0.00068,
    phase: 3.8,
    mobile: false,
  },
]

const defsFor = (id, color) => `
  <radialGradient id="${id}-body" cx="34%" cy="28%" r="78%">
    <stop offset="0%" stop-color="#fff" stop-opacity=".48" />
    <stop offset="16%" stop-color="${color}" stop-opacity=".2" />
    <stop offset="58%" stop-color="${color}" stop-opacity=".075" />
    <stop offset="84%" stop-color="#fff" stop-opacity=".12" />
    <stop offset="96%" stop-color="${color}" stop-opacity=".28" />
    <stop offset="100%" stop-color="${color}" stop-opacity=".08" />
  </radialGradient>
  <radialGradient id="${id}-rim" cx="50%" cy="50%" r="50%">
    <stop offset="82%" stop-color="${color}" stop-opacity=".04" />
    <stop offset="94%" stop-color="#fff" stop-opacity=".58" />
    <stop offset="98%" stop-color="${color}" stop-opacity=".48" />
    <stop offset="100%" stop-color="#fff" stop-opacity=".74" />
  </radialGradient>
  <linearGradient id="${id}-streak" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0" />
    <stop offset="38%" stop-color="#fff" stop-opacity=".13" />
    <stop offset="52%" stop-color="#fff" stop-opacity=".72" />
    <stop offset="67%" stop-color="#fff" stop-opacity=".18" />
    <stop offset="100%" stop-color="#fff" stop-opacity="0" />
  </linearGradient>
  <clipPath id="${id}-clip"><circle r="100" /></clipPath>
  <filter id="${id}-soft-highlight" x="-30%" y="-70%" width="160%" height="240%">
    <feGaussianBlur stdDeviation="1.6" />
  </filter>
`

const artFor = (id) => `
  <circle r="100" fill="url(#${id}-body)" />
  <g clip-path="url(#${id}-clip)">
    <path d="M-12 70 C18 45 39 36 67 44 C86 50 99 68 108 88 L108 110 L-10 110Z"
      fill="#fff" opacity=".055" />
    <path d="M-8 63 C18 45 40 39 62 45 C82 50 97 66 105 85"
      fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.1" />
    <path d="M-4 77 C19 59 41 54 62 59 C78 63 91 74 99 87"
      fill="none" stroke="url(#${id}-streak)" stroke-width="3.2" />
    <path d="M24 -5 C42 11 51 24 48 39 C45 51 36 57 30 66"
      fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="1.15" />
    <path d="M61 3 C76 18 84 34 82 48"
      fill="none" stroke="#fff" stroke-opacity=".2" stroke-width=".8" />
    <ellipse cx="37" cy="24" rx="22" ry="7" transform="rotate(-35 37 24)"
      fill="#fff" opacity=".44" filter="url(#${id}-soft-highlight)" />
    <ellipse cx="36" cy="22" rx="13" ry="3.1" transform="rotate(-35 36 22)"
      fill="#fff" opacity=".78" />
    <ellipse cx="53" cy="12" rx="5.2" ry="2.1" transform="rotate(-35 53 12)"
      fill="#fff" opacity=".92" />
  </g>
  <circle r="98.8" fill="none" stroke="url(#${id}-rim)" stroke-width="2.4" />
  <circle r="95.8" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width=".65" />
`

function renderScene(scene, width, height, maxScroll, mobile) {
  const activeDesigns = sphereDesigns.filter((sphere) => !mobile || sphere.mobile !== false)
  const defs = activeDesigns
    .map((sphere, index) => defsFor(`sphere-${index}`, sphere.color))
    .join('')
  const spacing = height * 2.6
  const items = []
  const radiusBase = Math.min(width, height)

  activeDesigns.forEach((sphere, index) => {
    const speed = sphereLayers[sphere.layer].speed
    const copies = Math.ceil((maxScroll * speed) / spacing) + 3
    const radius = Math.min(radiusBase * sphere.size, width * 0.34)

    for (let copy = -1; copy <= copies; copy += 1) {
      const variation = ((copy % 3) + 3) % 3
      const copyScale = [1, 0.94, 1.06][variation]
      const xOffset = (variation - 1) * Math.min(width * 0.055, 38)
      const id = `sphere-${index}`
      const outer = `
        <g class="sphere-item" data-x="${(sphere.x * width + xOffset).toFixed(2)}"
          data-y="${(sphere.y * height + copy * spacing).toFixed(2)}"
          data-speed="${speed}" data-drift="${sphere.drift}"
          data-rotation="${sphere.rotation}" data-phase="${sphere.phase + copy * 0.22}"
          opacity="${sphere.opacity}">
          <g class="sphere-art" transform="scale(${(radius * copyScale / 100).toFixed(4)})">
            ${artFor(id)}
          </g>
        </g>`
      items.push(outer)
    }
  })

  scene.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="none" focusable="false">
      <defs>${defs}</defs>
      ${items.join('')}
    </svg>`

  return Array.from(scene.querySelectorAll('.sphere-item')).map((element) => ({
    element,
    x: Number(element.dataset.x),
    y: Number(element.dataset.y),
    speed: Number(element.dataset.speed),
    drift: Number(element.dataset.drift),
    rotation: Number(element.dataset.rotation),
    phase: Number(element.dataset.phase),
  }))
}

function mount(scene) {
  if (scene.dataset.mounted === 'true') return () => {}
  scene.dataset.mounted = 'true'

  let raf = 0
  let items = []
  let height = 0
  let destroyed = false
  let reducedMotionApplied = false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobileQuery = window.matchMedia('(max-width: 640px)')

  const update = () => {
    raf = 0
    if (destroyed) return
    if (reducedMotion.matches) {
      if (!reducedMotionApplied) {
        items.forEach((item) => {
          item.element.setAttribute(
            'transform',
            `translate(${item.x.toFixed(2)} ${item.y.toFixed(2)})`,
          )
        })
        reducedMotionApplied = true
      }
      return
    }

    reducedMotionApplied = false
    const scrollY = window.scrollY
    items.forEach((item) => {
      const y = item.y - scrollY * item.speed
      const x = item.x + scrollY * item.speed * item.drift
      const scale =
        1 +
        Math.sin((scrollY / Math.max(height, 1)) * 0.52 + item.phase) * 0.025
      const rotation = scrollY * item.rotation
      item.element.setAttribute(
        'transform',
        `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rotation.toFixed(3)}) scale(${scale.toFixed(4)})`,
      )
    })
  }

  const schedule = () => {
    if (!raf && !(reducedMotion.matches && reducedMotionApplied)) {
      raf = window.requestAnimationFrame(update)
    }
  }

  const rebuild = () => {
    const width = Math.max(1, window.innerWidth)
    height = Math.max(1, window.innerHeight)
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - height,
    )
    items = renderScene(scene, width, height, maxScroll, mobileQuery.matches)
    reducedMotionApplied = false
    schedule()
  }

  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', rebuild)
  reducedMotion.addEventListener('change', schedule)
  mobileQuery.addEventListener('change', rebuild)
  rebuild()

  return () => {
    destroyed = true
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', rebuild)
    reducedMotion.removeEventListener('change', schedule)
    mobileQuery.removeEventListener('change', rebuild)
    if (raf) window.cancelAnimationFrame(raf)
    scene.replaceChildren()
    delete scene.dataset.mounted
  }
}

window.DevgangaGlassSpheres = Object.freeze({ mount })

function mountAutomaticScenes() {
  document
    .querySelectorAll('[data-glass-spheres="auto"]')
    .forEach((scene) => mount(scene))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAutomaticScenes, {
    once: true,
  })
} else {
  mountAutomaticScenes()
}
