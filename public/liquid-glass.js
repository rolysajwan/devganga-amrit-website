const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function midpoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

function closedCurve(points) {
  const start = midpoint(points[points.length - 1], points[0])
  let path = `M ${start[0].toFixed(2)} ${start[1].toFixed(2)}`
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i]
    const next = points[(i + 1) % points.length]
    const end = midpoint(point, next)
    path += ` Q ${point[0].toFixed(2)} ${point[1].toFixed(2)} ${end[0].toFixed(2)} ${end[1].toFixed(2)}`
  }
  return `${path} Z`
}

function openCurve(points) {
  let path = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const previous = points[Math.max(0, i - 1)]
    const start = points[i]
    const end = points[i + 1]
    const next = points[Math.min(points.length - 1, i + 2)]
    const control1 = [
      start[0] + (end[0] - previous[0]) / 6,
      start[1] + (end[1] - previous[1]) / 6,
    ]
    const control2 = [
      end[0] - (next[0] - start[0]) / 6,
      end[1] - (next[1] - start[1]) / 6,
    ]
    path += ` C ${control1[0].toFixed(2)} ${control1[1].toFixed(2)} ${control2[0].toFixed(2)} ${control2[1].toFixed(2)} ${end[0].toFixed(2)} ${end[1].toFixed(2)}`
  }
  return path
}

function makeLiquidPaths(progress) {
  const phase = progress * Math.PI * 1.8
  const centerline = []
  const edges = []
  const reflection = []
  const sampleCount = 44

  for (let i = 0; i <= sampleCount; i += 1) {
    const t = i / sampleCount
    const angle = Math.PI * 2 * t
    const x =
      500 +
      (178 + 48 * Math.sin(phase * 0.55)) * Math.sin(angle + phase) +
      32 * Math.sin(2 * angle - phase * 0.6)
    const y = -90 + 1180 * t + 34 * Math.sin(angle + phase * 0.75)
    centerline.push([x, y])
  }

  for (let i = 0; i <= sampleCount; i += 1) {
    const [x, y] = centerline[i]
    const previous = centerline[Math.max(0, i - 1)]
    const next = centerline[Math.min(sampleCount, i + 1)]
    const dx = next[0] - previous[0]
    const dy = next[1] - previous[1]
    const length = Math.hypot(dx, dy) || 1
    const normalX = -dy / length
    const normalY = dx / length
    const t = i / sampleCount
    const taper = Math.pow(Math.sin(Math.PI * t), 0.72)
    const width =
      (13 + 115 * taper) *
      (0.76 + 0.24 * Math.sin(Math.PI * 2 * t + phase + 1.1))

    edges.push([x + normalX * width, y + normalY * width])
    reflection.push([
      x + normalX * width * 0.46,
      y + normalY * width * 0.46,
    ])
  }

  for (let i = sampleCount; i >= 0; i -= 1) {
    const [x, y] = centerline[i]
    const previous = centerline[Math.max(0, i - 1)]
    const next = centerline[Math.min(sampleCount, i + 1)]
    const dx = next[0] - previous[0]
    const dy = next[1] - previous[1]
    const length = Math.hypot(dx, dy) || 1
    const normalX = -dy / length
    const normalY = dx / length
    const t = i / sampleCount
    const taper = Math.pow(Math.sin(Math.PI * t), 0.72)
    const width =
      (13 + 115 * taper) *
      (0.76 + 0.24 * Math.sin(Math.PI * 2 * t + phase + 1.1))

    edges.push([x - normalX * width, y - normalY * width])
  }

  return {
    body: closedCurve(edges),
    reflection: openCurve(reflection),
    phase,
  }
}

function updateLiquidGlass(progress) {
  if (reducedMotion.matches) return

  const scene = document.querySelector('.liquid-glass-scene')
  if (!scene) return
  const form = scene.querySelector('.liquid-glass-form')
  const bodies = scene.querySelectorAll('[data-liquid-body]')
  const highlight = scene.querySelector('[data-liquid-highlight]')
  const reflectionGradient = scene.querySelector('#liquid-reflection')
  if (!form || bodies.length === 0 || !highlight || !reflectionGradient) return

  const normalized = Math.min(1, Math.max(0, progress))
  const { body, reflection, phase } = makeLiquidPaths(normalized)
  bodies.forEach((path) => path.setAttribute('d', body))
  highlight.setAttribute('d', reflection)
  form.setAttribute(
    'transform',
    `rotate(${(-24 + normalized * 56).toFixed(2)} 500 500) translate(${(Math.sin(phase * 0.5) * 34).toFixed(2)} 0)`,
  )

  const lightPosition = 12 + normalized * 76
  reflectionGradient.setAttribute('x1', `${lightPosition.toFixed(2)}%`)
  reflectionGradient.setAttribute('x2', `${(lightPosition + 22).toFixed(2)}%`)
}

window.DevgangaLiquidGlass = Object.freeze({ update: updateLiquidGlass })

requestAnimationFrame(() => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  updateLiquidGlass(
    maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0,
  )
})
