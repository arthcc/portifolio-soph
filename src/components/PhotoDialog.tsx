import { useEffect, useRef } from "react"

export type DialogImage = {
  src: string
  alt: string
  title?: string
  caption?: string
}

type PhotoDialogProps = {
  image: DialogImage | null
  onClose: () => void
}

export function PhotoDialog({ image, onClose }: PhotoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (image && !dialog.open) dialog.showModal()
    if (!image && dialog.open) dialog.close()
  }, [image])

  return (
    <dialog
      ref={dialogRef}
      className="photo-dialog"
      aria-label={image?.title ?? image?.alt}
      onClose={onClose}
      onClick={(event) => {
        // Clicking the backdrop (outside the frame) closes the dialog.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {image && (
        <figure className="photo-dialog-frame">
          <img src={image.src} alt={image.alt} draggable="false" />
          <figcaption>
            <span>
              {image.title && <strong>{image.title}</strong>}
              {image.title ? image.caption && ` — ${image.caption}` : image.alt}
            </span>
            <button
              className="photo-dialog-close"
              type="button"
              autoFocus
              onClick={onClose}
            >
              fechar ×
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}
