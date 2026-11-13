import { useEffect, useRef, useState } from "react"
import { t, type GalleryItem, type Lang, type Localized, type PhotoPile } from "../portfolioContent"
import { CursorTooltip } from "./CursorTooltip"

type PhotographyGalleryProps = {
  lang: Lang
  label: Localized
  piles: readonly PhotoPile[]
  backLabel: Localized
}

type Phase = "piles" | "leaving" | "open"

const PILE_ANGLES = [-6, 4, -2]

export function PhotographyGallery({
  lang,
  label,
  piles,
  backLabel,
}: PhotographyGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>("piles")
  const [hovered, setHovered] = useState<GalleryItem | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const scroller = useRef<HTMLElement>(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const openPile = (id: string) => {
    if (phase !== "piles") return
    setSelected(id)
    setPhase("leaving")
    timer.current = window.setTimeout(() => {
      setPhase("open")
      scroller.current?.scrollTo({ top: 0 })
    }, 420)
  }

  const close = () => {
    setHovered(null)
    setPhase("piles")
    setSelected(null)
    scroller.current?.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (phase !== "open") return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase])

  const pile = piles.find((item) => item.id === selected)

  return (
    <section
      ref={scroller}
      className={`gallery-page is-${phase}`}
      aria-label={t(label, lang)}
    >
      {phase !== "open" ? (
        <div className="photo-piles">
          {piles.map((item) => {
            const isSelected = item.id === selected
            const covers = item.items.slice(0, 3)
            return (
              <button
                type="button"
                key={item.id}
                className={`photo-pile ${
                  phase === "leaving" ? (isSelected ? "is-chosen" : "is-faded") : ""
                }`}
                onClick={() => openPile(item.id)}
              >
                <span className="photo-pile-stack" aria-hidden="true">
                  {covers.map((cover, index) => (
                    <img
                      key={cover.id}
                      src={cover.src}
                      alt=""
                      draggable="false"
                      style={{
                        transform: `rotate(${PILE_ANGLES[index % PILE_ANGLES.length]}deg)`,
                        zIndex: covers.length - index,
                      }}
                    />
                  ))}
                </span>
                <span className="photo-pile-label">{t(item.label, lang)}</span>
              </button>
            )
          })}
        </div>
      ) : (
        pile && (
          <>
            <div className="pile-bar">
              <button type="button" className="pile-back" onClick={close} aria-label={t(backLabel, lang)}>
                ←
              </button>
              <h1>{t(pile.label, lang)}</h1>
            </div>
            <div className="gallery-grid">
              {pile.items.map((item) => (
                <figure
                  className={`gallery-item gallery-item--${item.format}`}
                  key={item.id}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setHovered(item)
                  }}
                  onPointerLeave={() => setHovered(null)}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption className="sr-only">
                    {item.band} — {item.venue}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )
      )}
      <CursorTooltip
        content={
          hovered ? (
            <>
              <strong>{hovered.band}</strong>
              <span>{hovered.venue}</span>
            </>
          ) : null
        }
      />
    </section>
  )
}
