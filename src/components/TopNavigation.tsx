import { useEffect, useState, type MouseEvent } from "react"
import { t, type Lang, type Localized } from "../portfolioContent"

type NavigationItem = {
  label: Localized
  href: string
}

type TopNavigationProps = {
  lang: Lang
  onLangChange: (lang: Lang) => void
  brand: string
  homeHref: string
  items: readonly NavigationItem[]
  menuLabels: { open: Localized; close: Localized }
  activeHref?: string
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void
}

export function TopNavigation({
  lang,
  onLangChange,
  brand,
  homeHref,
  items,
  menuLabels,
  activeHref,
  onNavigate,
}: TopNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const navigate = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    onNavigate?.(href, event)
  }

  const switcher = (
    <span className="lang-switch" role="group" aria-label="idioma / language">
      [
      <button
        type="button"
        className={lang === "pt" ? "is-active" : undefined}
        aria-pressed={lang === "pt"}
        onClick={() => onLangChange("pt")}
      >
        pt
      </button>
      /
      <button
        type="button"
        className={lang === "en" ? "is-active" : undefined}
        aria-pressed={lang === "en"}
        onClick={() => onLangChange("en")}
      >
        en
      </button>
      ]
    </span>
  )

  return (
    <header className="topbar">
      <a
        className="brand"
        href={homeHref}
        aria-label={brand}
        onClick={(event) => navigate(homeHref, event)}
      >
        {brand}
      </a>
      <div className="topbar-mobile-actions">
        {switcher}
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? t(menuLabels.close, lang) : t(menuLabels.open, lang)}
        </button>
      </div>
      <nav
        id="main-nav"
        className={menuOpen ? "is-open" : undefined}
        aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
      >
        {items.map((item, index) => (
          <span className="nav-item" key={item.href}>
            <a
              className={item.href === activeHref ? "is-active" : undefined}
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              onClick={(event) => navigate(item.href, event)}
            >
              {t(item.label, lang)}
            </a>
            {index < items.length - 1 && <span aria-hidden="true">-</span>}
          </span>
        ))}
        <span className="nav-switch">{switcher}</span>
      </nav>
    </header>
  )
}
