type NavigationItem = {
  label: string
  href: string
}

type TopNavigationProps = {
  brand: string
  homeHref: string
  items: readonly NavigationItem[]
  activeHref?: string
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void
}

export function TopNavigation({
  brand,
  homeHref,
  items,
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
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "fechar ×" : "menu"}
      </button>
      <nav
        id="main-nav"
        className={menuOpen ? "is-open" : undefined}
        aria-label="Navegação principal"
      >
        {items.map((item, index) => (
          <span className="nav-item" key={item.label}>
            <a
              className={item.href === activeHref ? "is-active" : undefined}
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              onClick={(event) => navigate(item.href, event)}
            >
              {item.label}
            </a>
            {index < items.length - 1 && <span aria-hidden="true">-</span>}
          </span>
        ))}
      </nav>
    </header>
  )
}
import { useEffect, useState, type MouseEvent } from "react"
