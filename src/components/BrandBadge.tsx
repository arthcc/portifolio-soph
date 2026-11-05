type BrandBadgeProps = {
  label: string
  image: string
  imageAlt: string
  intro: string
  cta: { label: string; href: string }
}

export function BrandBadge({
  label,
  image,
  imageAlt,
  intro,
  cta,
}: BrandBadgeProps) {
  return (
    <aside className="side-identity" id="sobre">
      <div className="side-identity-mark">
        <img className="doodle" src={image} alt={imageAlt} draggable="false" />
        <p>{label}</p>
      </div>
      <p className="side-identity-intro">{intro}</p>
      <a className="side-identity-cta" href={cta.href}>
        {cta.label}
      </a>
    </aside>
  )
}
