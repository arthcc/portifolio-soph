import { useState } from "react"
import type { GalleryItem } from "../portfolioContent"
import { PhotoDialog, type DialogImage } from "./PhotoDialog"

type PhotographyGalleryProps = {
  label: string
  items: readonly GalleryItem[]
}

export function PhotographyGallery({ label, items }: PhotographyGalleryProps) {
  const [opened, setOpened] = useState<DialogImage | null>(null)

  const open = (item: GalleryItem) =>
    setOpened({
      src: item.src,
      alt: item.alt,
      title: item.band,
      caption: item.venue,
    })

  return (
    <section className="gallery-page" aria-label={label}>
      <div className="gallery-grid">
        {items.map((item) => (
          <figure
            className={`gallery-item gallery-item--${item.format}`}
            key={item.id}
            tabIndex={0}
            role="button"
            onClick={() => open(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                open(item)
              }
            }}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>
              <span>{item.band}</span>
              <span>{item.venue}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <PhotoDialog image={opened} onClose={() => setOpened(null)} />
    </section>
  )
}
