import { useEffect, useRef, useState } from "react"
import { t, type Lang, type Localized } from "../portfolioContent"

type ContactPageProps = {
  lang: Lang
  heading: Localized
  name: string
  role: Localized
  emailLabel: Localized
  email: string
  copy: Localized
  copied: Localized
  links: readonly { label: string; href: string }[]
}

export function ContactPage({
  lang,
  heading,
  name,
  role,
  emailLabel,
  email,
  copy,
  copied,
  links,
}: ContactPageProps) {
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const field = document.createElement("textarea")
      field.value = email
      document.body.append(field)
      field.select()
      document.execCommand("copy")
      field.remove()
    }
    setDone(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setDone(false), 1800)
  }

  return (
    <div className="plain-page">
      <article className="press-card">
        <header className="press-card-head">
          <span>{t(heading, lang)}</span>
          <span>nº 001</span>
        </header>
        <h1>{name}</h1>
        <p className="press-card-role">{t(role, lang)}</p>
        <dl className="press-card-fields">
          <div>
            <dt>{t(emailLabel, lang)}</dt>
            <dd>
              <a href={`mailto:${email}`}>{email}</a>
              <button type="button" onClick={copyEmail} aria-live="polite">
                {done ? t(copied, lang) : t(copy, lang)}
              </button>
            </dd>
          </div>
          {links.map((link) => (
            <div key={link.href}>
              <dt>{link.label}</dt>
              <dd>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.href.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  )
}
