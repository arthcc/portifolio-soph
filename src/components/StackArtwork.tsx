import type { StackItem } from "../portfolioContent"

type StackArtworkProps = {
  item: StackItem
  contactSheetImages: readonly string[]
}

export function StackArtwork({ item, contactSheetImages }: StackArtworkProps) {
  if (item.kind === "contact") {
    return (
      <div className="contact-sheet" role="img" aria-label={item.alt}>
        {contactSheetImages.map((src, index) => (
          <figure key={`${src}-${index}`}>
            <img src={src} alt="" draggable="false" />
            <figcaption>SL—0{index + 1} / 35MM</figcaption>
          </figure>
        ))}
      </div>
    )
  }

  if (item.kind === "editorial") {
    return (
      <div className="editorial-page" role="img" aria-label={item.alt}>
        <img src={item.src} alt="" draggable="false" />
      </div>
    )
  }

  return (
    <img
      className="full-photo"
      src={item.src}
      alt={item.alt}
      draggable="false"
    />
  )
}
