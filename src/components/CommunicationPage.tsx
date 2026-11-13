import { t, type CommunicationItem, type Lang, type Localized } from "../portfolioContent"

type CommunicationColumnProps = {
  lang: Lang
  heading: Localized
  items: readonly CommunicationItem[]
}

function CommunicationColumn({ lang, heading, items }: CommunicationColumnProps) {
  return (
    <>
      <h1>{t(heading, lang)}</h1>
      <div className="communication-list">
        {items.map((item) => (
          <a className="communication-item" href={item.href} key={item.id}>
            <span className="item-copy">
              <strong>{item.title}</strong>
              <small>{t(item.meta, lang)}</small>
            </span>
          </a>
        ))}
      </div>
    </>
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
        <section className="communication-column">
          <CommunicationColumn lang={lang} heading={projectsHeading} items={projects} />
        </section>
        <section className="communication-column">
          <CommunicationColumn lang={lang} heading={articlesHeading} items={articles} />
          <a className="see-more" href={more.href}>
            ⟶ [{t(more.label, lang)}]
          </a>
        </section>
      </div>
    </div>
  )
}
