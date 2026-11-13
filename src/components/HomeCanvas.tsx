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

    const onMove = (event: PointerEvent) => {
      if (reduced) return
      const { clientX: x, clientY: y } = event
      if (last && Math.hypot(x - last.x, y - last.y) < spacing) return
      last = { x, y }
      spawn(x, y)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
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
