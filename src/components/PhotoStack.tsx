import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react"
import type { StackItem } from "../portfolioContent"
import { StackArtwork } from "./StackArtwork"
import { PhotoDialog, type DialogImage } from "./PhotoDialog"

type PhotoStackProps = {
  initialItems: readonly StackItem[]
  angles: readonly number[]
  contactSheetImages: readonly string[]
  replacementLabel: string
}

export function PhotoStack({
  initialItems,
  angles,
  contactSheetImages,
  replacementLabel,
}: PhotoStackProps) {
  const [stack, setStack] = useState<StackItem[]>([...initialItems])
  const [peeling, setPeeling] = useState(false)
  const [direction, setDirection] = useState(1)
  const locked = useRef(false)
  const [zoomed, setZoomed] = useState<DialogImage | null>(null)
  const zoomedRef = useRef(zoomed)
  zoomedRef.current = zoomed
  const lastInteraction = useRef(performance.now())
  const hovering = useRef(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const peel = (nextDirection: number) => {
    if (locked.current) return
    locked.current = true
    setDirection(nextDirection)
    setPeeling(true)
  }

  useEffect(() => {
    // A trackpad keeps firing wheel events (inertia) long after the swipe.
    // Only a new gesture — after a short quiet gap — passes a photo.
    let lastWheel = 0
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (zoomedRef.current) return
      const now = performance.now()
      lastInteraction.current = now
      const isNewGesture = now - lastWheel > 220
      lastWheel = now
      if (!isNewGesture) return
      if (Math.abs(event.deltaY) < 4 && Math.abs(event.deltaX) < 4) {
        lastWheel = 0
        return
      }
      peel(event.deltaY >= 0 ? 1 : -1)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [])

  useEffect(() => {
    if (!peeling) return
    const timer = window.setTimeout(() => {
      setStack((current) => [...current.slice(1), current[0]])
      setPeeling(false)
      locked.current = false
    }, 560)
    return () => window.clearTimeout(timer)
  }, [peeling])

  // Passes to the next photo every 4s while nobody is interacting.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      const idle = performance.now() - lastInteraction.current >= 4000
      if (!idle || hovering.current || zoomedRef.current) return
      if (document.hidden) return
      lastInteraction.current = performance.now()
      peel(1)
    }, 250)
    return () => window.clearInterval(timer)
  }, [])

  const closeZoom = () => {
    lastInteraction.current = performance.now()
    setZoomed(null)
  }

  const openZoom = (item: StackItem, target?: EventTarget | null) => {
    if (peeling) return
    // On the contact sheet, zoom the frame that was clicked (or the first one).
    if (item.kind === "contact") {
      const clicked =
        target instanceof HTMLElement
          ? target.closest("figure")?.querySelector("img")
          : null
      const src = clicked?.getAttribute("src") ?? contactSheetImages[0]
      if (src) setZoomed({ src, alt: item.alt })
      return
    }
    if (item.src)
      setZoomed({
        src: item.src,
        alt: item.alt,
        title: item.caption.title,
        caption: item.caption.place,
      })
  }

  const handleCardKey = (item: StackItem, event: KeyboardEvent<HTMLElement>) => {
    lastInteraction.current = performance.now()
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openZoom(item)
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") peel(1)
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") peel(-1)
  }

  const findOriginalIndex = (item: StackItem) =>
    initialItems.findIndex((original) => original.id === item.id.split("-")[0])
  // While the top card flies away, the caption already shows the next photo.
  const top = peeling && stack.length > 1 ? stack[1] : stack[0]
  const topNumber = findOriginalIndex(top) + 1

  return (
    <section
      className="stack-area"
      id="fotografia"
      aria-label="Arquivo fotográfico"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hovering.current = true
      }}
      onPointerLeave={() => {
        hovering.current = false
        lastInteraction.current = performance.now()
      }}
      onTouchStart={(event) => {
        lastInteraction.current = performance.now()
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={(event) => {
        // Swipe sideways on phones to pass the photo.
        const start = touchStart.current
        touchStart.current = null
        if (!start) return
        const touch = event.changedTouches[0]
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          lastInteraction.current = performance.now()
          peel(dx < 0 ? 1 : -1)
        }
      }}
    >
      <div className="stack">
        {stack
          .map((item, index) => ({ item, index }))
          .reverse()
          .map(({ item, index }) => {
            const isTop = index === 0
            const originalIndex = findOriginalIndex(item)
            const angle = angles[originalIndex >= 0 ? originalIndex : 0]

            return (
              <article
                className={`stack-card ${isTop ? "top-card" : ""} ${
                  isTop && peeling ? "peeling" : ""
                }`}
                key={item.id}
                style={
                  {
                    "--angle": `${angle}deg`,
                    "--depth-x": `${index * -5}px`,
                    "--depth-y": `${index * 4}px`,
                    "--peel-x": `${direction * 115}vw`,
                    "--ratio": item.ratio,
                    zIndex: initialItems.length - index,
                  } as CSSProperties
                }
                role={isTop ? "button" : undefined}
                tabIndex={isTop ? 0 : -1}
                aria-label={isTop ? replacementLabel : undefined}
                onClick={
                  isTop
                    ? (event: MouseEvent<HTMLElement>) =>
                        openZoom(item, event.target)
                    : undefined
                }
                onKeyDown={
                  isTop ? (event) => handleCardKey(item, event) : undefined
                }
              >
                <StackArtwork
                  item={item}
                  contactSheetImages={contactSheetImages}
                />
                {item.credit && (
                  <span className="sr-only">Foto: {item.credit}, Unsplash</span>
                )}
              </article>
            )
          })}
      </div>
      <p className="stack-caption" key={top.id} aria-live="polite">
        <span className="stack-caption-count">
          {String(topNumber).padStart(2, "0")} /{" "}
          {String(initialItems.length).padStart(2, "0")}
        </span>
        <strong>{top.caption.title}</strong>
        <span>{top.caption.place}</span>
      </p>
      <PhotoDialog image={zoomed} onClose={closeZoom} />
    </section>
  )
}
