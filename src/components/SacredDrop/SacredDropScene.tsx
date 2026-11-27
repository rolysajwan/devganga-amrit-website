
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './sacredDrop.css'

/**
 * DEVGANGA AMRIT – Sacred Water Droplet
 * Fixed, transparent, pointer-events:none WebGL layer driven by real page scroll.
 * Tune the look/journey from the CONFIG block below.
 */

type JourneyState = { p: number; x: number; z: number; ry: number; scale: number }

const CONFIG = {
  /** Journey length in viewport heights of scrolling (hero -> close-up). */
  scrollRange: 3,
  /** Progress after which the canvas fades out (0..1). */
  fadeFrom: 0.8,
  /** Desktop journey states. Mobile reuses them with x narrowed (see applyState). */
  states: [
    { p: 0, x: 1.7, z: 0, ry: 0, scale: 1 },
    { p: 0.5, x: -1.7, z: 0.6, ry: 2.4, scale: 1.05 },
    { p: 1, x: 0, z: 4.6, ry: 5.2, scale: 1.15 },
  ] as JourneyState[],
}

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

function SacredDropScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // The canvas is created inside the effect so React StrictMode's
    // mount -> cleanup -> mount never reuses a lost WebGL context.
    const canvas = document.createElement('canvas')
    host.appendChild(canvas)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      host.removeChild(canvas)
      return // WebGL unavailable: the site simply renders without the droplet
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isMobile = mobileQuery.matches
    let reduce = motionQuery.matches

    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60)
    camera.name = 'Cinematic_Camera'
    camera.position.set(0, 0.1, 9)

    // ---- Environment (procedural, no network assets) ----
    const envScene = new THREE.Scene()
    const envDisposables: { dispose: () => void }[] = []
    const addEnv = (mesh: THREE.Mesh) => {
      envScene.add(mesh)
      envDisposables.push(mesh.geometry, mesh.material as THREE.Material)
    }
    addEnv(
      new THREE.Mesh(
        new THREE.SphereGeometry(20, 24, 16),
        new THREE.MeshBasicMaterial({ color: 0x9fc4cf, side: THREE.BackSide }),
      ),
    )
    const panel = (
      color: number,
      intensity: number,
      w: number,
      h: number,
      pos: [number, number, number],
    ) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(color).multiplyScalar(intensity),
          side: THREE.DoubleSide,
        }),
      )
      m.position.set(...pos)
      m.lookAt(0, 0, 0)
      addEnv(m)
    }
    panel(0xc8a66a, 6, 6, 10, [-9, 3, 4])
    panel(0xf4efe5, 3, 10, 3, [0, 10, 2])
    panel(0x2e8a8c, 2.2, 8, 6, [9, 0, -3])
    panel(0x101b2a, 1, 14, 6, [0, -10, 0])
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(envScene, 0.04)
    scene.environment = envRT.texture
    pmrem.dispose()
    envDisposables.forEach((d) => d.dispose())

    // ---- Droplet ----
    const pts: THREE.Vector2[] = []
    const N = 40
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI
      const k = Math.sin(t)
      const u = (1 - Math.cos(t)) / 2
      const r = k * (0.95 - 0.38 * Math.pow(u, 2.2))
      const y = -Math.cos(t) + 0.55 * Math.pow(u, 3.2)
      pts.push(new THREE.Vector2(Math.max(r, 0.0001), y))
    }
    const dropGeo = new THREE.LatheGeometry(pts, 72)
    dropGeo.computeVertexNormals()
    const dropMat = new THREE.MeshPhysicalMaterial({
      color: 0xcfeeea,
      roughness: 0.02,
      metalness: 0,
      transmission: 1,
      thickness: 1.6,
      ior: 1.333,
      attenuationColor: new THREE.Color(0x2aa3a0),
      attenuationDistance: 3.2,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xfff1d0),
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.4,
    })
    const drop = new THREE.Mesh(dropGeo, dropMat)
    drop.name = 'Sacred_Water_Droplet'
    const rig = new THREE.Group()
    rig.name = 'Droplet_Rig'
    rig.add(drop)
    scene.add(rig)

    // ---- Lights ----
    const rim = new THREE.DirectionalLight(0xc8a66a, 3.2)
    rim.name = 'Golden_Rim_Light'
    rim.position.set(-4, 3, -3)
    const key = new THREE.DirectionalLight(0xf4efe5, 0.9)
    key.name = 'Soft_Key_Light'
    key.position.set(3, 4, 5)
    const fill = new THREE.PointLight(0x2e8a8c, 6, 20)
    fill.name = 'Teal_Fill_Light'
    fill.position.set(4, -2, -2)
    scene.add(rim, key, fill, new THREE.AmbientLight(0x101b2a, 0.6))

    // ---- Particles ----
    const PC = isMobile ? 50 : 90
    const pArr = new Float32Array(PC * 3)
    const seeds: number[] = []
    for (let i = 0; i < PC; i++) {
      pArr[i * 3] = (Math.random() - 0.5) * 14
      pArr[i * 3 + 1] = (Math.random() - 0.5) * 9
      pArr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
      seeds.push(Math.random() * Math.PI * 2)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 32
    const sctx = sprite.getContext('2d')
    if (sctx) {
      const g = sctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      g.addColorStop(0, 'rgba(255,255,255,.95)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      sctx.fillStyle = g
      sctx.fillRect(0, 0, 32, 32)
    }
    const spriteTex = new THREE.CanvasTexture(sprite)
    const pMat = new THREE.PointsMaterial({
      map: spriteTex,
      size: 0.09,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
    })
    const particles = new THREE.Points(pGeo, pMat)
    particles.name = 'Suspended_Particles'
    scene.add(particles)

    // ---- Scroll-driven journey ----
    let target = 0
    let prog = 0
    let dirty = true
    const readScroll = () => {
      target = clamp01(window.scrollY / (window.innerHeight * CONFIG.scrollRange))
      dirty = true
    }

    const base = { x: 0, z: 0, ry: 0, scale: 1 }
    const applyState = (p: number) => {
      const s = CONFIG.states
      const [a, b] = p > s[1].p ? [s[1], s[2]] : [s[0], s[1]]
      const t = ease((p - a.p) / (b.p - a.p))
      const mix = (k: 'x' | 'z' | 'ry' | 'scale') => a[k] + (b[k] - a[k]) * t
      base.x = mix('x') * (isMobile ? 0.25 : 1)
      base.z = mix('z')
      base.ry = mix('ry')
      base.scale = mix('scale') * (isMobile ? 0.78 : 1)
    }

    const resize = () => {
      const w = host.clientWidth || window.innerWidth
      const h = host.clientHeight || window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.fov = w / h < 0.8 ? 44 : 34
      camera.updateProjectionMatrix()
      dirty = true
    }
    const onMobile = (e: MediaQueryListEvent) => {
      isMobile = e.matches
      resize()
    }
    const onMotion = (e: MediaQueryListEvent) => {
      reduce = e.matches
      dirty = true
    }

    window.addEventListener('scroll', readScroll, { passive: true })
    window.addEventListener('resize', resize)
    mobileQuery.addEventListener('change', onMobile)
    motionQuery.addEventListener('change', onMotion)
    resize()
    readScroll()

    // ---- Loop ----
    const clock = new THREE.Clock()
    let raf = 0
    let running = false
    const frame = () => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(clock.getDelta(), 0.1)
      const t = clock.elapsedTime
      const before = prog
      prog = reduce ? target : prog + (target - prog) * (1 - Math.exp(-dt * 5))
      if (Math.abs(target - prog) < 0.0005) prog = target
      if (reduce && !dirty && prog === before) return // static: render only on change
      applyState(prog)
      const m = reduce ? 0 : 1
      rig.position.set(base.x + Math.sin(t * 0.23) * 0.06 * m, Math.sin(t * 0.55) * 0.14 * m, base.z)
      rig.scale.setScalar(base.scale)
      drop.rotation.y = base.ry + t * 0.12 * m
      drop.rotation.z = Math.sin(t * 0.3) * 0.02 * m
      if (!reduce) {
        const pa = pGeo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < PC; i++) {
          let y = pa.getY(i) + Math.sin(t * 0.2 + seeds[i]) * 0.0006 + 0.0008
          if (y > 4.5) y = -4.5
          pa.setY(i, y)
        }
        pa.needsUpdate = true
      }
      canvas.style.opacity = String(clamp01(1 - (prog - CONFIG.fadeFrom) / (1 - CONFIG.fadeFrom)))
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      dirty = false
    }
    const start = () => {
      if (running) return
      running = true
      clock.getDelta()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    start()

    // ---- Cleanup ----
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', readScroll)
      window.removeEventListener('resize', resize)
      mobileQuery.removeEventListener('change', onMobile)
      motionQuery.removeEventListener('change', onMotion)
      dropGeo.dispose()
      dropMat.dispose()
      pGeo.dispose()
      pMat.dispose()
      spriteTex.dispose()
      envRT.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      host.removeChild(canvas)
    }
  }, [])

  return <div ref={hostRef} className="sacred-drop" aria-hidden="true" />
}

export default SacredDropScene
