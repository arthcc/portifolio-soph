import { useEffect, useRef } from "react"

type HomeCanvasProps = {
  doodle: string
  doodleAlt: string
  /** Images that trail the cursor. Edit the list in portfolioContent.ts. */
  images: readonly string[]
  /** Minimum cursor travel (px) between two spawned images. */
  spacing?: number
}

const MAX_ALIVE = 10
const LINGER_MS = 350
const FADE_MS = 800
/** Touch screens: when nobody is touching, an image appears on its own this often. */
const AUTOPLAY_MS = 750
const AUTOPLAY_RESUME_MS = 1500

/** Silent black canvas: the doodle in the middle, images trailing the cursor behind it. */
export function HomeCanvas({ doodle, doodleAlt, images, spacing = 220 }: HomeCanvasProps) {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Preload so images appear instantly on the first pass.
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  useEffect(() => {
    const layer = trailRef.current
    if (!layer || images.length === 0) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let last: { x: number; y: number } | null = null
    let next = Math.floor(Math.random() * images.length)

    const spawn = (x: number, y: number) => {
      const img = document.createElement("img")
      img.src = images[next]
      next = (next + 1) % images.length
      img.alt = ""
      img.draggable = false
      img.className = "trail-image"
      const width = Math.min(window.innerWidth * 0.75, 520 + Math.random() * 140)
      img.style.width = `${width}px`
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      img.style.animationDuration = `${LINGER_MS + FADE_MS}ms`
      img.addEventListener("animationend", () => img.remove(), { once: true })
      layer.append(img)
      while (layer.childElementCount > MAX_ALIVE) layer.firstElementChild?.remove()
    }

    // On phones a finger drag leaves the trail; spacing shrinks with the screen.
    const gap = () => Math.min(spacing, window.innerWidth * 0.28)

    let lastTouch = 0
    const onMenu = (event: PointerEvent) =>
      event.target instanceof Element && event.target.closest(".topbar") !== null
    const onMove = (event: PointerEvent) => {
      if (reduced || onMenu(event)) return
      if (event.pointerType === "touch") lastTouch = performance.now()
      const { clientX: x, clientY: y } = event
      if (last && Math.hypot(x - last.x, y - last.y) < gap()) return
      last = { x, y }
      spawn(x, y)
    }
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || reduced || onMenu(event)) return
      lastTouch = performance.now()
      last = { x: event.clientX, y: event.clientY }
      spawn(event.clientX, event.clientY)
    }

    // Touch screens have no hover: play the trail by itself while idle.
    let autoplay: number | undefined
    if (!reduced && window.matchMedia("(hover: none)").matches) {
      autoplay = window.setInterval(() => {
        if (document.hidden || performance.now() - lastTouch < AUTOPLAY_RESUME_MS) return
        if (document.querySelector("#main-nav.is-open")) return
        const w = window.innerWidth
        const h = window.innerHeight
        spawn(w * (0.15 + Math.random() * 0.7), h * (0.18 + Math.random() * 0.68))
      }, AUTOPLAY_MS)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.clearInterval(autoplay)
      layer.replaceChildren()
    }
  }, [images, spacing])

  return (
    <section className="home-canvas" aria-label="sophia lino">
      <div className="trail-layer" ref={trailRef} aria-hidden="true" />
      <img className="home-doodle" src={doodle} alt={doodleAlt} draggable="false" />
    </section>
  )
}
