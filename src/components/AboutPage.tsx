import { t, type Lang, type Localized } from "../portfolioContent"

type AboutPageProps = {
  lang: Lang
  heading: Localized
  portrait: string
  portraitAlt: Localized
  bio: readonly Localized[]
}

export function AboutPage({ lang, heading, portrait, portraitAlt, bio }: AboutPageProps) {
  return (
    <div className="plain-page">
      <div className="about-layout">
        <figure className="about-portrait">
          <img src={portrait} alt={t(portraitAlt, lang)} draggable="false" />
        </figure>
        <div className="about-copy">
          <h1>{t(heading, lang)}</h1>
          {bio.map((paragraph, index) => (
            <p key={index}>{t(paragraph, lang)}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
