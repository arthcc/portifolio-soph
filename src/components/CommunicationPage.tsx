import { t, type CommunicationItem, type Lang, type Localized } from "../portfolioContent"

function DarkroomPreview({ item, lang }: { item: CommunicationItem; lang: Lang }) {
  return (
    <span className="darkroom-preview" aria-hidden="true">
      <img src={item.preview} alt="" loading="lazy" decoding="async" />
      <span>{t(item.previewAlt, lang)}</span>
    </span>
  )
}

type CommunicationPageProps = {
  lang: Lang
  projectsHeading: Localized
  articlesHeading: Localized
  more: { label: Localized; href: string }
  projects: readonly CommunicationItem[]
  articles: readonly CommunicationItem[]
}

export function CommunicationPage({
  lang,
  projectsHeading,
  articlesHeading,
  more,
  projects,
  articles,
}: CommunicationPageProps) {
  return (
    <div className="communication-page">
      <div className="communication-grid">
        <section className="communication-column communication-column--project">
          <h1>{t(projectsHeading, lang)}</h1>
          <div className="communication-list">
            {projects.map((item) => (
              <a className="communication-item" href={item.href} key={item.id}>
                <span className="item-copy">
                  <strong>{item.title}</strong>
                  <small>{t(item.meta, lang)}</small>
                </span>
                <DarkroomPreview item={item} lang={lang} />
              </a>
            ))}
          </div>
        </section>

        <section className="communication-column communication-column--article">
          <h1>{t(articlesHeading, lang)}</h1>
          <div className="press-clipping">
            {articles.map((item) => (
              <a className="clipping-row" href={item.href} key={item.id}>
                <span className="clipping-title">{item.title}</span>
                <span className="clipping-meta">{t(item.meta, lang)}</span>
                <DarkroomPreview item={item} lang={lang} />
              </a>
            ))}
          </div>
          <a className="see-more" href={more.href}>
            ⟶ [{t(more.label, lang)}]
          </a>
        </section>
      </div>
    </div>
  )
}
