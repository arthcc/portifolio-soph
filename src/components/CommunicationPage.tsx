import type { CommunicationItem } from "../portfolioContent"

type CommunicationColumnProps = {
  heading: string
  items: readonly CommunicationItem[]
  variant: "project" | "article"
}

function DarkroomPreview({ item }: { item: CommunicationItem }) {
  return (
    <span className="darkroom-preview" aria-hidden="true">
      <img src={item.preview} alt="" />
      <span>{item.previewAlt}</span>
    </span>
  )
}

function CommunicationColumn({
  heading,
  items,
  variant,
}: CommunicationColumnProps) {
  return (
    <section
      className={`communication-column communication-column--${variant}`}
    >
      <h1>{heading}</h1>
      <div className="communication-list">
        {items.map((item, index) => (
          <a className="communication-item" href={item.href} key={item.id}>
            <span className="item-number">0{index + 1}</span>
            <span className="item-copy">
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
            </span>
            <DarkroomPreview item={item} />
          </a>
        ))}
      </div>
    </section>
  )
}

type CommunicationPageProps = {
  projectsHeading: string
  articlesHeading: string
  projects: readonly CommunicationItem[]
  articles: readonly CommunicationItem[]
}

export function CommunicationPage({
  projectsHeading,
  articlesHeading,
  projects,
  articles,
}: CommunicationPageProps) {
  return (
    <div className="communication-page">
      <div className="communication-grid">
        <CommunicationColumn
          heading={projectsHeading}
          items={projects}
          variant="project"
        />
        <CommunicationColumn
          heading={articlesHeading}
          items={articles}
          variant="article"
        />
      </div>
    </div>
  )
}
