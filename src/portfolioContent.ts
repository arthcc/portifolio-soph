/**
 * All site content lives here. To swap or add photos, posters or text,
 * edit the arrays below — nothing on the published site exposes upload UI.
 *
 * Bilingual strings use `{ pt, en }`; read them with `t(value, lang)`.
 */

export type Lang = "pt" | "en"
export type Localized = { pt: string; en: string }

export const t = (value: Localized | string, lang: Lang) =>
  typeof value === "string" ? value : value[lang]

export type ArtworkKind = "photo" | "contact" | "editorial"

export type StackItem = {
  id: string
  kind: ArtworkKind
  src?: string
  alt: string
  credit?: string
  /** width / height of the card, so horizontal and vertical photos aren't cropped */
  ratio: number
  /** Handwritten caption shown under the top photo */
  caption: { title: string; place: string }
}

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
  preview: string
  previewAlt: Localized
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

const concertOne = "/photos/web/sophia-crowd-01.jpg"
const concertTwo =
  "https://images.unsplash.com/photo-1782216574068-11d96a20fc09?auto=format&fit=crop&w=1800&q=90"
const concertThree =
  "https://images.unsplash.com/photo-1561986518-72ab9202cb72?auto=format&fit=crop&w=1800&q=90"
const landing01 = "/photos/web/01.jpg"
const landing02 = "/photos/web/02.jpg"
const landing03 = "/photos/web/03.jpg"
const landing04 = "/photos/web/04.jpg"

