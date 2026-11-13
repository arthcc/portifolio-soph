import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { t, type Lang, type Localized, type PosterItem, type PosterPile } from "../portfolioContent"
import { CursorTooltip } from "./CursorTooltip"

type Phase = "piles" | "dealing" | "open" | "gathering"

type Offset = { x: number; y: number }

type DragState = {
  id: string
  pointerId: number
  startX: number
  startY: number
  origin: Offset
  moved: boolean
}

type DesignPageProps = {
  lang: Lang
  piles: readonly PosterPile[]
  backLabel: Localized
  reshuffleLabel: Localized
  leaving?: boolean
}

const DEAL_STAGGER = 70
const DEAL_MS = 720

/** Small seeded wobble so each poster in a pile sits a little crooked. */
const pileAngle = (index: number) => [-4, 3, -1.5, 5, -3, 2][index % 6]
const randomTilt = () => (Math.random() * 2 - 1) * 7
const shuffle = (count: number) => {
  const order = Array.from({ length: count }, (_, index) => index)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

export function DesignPage({
  lang,
  piles,
  backLabel,
  reshuffleLabel,
  leaving = false,
}: DesignPageProps) {
  const pageRef = useRef<HTMLElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [phase, setPhase] = useState<Phase>("piles")
  const [selected, setSelected] = useState<string | null>(null)
  const [slots, setSlots] = useState<number[]>([])
  const [tilts, setTilts] = useState<number[]>([])
  const [offsets, setOffsets] = useState<Record<string, Offset>>({})
  const [layers, setLayers] = useState<Record<string, number>>({})
  const [hovered, setHovered] = useState<PosterItem | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const drag = useRef<DragState | null>(null)
  const topLayer = useRef(100)
  const timer = useRef<number | undefined>(undefined)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return
    const measure = () =>
      setSize({ width: page.clientWidth, height: page.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(page)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const { width, height } = size
  const isNarrow = width < 700
  const cols = isNarrow ? 2 : 4
  const sidePad = isNarrow ? 16 : Math.max(32, width * 0.04)
  const topPad = isNarrow ? 84 : 104
  const cellW = (width - sidePad * 2) / cols
  const cardW = Math.min(cellW * 0.78, 250)
  const cardH = cardW * 1.414
  const rowGap = isNarrow ? 28 : 44
  const pileW = Math.min(isNarrow ? width * 0.36 : 230, 230)
  const pileH = pileW * 1.414
  const pileScale = pileW / cardW

  const activePile = piles.find((pile) => pile.id === selected)
  const activeCount = activePile?.posters.length ?? 0
  const rows = Math.ceil(activeCount / cols)
  const canvasHeight =
    phase === "piles" || phase === "gathering"
      ? height
      : Math.max(height, topPad + rows * (cardH + rowGap) + 48)

  /** Center of a pile on the canvas. */
  const pileCenter = (pileIndex: number): Offset => {
    const spread = isNarrow ? width * 0.25 : Math.min(width * 0.18, 240)
    const offset = (pileIndex - (piles.length - 1) / 2) * spread * 2
    return { x: width / 2 + offset, y: height / 2 + 10 }
  }

  /** Center of a slot in the scattered 4-column arrangement. */
  const slotCenter = (slot: number): Offset => {
    const col = slot % cols
    const row = Math.floor(slot / cols)
    return {
      x: sidePad + cellW * (col + 0.5),
      y: topPad + row * (cardH + rowGap) + cardH / 2,
    }
  }

  const openPile = (pile: PosterPile) => {
    if (phase !== "piles") return
    setSelected(pile.id)
    setSlots(shuffle(pile.posters.length))
    setTilts(pile.posters.map(randomTilt))
    setOffsets({})
    setLayers({})
    setPhase("dealing")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => setPhase("open"),
      DEAL_MS + pile.posters.length * DEAL_STAGGER,
    )
  }

  const gather = () => {
    if (!activePile || phase === "gathering" || phase === "piles") return
    setHovered(null)
    pageRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    setPhase("gathering")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setPhase("piles")
      setSelected(null)
      setOffsets({})
      setLayers({})
    }, DEAL_MS + activePile.posters.length * DEAL_STAGGER)
  }

  const reshuffle = () => {
    if (!activePile || phase !== "open") return
    setOffsets({})
    setLayers({})
    setSlots(shuffle(activePile.posters.length))
    setTilts(activePile.posters.map(randomTilt))
  }

  useEffect(() => {
    if (phase !== "open") return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") gather()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const handlePointerDown = (
    poster: PosterItem,
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    if (phase !== "open" || event.pointerType === "touch") return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = {
      id: poster.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: offsets[poster.id] ?? { x: 0, y: 0 },
      moved: false,
    }
    topLayer.current += 1
    setLayers((all) => ({ ...all, [poster.id]: topLayer.current }))
    setDraggingId(poster.id)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const active = drag.current
    if (!active || active.pointerId !== event.pointerId) return
    const dx = event.clientX - active.startX
    const dy = event.clientY - active.startY
    if (!active.moved && Math.hypot(dx, dy) < 3) return
    active.moved = true
    setOffsets((all) => ({
      ...all,
      [active.id]: { x: active.origin.x + dx, y: active.origin.y + dy },
    }))
  }

  const stopDragging = () => {
    drag.current = null
    setDraggingId(null)
  }

  const ready = width > 0 && height > 0

  return (
    <section
      ref={pageRef}
      className={`design-page is-${phase} ${leaving ? "is-leaving" : ""}`}
      aria-label="design"
    >
      {activePile && phase !== "piles" && (
        <div className={`pile-bar ${phase === "gathering" ? "is-hiding" : ""}`}>
          <button
            type="button"
            className="pile-back"
            onClick={gather}
            aria-label={t(backLabel, lang)}
          >
            ←
          </button>
          <div className="pile-bar-title">
            <button
              type="button"
              className="pile-reshuffle"
              onClick={reshuffle}
              aria-label={t(reshuffleLabel, lang)}
              disabled={phase !== "open"}
            >
              ↺
            </button>
            <h1>{t(activePile.label, lang)}</h1>
          </div>
        </div>
      )}

      <div
        className="poster-canvas"
        style={{ height: canvasHeight || "100%" }}
      >
        {ready &&
          piles.map((pile, pileIndex) => {
            const center = pileCenter(pileIndex)
            const isActive = pile.id === selected
            const isHidden = selected !== null && !isActive
            const scattered = isActive && (phase === "dealing" || phase === "open")
            const count = pile.posters.length

            return pile.posters.map((poster, index) => {
              let x: number
              let y: number
              let rotate: number
              let scale: number
              let z: number
              if (scattered) {
                const target = slotCenter(slots[index] ?? index)
                const offset = offsets[poster.id] ?? { x: 0, y: 0 }
                x = target.x + offset.x
                y = target.y + offset.y
                rotate = draggingId === poster.id ? 0 : tilts[index] ?? 0
                scale = draggingId === poster.id ? 1.04 : 1
                z = layers[poster.id] ?? 10 + index
              } else {
                x = center.x
                y = center.y
                rotate = pileAngle(index + pileIndex * 2)
                scale = pileScale
                z = 10 + count - index
              }
              // Deal top card first; gather the last card first.
              const delay =
                phase === "dealing"
                  ? index * DEAL_STAGGER
                  : phase === "gathering" && isActive
                    ? (count - 1 - index) * DEAL_STAGGER
                    : 0

              return (
                <article
                  key={poster.id}
                  className={`poster-card ${isHidden ? "is-hidden" : ""} ${
                    draggingId === poster.id ? "is-dragging" : ""
                  } ${phase === "open" ? "is-loose" : ""}`}
                  style={{
                    width: cardW,
                    height: cardH,
                    zIndex: z,
                    transform: `translate3d(${x - cardW / 2}px, ${y - cardH / 2}px, 0) rotate(${rotate}deg) scale(${scale})`,
                    transitionDelay: `${delay}ms, 0ms`,
                  }}
                  onPointerDown={(event) => handlePointerDown(poster, event)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                  onPointerEnter={(event) => {
                    if (phase === "open" && event.pointerType !== "touch")
                      setHovered(poster)
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <img
                    src={poster.src}
                    alt={poster.alt}
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              )
            })
          })}

        {ready &&
          phase === "piles" &&
          piles.map((pile, pileIndex) => {
            const center = pileCenter(pileIndex)
            return (
              <button
                type="button"
                key={pile.id}
                className="poster-pile-hit"
                style={{
                  left: center.x - pileW / 2 - 12,
                  top: center.y - pileH / 2 - 12,
                  width: pileW + 24,
                  height: pileH + 24,
                }}
                onClick={() => openPile(pile)}
              >
                <span
                  className="poster-pile-label"
                  style={{ top: pileH + 24 + 14 }}
                >
                  {t(pile.label, lang)}
                </span>
              </button>
            )
          })}
      </div>

      <CursorTooltip
        content={
          hovered && hovered.title && !draggingId ? (
            <>
              <strong>{hovered.title}</strong>
              <span>{t(hovered.event, lang)}</span>
            </>
          ) : null
        }
      />
    </section>
  )
}
