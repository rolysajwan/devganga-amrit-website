import { useEffect, useRef } from 'react'

function GlassSphereScene() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const controller = window.DevgangaGlassSpheres
    if (!scene || !controller) {
      throw new Error('The shared glass sphere scene could not be initialized.')
    }

    return controller.mount(scene)
  }, [])

  return (
    <div
      ref={sceneRef}
      className="glass-sphere-scene"
      data-glass-spheres="manual"
      aria-hidden="true"
    />
  )
}

export default GlassSphereScene
