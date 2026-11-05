import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import type { PosterItem } from "../portfolioContent"
import { PhotoDialog, type DialogImage } from "./PhotoDialog"

type PosterPosition = {
  x: number
  y: number
  z: number
}

type DragState = {
  index: number
  startX: number
  startY: number
  originX: number
  originY: number
  moved: boolean
  touch: boolean
}

type DesignPageProps = {
  posters: readonly PosterItem[]
  resetLabel: string
  leaving?: boolean
}

export function DesignPage({
  posters,
  resetLabel,
  leaving = false,
}: DesignPageProps) {
  const [positions, setPositions] = useState<PosterPosition[]>(() =>
    posters.map((_, index) => ({ x: 0, y: 0, z: index + 1 })),
  )
  const [hovered, setHovered] = useState<number | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const drag = useRef<DragState | null>(null)
  const topLayer = useRef(posters.length + 1)
  const [opened, setOpened] = useState<DialogImage | null>(null)

  const handlePointerDown = (
    index: number,
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    // On touch screens, posters aren't draggable so the page can scroll;
    // a tap still opens the dialog.
    const isTouch = event.pointerType === "touch"
    if (!isTouch) event.currentTarget.setPointerCapture(event.pointerId)
    const current = positions[index]
    drag.current = {
      index,
      startX: event.clientX,
      startY: event.clientY,
      originX: current.x,
      originY: current.y,
      moved: false,
      touch: isTouch,
    }
    topLayer.current += 1
    setPositions((all) =>
      all.map((position, itemIndex) =>
        itemIndex === index ? { ...position, z: topLayer.current } : position,
      ),
    )
  }

  const handlePointerMove = (
    index: number,
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setCursor({
      x: event.clientX - bounds.left + 12,
      y: event.clientY - bounds.top + 12,
    })

    if (drag.current?.index !== index) return
    const activeDrag = drag.current
    const dx = event.clientX - activeDrag.startX
    const dy = event.clientY - activeDrag.startY
    if (!activeDrag.moved && Math.hypot(dx, dy) < 5) return
    activeDrag.moved = true
    if (activeDrag.touch) return
    setPositions((all) =>
      all.map((position, itemIndex) =>
        itemIndex === index
          ? {
              ...position,
              x: activeDrag.originX + event.clientX - activeDrag.startX,
              y: activeDrag.originY + event.clientY - activeDrag.startY,
            }
          : position,
      ),
    )
  }

  const stopDragging = () => {
    drag.current = null
  }

  // A click without dragging opens the poster in the dialog.
  const handlePointerUp = (index: number) => {
    const wasClick = drag.current?.index === index && !drag.current.moved
    stopDragging()
    if (!wasClick) return
    const poster = posters[index]
    setOpened({
      src: poster.src,
      alt: poster.alt,
      title: poster.title,
      caption: poster.event,
    })
  }

  const resetPositions = () => {
    drag.current = null
    topLayer.current = posters.length + 1
    setPositions(posters.map((_, index) => ({ x: 0, y: 0, z: index + 1 })))
  }

  return (
    <section
      className={`design-page ${leaving ? "is-leaving" : ""}`}
      aria-label="Design e cartazes"
    >
      <div className="poster-canvas">
        {posters.map((poster, index) => (
          <article
            className="poster-card"
            key={poster.id}
            style={{
              zIndex: positions[index].z,
              transform: `translate3d(${positions[index].x}px, ${positions[index].y}px, 0)`,
            }}
            onPointerDown={(event) => handlePointerDown(index, event)}
            onPointerMove={(event) => handlePointerMove(index, event)}
            onPointerUp={() => handlePointerUp(index)}
            onPointerCancel={stopDragging}
            onPointerEnter={() => setHovered(index)}
            onPointerLeave={() => {
              if (drag.current?.index !== index) setHovered(null)
            }}
          >
            <img
              src={poster.src}
              alt={poster.alt}
              draggable="false"
              loading="lazy"
            />
            <span
              className={`poster-tooltip ${
                hovered === index ? "is-visible" : ""
              }`}
              style={{ left: cursor.x, top: cursor.y }}
            >
              <strong>{poster.title}</strong>
              <small>{poster.event}</small>
            </span>
          </article>
        ))}
      </div>
      <PhotoDialog image={opened} onClose={() => setOpened(null)} />
      <button className="poster-reset" type="button" onClick={resetPositions}>
        {resetLabel}
      </button>
    </section>
  )
}
