import { useEffect, useState, type MouseEvent } from "react"
import { BrandBadge } from "./components/BrandBadge"
import { CommunicationPage } from "./components/CommunicationPage"
import { DesignPage } from "./components/DesignPage"
import { PhotoStack } from "./components/PhotoStack"
import { PhotographyGallery } from "./components/PhotographyGallery"
import { Ticker } from "./components/Ticker"
import { TopNavigation } from "./components/TopNavigation"
import { portfolioContent } from "./portfolioContent"

export default function App() {
  const { brand, navigation, badge, stack, gallery, communication, design } =
    portfolioContent
  const getRoute = () => {
    if (window.location.hash === "#/fotografia") return "gallery"
    if (window.location.hash === "#/comunicacao") return "communication"
    if (window.location.hash === "#/design") return "design"
    return "home"
  }
  const [route, setRoute] = useState(getRoute)
  const [designLeaving, setDesignLeaving] = useState(false)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener("hashchange", updateRoute)
    return () => window.removeEventListener("hashchange", updateRoute)
  }, [])

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

  const shellClass =
    route === "gallery"
      ? "gallery-shell"
      : route === "communication"
        ? "communication-shell"
        : route === "design"
          ? "design-shell"
          : "landing-shell"

  return (
    <main className={shellClass}>
      <TopNavigation
        brand={brand.name}
        homeHref={brand.homeHref}
        items={navigation}
        activeHref={
          route === "gallery"
            ? "#/fotografia"
            : route === "communication"
              ? "#/comunicacao"
              : route === "design"
                ? "#/design"
                : undefined
        }
        onNavigate={handleNavigate}
      />
      {route === "gallery" ? (
        <PhotographyGallery label={gallery.label} items={gallery.items} />
      ) : route === "communication" ? (
        <CommunicationPage {...communication} />
      ) : route === "design" ? (
        <DesignPage {...design} leaving={designLeaving} />
      ) : (
        <>
          <BrandBadge {...badge} />
          <PhotoStack
            initialItems={stack.items}
            angles={stack.angles}
            contactSheetImages={stack.contactSheetImages}
            replacementLabel={stack.replacementLabel}
          />
          <Ticker
            items={gallery.items.flatMap((item) => [item.band, item.venue])}
          />
          <div id="comunicacao" hidden />
          <div id="design" hidden />
        </>
      )}
    </main>
  )
}
