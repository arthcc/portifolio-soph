import { useEffect, useState, type MouseEvent } from "react"
import { AboutPage } from "./components/AboutPage"
import { BrandBadge } from "./components/BrandBadge"
import { CommunicationPage } from "./components/CommunicationPage"
import { ContactPage } from "./components/ContactPage"
import { DesignPage } from "./components/DesignPage"
import { PhotoStack } from "./components/PhotoStack"
import { PhotographyGallery } from "./components/PhotographyGallery"
import { Ticker } from "./components/Ticker"
import { TopNavigation } from "./components/TopNavigation"
import { portfolioContent, type Lang } from "./portfolioContent"

type Route = "home" | "gallery" | "communication" | "design" | "contact" | "about"

const ROUTES: Record<string, Route> = {
  "#/fotografia": "gallery",
  "#/comunicacao": "communication",
  "#/design": "design",
  "#/contato": "contact",
  "#/sobre": "about",
}

const HREFS = Object.fromEntries(
  Object.entries(ROUTES).map(([href, route]) => [route, href]),
) as Partial<Record<Route, string>>

const getRoute = (): Route => ROUTES[window.location.hash] ?? "home"

const LANG_KEY = "sophia-lino-lang"
const getInitialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === "pt" || saved === "en") return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en"
}

export default function App() {
  const {
    brand,
    navigation,
    ui,
    badge,
    stack,
    ticker,
    photography,
    communication,
    design,
    contact,
    about,
  } = portfolioContent
  const [route, setRoute] = useState(getRoute)
  const [lang, setLang] = useState<Lang>(getInitialLang)
  const [designLeaving, setDesignLeaving] = useState(false)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener("hashchange", updateRoute)
    return () => window.removeEventListener("hashchange", updateRoute)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const handleNavigate = (
    href: string,
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    if (route !== "design" || href === "#/design" || !href.startsWith("#"))
      return

    event.preventDefault()
    setDesignLeaving(true)
    window.setTimeout(() => {
      window.location.hash = href.slice(1)
      setDesignLeaving(false)
    }, 260)
  }

  const shellClass = route === "home" ? "landing-shell" : `${route}-shell page-shell`

  return (
    <main className={shellClass}>
      <TopNavigation
        lang={lang}
        onLangChange={setLang}
        brand={brand.name}
        homeHref={brand.homeHref}
        items={navigation}
        menuLabels={{ open: ui.menuOpen, close: ui.menuClose }}
        activeHref={HREFS[route]}
        onNavigate={handleNavigate}
      />
      {route === "gallery" ? (
        <PhotographyGallery
          lang={lang}
          label={photography.label}
          piles={photography.piles}
          backLabel={ui.back}
        />
      ) : route === "communication" ? (
        <CommunicationPage lang={lang} {...communication} />
      ) : route === "design" ? (
        <DesignPage
          lang={lang}
          piles={design.piles}
          backLabel={ui.back}
          reshuffleLabel={ui.reshuffle}
          leaving={designLeaving}
        />
      ) : route === "contact" ? (
        <ContactPage lang={lang} {...contact} />
      ) : route === "about" ? (
        <AboutPage lang={lang} {...about} />
      ) : (
        <>
          <BrandBadge {...badge} />
          <PhotoStack
            initialItems={stack.items}
            angles={stack.angles}
            contactSheetImages={stack.contactSheetImages}
            replacementLabel={stack.replacementLabel}
          />
          <Ticker items={ticker} />
          <div id="comunicacao" hidden />
          <div id="design" hidden />
        </>
      )}
    </main>
  )
}
