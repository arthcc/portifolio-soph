/**
 * All site content lives here — nothing on the published site lets visitors
 * upload or swap media.
 *
 * PHOTOS & POSTERS come from folders, not from this file:
 *   1. drop the full-size file into media/originals/<folder>/
 *        home/                     cursor trail on the home page
 *        fotografia/festivais/     pile "festivais"
 *        fotografia/shows/         pile "shows"
 *        fotografia/35mm/          pile "35mm"
 *        design/flyers/            pile "flyers"
 *        design/autorias/          pile "autorias"
 *   2. run `npm run images` (makes the web version + updates src/mediaManifest.json)
 *   3. optionally add a caption below (photoCaptions / posterInfo), keyed by the
 *      image id — the file name in lowercase-with-dashes, as listed in the manifest.
 *
 * Bilingual strings use `{ pt, en }`; read them with `t(value, lang)`.
 */
import media from "./mediaManifest.json"

export type Lang = "pt" | "en"
export type Localized = { pt: string; en: string }

export const t = (value: Localized | string, lang: Lang) =>
  typeof value === "string" ? value : value[lang]

type MediaImage = { id: string; src: string; width: number; height: number }

const folder = (name: string): MediaImage[] =>
  (media as Record<string, MediaImage[] | undefined>)[name] ?? []

export type GalleryItem = {
  id: string
  src: string
  alt: string
  band: string
  venue: string
  format: "landscape" | "portrait" | "square"
}

export type PhotoPile = {
  id: string
  label: Localized
  items: readonly GalleryItem[]
}

export type CommunicationItem = {
  id: string
  title: string
  meta: Localized
  href: string
}

export type PosterItem = {
  id: string
  src: string
  alt: string
  title: string
  event: Localized
}

export type PosterPile = {
  id: string
  label: Localized
  posters: readonly PosterItem[]
}

/* ------------------------------------------------------------------
   Captions (shown in the cursor tooltip). Key = image id.
   ------------------------------------------------------------------ */

/**
 * Captions come from the file name automatically ("winona-098" -> "winona").
 * bandNames: full band name + festival/venue for every photo starting with that
 *   name (e.g. all "winona-*" files).
 * photoCaptions: band/venue for one specific photo (wins over bandNames).
 * Camera-style names (edg01579, mg-0499) have no caption until you add one.
 */
type Caption = { band?: string; venue?: string }

const bandNames: Record<string, Caption> = {
  winona: { band: "Winona Riders", venue: "Balaclava Fest 2026" },
  gab: { band: "Gab Ferreira", venue: "Balaclava Fest 2025" },
  yolatengo: { band: "Yo La Tengo" },
  ylt: { band: "Yo La Tengo" },
}

const photoCaptions: Record<string, Caption> = {
  "sophia-crowd-01": { band: "magnólia", venue: "hangar 110, são paulo" },
}

/** Folders whose file names are film-roll/lab names, not bands. */
const noAutoBand = new Set(["fotografia/35mm"])

const CAMERA_NAME = /^(edg|mg|img|dsc|dscf|p)-?\d+$/

const captionFromFileName = (id: string): Caption => {
  if (CAMERA_NAME.test(id)) return {}
  const base = id.replace(/-\d+$/, "")
  return bandNames[base] ?? { band: base.replace(/-/g, " ") }
}

const posterInfo: Record<string, { title: string; event: Localized; alt: string }> = {
  "poster-01": {
    title: "iz fan fest",
    event: { pt: "prévia shame / niceto bar", en: "shame pre-party / niceto bar" },
    alt: "Cartaz do IZ Fan Fest com fotos da banda Shame",
  },
  "poster-02": {
    title: "repefest",
    event: {
      pt: "capote, morro fuji, quebec / são paulo",
      en: "capote, morro fuji, quebec / são paulo",
    },
    alt: "Cartaz do Repefest com ilustração de um cachorro",
  },
  "poster-03": {
    title: "repefest halloween",
    event: { pt: "camaleão cultural / curitiba", en: "camaleão cultural / curitiba" },
    alt: "Cartaz do Repefest Halloween com ilustração de um lobo",
  },
  "poster-04": {
    title: "quem é você, alice? + turno noturno",
    event: {
      pt: "espaço cultural zepelim / brasília",
      en: "espaço cultural zepelim / brasília",
    },
    alt: "Cartaz com luas sorridentes para Quem É Você, Alice? e Turno Noturno",
  },
  "poster-05": {
    title: "repeteco de bolso: sorosoro",
    event: { pt: "itiban comics / curitiba", en: "itiban comics / curitiba" },
    alt: "Cartaz do Repeteco de Bolso com ilustração de gatinhos",
  },
}

/* ------------------------------------------------------------------ */

const formatOf = ({ width, height }: MediaImage): GalleryItem["format"] => {
  const ratio = width / height
  return ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square"
}

const photos = (name: string): GalleryItem[] =>
  folder(name).map((image) => {
    const caption =
      photoCaptions[image.id] ?? (noAutoBand.has(name) ? {} : captionFromFileName(image.id))
    const band = caption.band ?? ""
    return {
      id: image.id,
      src: image.src,
      alt: band ? `${band}, por sophia lino` : "fotografia por sophia lino",
      band,
      venue: caption.venue ?? "",
      format: formatOf(image),
    }
  })