const showItems = [
  {
    id: "crowd-01",
    src: concertOne,
    alt: "Público reunido em um show underground",
    band: "magnólia",
    venue: "hangar 110, são paulo",
    format: "landscape",
  },
  {
    id: "stage-02",
    src: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?auto=format&fit=crop&w=1200&q=88",
    alt: "Multidão vista durante um concerto",
    band: "ruído/mm",
    venue: "circo voador, rio de janeiro",
    format: "square",
  },
  {
    id: "stage-03",
    src: concertTwo,
    alt: "Banda sob luzes fortes no palco",
    band: "terceiro mundo",
    venue: "casa da luz, são paulo",
    format: "portrait",
  },
  {
    id: "crowd-04",
    src: "https://images.unsplash.com/photo-1534435147492-fa0d8d53eb9f?auto=format&fit=crop&w=1200&q=88",
    alt: "Pessoa carregada pelo público durante um show",
    band: "desvio",
    venue: "galpão ladeira, belo horizonte",
    format: "landscape",
  },
  {
    id: "stage-05",
    src: concertThree,
    alt: "Artista cercado pelo público",
    band: "menores atos",
    venue: "audio rebel, rio de janeiro",
    format: "portrait",
  },
  {
    id: "crowd-06",
    src: "https://images.unsplash.com/photo-1522717887140-b78153b59e52?auto=format&fit=crop&w=1200&q=88",
    alt: "Público em um concerto em preto e branco",
    band: "cidade dormitório",
    venue: "ocupa 9, porto alegre",
    format: "square",
  },
  {
    id: "stage-07",
    src: "https://images.unsplash.com/photo-1603868418781-68a1d5222afe?auto=format&fit=crop&w=1200&q=88",
    alt: "Vocalista em apresentação ao vivo",
    band: "el toro fuerte",
    venue: "fffront, são paulo",
    format: "portrait",
  },
  {
    id: "stage-08",
    src: "https://images.unsplash.com/photo-1688658108886-7fff7b15cd68?auto=format&fit=crop&w=1200&q=88",
    alt: "Guitarrista tocando ao vivo",
    band: "test",
    venue: "mister rock, belo horizonte",
    format: "landscape",
  },
  {
    id: "crowd-09",
    src: "https://images.unsplash.com/photo-1748302913353-90a60a1cba9b?auto=format&fit=crop&w=1200&q=88",
    alt: "Público sob as luzes de um show",
    band: "terraplana",
    venue: "ó do borogodó, curitiba",
    format: "square",
  },
  {
    id: "stage-10",
    src: "https://images.unsplash.com/photo-1644786283596-5283bd41892a?auto=format&fit=crop&w=1200&q=88",
    alt: "Grupo reunido em cima do palco",
    band: "deafkids",
    venue: "c6 fest, são paulo",
    format: "landscape",
  },
] satisfies GalleryItem[]

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

  /* ---------- home (unchanged) ---------- */
  badge: {
    label: "barulho visual",
    image: "/logo---sop---branca.png",
    imageAlt:
      "Rosto desenhado à mão com óculos grandes e expressão indiferente",
    intro: "fotografia de show, design e comunicação na cena independente.",
    cta: { label: "ver arquivo →", href: "#/fotografia" },
  },
  stack: {
    replacementLabel: "Clique para ampliar ou role para passar a foto",
    angles: [-2.4, 1.6, -1.2, 2.7, -0.6],
    items: [
      {
        id: "stage",
        kind: "photo",
        src: landing01,
        alt: "Fotografia de show por Sophia Lino",
        ratio: 3 / 2,
        caption: { title: "magnólia", place: "hangar 110, são paulo" },
      },
      {
        id: "contact",
        kind: "contact",
        alt: "Folha de contato com fotografias de show",
        ratio: 4 / 3,
        caption: { title: "folha de contato", place: "arquivo 35mm" },
      },
      {
        id: "band",
        kind: "photo",
        src: landing02,
        alt: "Fotografia de show por Sophia Lino",
        ratio: 4 / 3,
        caption: { title: "terceiro mundo", place: "casa da luz, são paulo" },
      },
      {
        id: "live",
        kind: "photo",
        src: landing04,
        alt: "Fotografia de show por Sophia Lino",
        ratio: 3 / 2,
        caption: { title: "deafkids", place: "c6 fest, são paulo" },
      },
      {
        id: "crowd",
        kind: "photo",
        src: landing03,
        alt: "Fotografia de show por Sophia Lino",
        ratio: 3 / 2,
        caption: { title: "menores atos", place: "audio rebel, rio de janeiro" },
      },
    ] satisfies StackItem[],
    contactSheetImages: [landing01, landing02, landing03, landing04],
  },
  ticker: showItems.flatMap((item) => [item.band, item.venue]),

  /* ---------- fotografia ---------- */
  photography: {
    label: { pt: "fotografia", en: "photography" },
    piles: [
      {
        id: "festivais",
        label: { pt: "festivais", en: "festivals" },
        items: [
          {
            id: "fest-01",
            src: landing04,
            alt: "Fotografia de show por Sophia Lino",
            band: "deafkids",
            venue: "c6 fest, são paulo",
            format: "landscape",
          },
          showItems[9],
          showItems[1],
          {
            id: "fest-02",
            src: landing02,
            alt: "Fotografia de show por Sophia Lino",
            band: "terceiro mundo",
            venue: "casa da luz, são paulo",
            format: "landscape",
          },
          showItems[6],
          showItems[5],
        ],
      },
      {
        id: "shows",
        label: { pt: "shows", en: "gigs" },
        items: showItems,
      },
      {
        id: "35mm",
        label: { pt: "35mm", en: "35mm" },
        items: [
          {
            id: "film-01",
            src: landing01,
            alt: "Fotografia de show por Sophia Lino",
            band: "magnólia",
            venue: "hangar 110, são paulo",
            format: "portrait",
          },
          {
            id: "film-02",
            src: landing03,
            alt: "Fotografia de show por Sophia Lino",
            band: "menores atos",
            venue: "audio rebel, rio de janeiro",
            format: "landscape",
          },
          showItems[0],
          showItems[2],
          showItems[3],
          showItems[4],
        ],
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
        preview:
          "https://images.unsplash.com/photo-1744280784099-3cf76ea878b4?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "página impressa", en: "printed page" },
      },
      {
        id: "interzine",
        title: "interzine brasil",
        meta: { pt: "gestão / cobertura", en: "management / coverage" },
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1573152958734-1922c188fba3?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "público em um concerto", en: "crowd at a gig" },
      },
      {
        id: "estranhos-encontros",
        title: "estranhos encontros: são paulo independent film festival",
        meta: { pt: "comunicação / social media", en: "communication / social media" },
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1659998502153-a7ea72880379?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "câmera analógica", en: "film camera" },
      },
    ] satisfies CommunicationItem[],
    articles: [
      {
        id: "mike-kinsella",
        title: "mike kinsella",
        meta: { pt: "entrevista / mad sound", en: "interview / mad sound" },
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1595694548657-8e6f0d681f8a?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "máquina de escrever", en: "typewriter" },
      },
      {
        id: "naoko-yamano",
        title: "naoko yamano (shonen knife)",
        meta: { pt: "entrevista / mad sound", en: "interview / mad sound" },
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1612873003118-f0160ec93f4c?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "folha na máquina", en: "sheet in the typewriter" },
      },
      {
        id: "pulp-buenos-aires",
        title: "pulp em buenos aires",
        meta: { pt: "cobertura / wikimetal", en: "coverage / wikimetal" },
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1731702981357-dbbe3ab354a8?auto=format&fit=crop&w=1000&q=88",
        previewAlt: { pt: "mesa de redação", en: "writing desk" },
      },
    ] satisfies CommunicationItem[],
  },

  /* ---------- design ---------- */
  design: {
    piles: [
      {
        id: "flyers",
        label: { pt: "flyers", en: "flyers" },
        posters: [
          {
            id: "poster-01",
            src: "/photos/web/poster-01.jpg",
            alt: "Cartaz do IZ Fan Fest com fotos da banda Shame",
            title: "iz fan fest",
            event: { pt: "prévia shame / niceto bar", en: "shame pre-party / niceto bar" },
          },
          {
            id: "poster-02",
            src: "/photos/web/poster-02.jpg",
            alt: "Cartaz do Repefest com ilustração de um cachorro",
            title: "repefest",
            event: {
              pt: "capote, morro fuji, quebec / são paulo",
              en: "capote, morro fuji, quebec / são paulo",
            },
          },
          {
            id: "poster-03",
            src: "/photos/web/poster-03.jpg",
            alt: "Cartaz do Repefest Halloween com ilustração de um lobo",
            title: "repefest halloween",
            event: { pt: "camaleão cultural / curitiba", en: "camaleão cultural / curitiba" },
          },
        ],
      },
      {
        id: "autorias",
        label: { pt: "autorias", en: "personal" },
        posters: [
          {
            id: "poster-04",
            src: "/photos/web/poster-04.jpg",
            alt: "Cartaz com luas sorridentes para Quem É Você, Alice? e Turno Noturno",
            title: "quem é você, alice? + turno noturno",
            event: {
              pt: "espaço cultural zepelim / brasília",
              en: "espaço cultural zepelim / brasília",
            },
          },
          {
            id: "poster-05",
            src: "/photos/web/poster-05.jpg",
            alt: "Cartaz do Repeteco de Bolso com ilustração de gatinhos",
            title: "repeteco de bolso: sorosoro",
            event: { pt: "itiban comics / curitiba", en: "itiban comics / curitiba" },
          },
        ],
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
    portrait: "/logo---sop---branca.png",
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
