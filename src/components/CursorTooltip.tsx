import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

type CursorTooltipProps = {
  /** What to show; null fades the tooltip out. */
  content: ReactNode | null
}

/** A tiny black box that follows the pointer (position set outside React). */
export function CursorTooltip({ content }: CursorTooltipProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Keep the last content while fading out, so the box doesn't empty mid-fade.
  const [shown, setShown] = useState<ReactNode>(content)
  if (content !== null && content !== shown) setShown(content)

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const pad = 14
      const { offsetWidth: w, offsetHeight: h } = el
      let x = event.clientX + pad
      let y = event.clientY + pad
      if (x + w > window.innerWidth - 8) x = event.clientX - w - pad
      if (y + h > window.innerHeight - 8) y = event.clientY - h - pad
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [])

  return createPortal(
    <div
      ref={ref}
      className={`cursor-tooltip ${content !== null ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      {shown}
    </div>,
    document.body,
  )
}