const posters = (name: string): PosterItem[] =>
  folder(name).map((image) => {
    const info = posterInfo[image.id]
    return {
      id: image.id,
      src: image.src,
      alt: info?.alt ?? "cartaz por sophia lino",
      title: info?.title ?? "",
      event: info?.event ?? { pt: "", en: "" },
    }
  })

export const portfolioContent = {
  brand: {
    name: "sophia lino",
    homeHref: "#",
  },
  navigation: [
    { label: { pt: "fotografia", en: "photography" }, href: "#/fotografia" },
    { label: { pt: "comunicação", en: "communication" }, href: "#/comunicacao" },
    { label: { pt: "design", en: "design" }, href: "#/design" },
    { label: { pt: "contato", en: "contact" }, href: "#/contato" },
    { label: { pt: "sobre mim", en: "about me" }, href: "#/sobre" },
  ],
  ui: {
    menuOpen: { pt: "menu", en: "menu" },
    menuClose: { pt: "fechar ×", en: "close ×" },
    back: { pt: "voltar", en: "back" },
    reshuffle: { pt: "embaralhar", en: "reshuffle" },
  },

  /* ---------- home: doodle + cursor image trail ---------- */
  home: {
    doodle: "/brand/doodle.png",
    doodleAlt: "rosto desenhado à mão com óculos redondos e cabelo bagunçado",
    trailImages: folder("home").map((image) => image.src),
  },

  /* ---------- fotografia ---------- */
  photography: {
    label: { pt: "fotografia", en: "photography" },
    piles: [
      {
        id: "festivais",
        label: { pt: "festivais", en: "festivals" },
        items: photos("fotografia/festivais"),
      },
      {
        id: "shows",
        label: { pt: "shows", en: "gigs" },
        items: photos("fotografia/shows"),
      },
      {
        id: "35mm",
        label: { pt: "35mm", en: "35mm" },
        items: photos("fotografia/35mm"),
      },
    ] satisfies PhotoPile[],
  },

  /* ---------- comunicação ---------- */
  communication: {
    projectsHeading: { pt: "social media & conteúdo", en: "social media & content" },
    articlesHeading: { pt: "redação & entrevistas", en: "writing & interviews" },
    more: { label: { pt: "ver mais", en: "see more" }, href: "#/comunicacao" },
    projects: [
      {
        id: "repeteco",
        title: "revista repeteco",
        meta: { pt: "direção de arte / editorial", en: "art direction / editorial" },
        href: "#/comunicacao",
      },
      {
        id: "interzine",
        title: "interzine brasil",
        meta: { pt: "gestão / cobertura", en: "management / coverage" },
        href: "#/comunicacao",
      },
      {
        id: "estranhos-encontros",
        title: "estranhos encontros: são paulo independent film festival",
        meta: { pt: "comunicação / social media", en: "communication / social media" },
        href: "#/comunicacao",
      },
    ] satisfies CommunicationItem[],
    articles: [
      {
        id: "mike-kinsella",
        title: "mike kinsella",
        meta: { pt: "entrevista / mad sound", en: "interview / mad sound" },
        href: "#/comunicacao",
      },
      {
        id: "naoko-yamano",
        title: "naoko yamano (shonen knife)",
        meta: { pt: "entrevista / mad sound", en: "interview / mad sound" },
        href: "#/comunicacao",
      },
      {
        id: "pulp-buenos-aires",
        title: "pulp em buenos aires",
        meta: { pt: "cobertura / wikimetal", en: "coverage / wikimetal" },
        href: "#/comunicacao",
      },
    ] satisfies CommunicationItem[],
  },

  /* ---------- design ---------- */
  design: {
    piles: [
      { id: "flyers", label: { pt: "flyers", en: "flyers" }, posters: posters("design/flyers") },
      {
        id: "autorias",
        label: { pt: "autorias", en: "personal" },
        posters: posters("design/autorias"),
      },
    ] satisfies PosterPile[],
  },

  /* ---------- contato ---------- */
  contact: {
    heading: { pt: "credencial de imprensa", en: "press pass" },
    name: "sophia lino",
    role: {
      pt: "fotografia de show / design / comunicação",
      en: "concert photography / design / communication",
    },
    emailLabel: { pt: "e-mail", en: "e-mail" },
    email: "oi@sophialino.com",
    copy: { pt: "[copiar]", en: "[copy]" },
    copied: { pt: "[copiado]", en: "[copied]" },
    links: [] as readonly { label: string; href: string }[],
  },

  /* ---------- sobre mim ---------- */
  about: {
    heading: { pt: "sobre mim", en: "about me" },
    portrait: "/brand/doodle.png",
    portraitAlt: {
      pt: "autorretrato desenhado à mão de sophia lino",
      en: "hand-drawn self-portrait of sophia lino",
    },
    bio: [
      {
        pt: "sophia lino fotografa shows, desenha cartazes e escreve sobre música na cena independente.",
        en: "sophia lino photographs gigs, designs posters and writes about music in the independent scene.",
      },
      {
        pt: "trabalha entre o palco, a pista e a redação: cobertura de festivais, flyers, zines, social media e entrevistas.",
        en: "she works between the stage, the pit and the newsroom: festival coverage, flyers, zines, social media and interviews.",
      },
    ] satisfies Localized[],
  },
} as const
