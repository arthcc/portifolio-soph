type TickerProps = {
  items: readonly string[]
}

/** A scrolling strip of band and venue names, like the tape on a gig poster. */
export function Ticker({ items }: TickerProps) {
  const row = (hidden: boolean) => (
    <span className="ticker-row" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {item}
          <span className="ticker-star" aria-hidden="true">
            ✶
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <div className="ticker">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
