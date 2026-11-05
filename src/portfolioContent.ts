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

export type CommunicationItem = {
  id: string
  title: string
  meta: string
  href: string
  preview: string
  previewAlt: string
}

export type PosterItem = {
  id: string
  src: string
  alt: string
  title: string
  event: string
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

export const portfolioContent = {
  brand: {
    name: "sophia lino",
    homeHref: "#",
  },
  navigation: [
    { label: "fotografia", href: "#/fotografia" },
    { label: "comunicação", href: "#/comunicacao" },
    { label: "design", href: "#/design" },
    { label: "contato", href: "mailto:oi@sophialino.com" },
    { label: "sobre mim", href: "#sobre" },
  ],
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
  gallery: {
    label: "fotografia — arquivo",
    items: [
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
    ] satisfies GalleryItem[],
  },
  communication: {
    projectsHeading: "Social Media & Conteúdo",
    articlesHeading: "Redação & Entrevistas",
    projects: [
      {
        id: "repeteco",
        title: "Revista Repeteco",
        meta: "direção de arte / editorial",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1744280784099-3cf76ea878b4?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Página impressa em preto e branco",
      },
      {
        id: "interzine",
        title: "Interzine Brasil",
        meta: "gestão / cobertura",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1573152958734-1922c188fba3?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Público em um concerto",
      },
      {
        id: "estranhos-encontros",
        title: "Estranhos Encontros: São Paulo Independent Film Festival",
        meta: "comunicação / social media",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1659998502153-a7ea72880379?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Câmera analógica sobre uma mesa",
      },
    ] satisfies CommunicationItem[],
    articles: [
      {
        id: "mike-kinsella",
        title: "Mike Kinsella Interview",
        meta: "Mad Sound",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1595694548657-8e6f0d681f8a?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Máquina de escrever em preto e branco",
      },
      {
        id: "naoko-yamano",
        title: "Naoko Yamano / Shonen Knife Interview",
        meta: "Mad Sound",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1612873003118-f0160ec93f4c?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Máquina de escrever com uma folha de papel",
      },
      {
        id: "pulp-buenos-aires",
        title: "Pulp in Buenos Aires Coverage",
        meta: "Wikimetal",
        href: "#/comunicacao",
        preview:
          "https://images.unsplash.com/photo-1731702981357-dbbe3ab354a8?auto=format&fit=crop&w=1000&q=88",
        previewAlt: "Mesa com máquina de escrever e papéis",
      },
    ] satisfies CommunicationItem[],
  },
  design: {
    resetLabel: "↺ [resetar posições]",
    posters: [
      {
        id: "poster-01",
        src: "/photos/web/poster-01.jpg",
        alt: "Cartaz laranja e vermelho do IZ Fan Fest com fotos da banda Shame",
        title: "iz fan fest",
        event: "previa shame / niceto bar",
      },
      {
        id: "poster-02",
        src: "/photos/web/poster-02.jpg",
        alt: "Cartaz preto e vermelho do Repefest com ilustração de um cachorro",
        title: "repefest",
        event: "capote, morro fuji, quebec / são paulo",
      },
      {
        id: "poster-03",
        src: "/photos/web/poster-03.jpg",
        alt: "Cartaz amarelo do Repefest Halloween com ilustração de um lobo",
        title: "repefest halloween",
        event: "camaleão cultural / curitiba",
      },
      {
        id: "poster-04",
        src: "/photos/web/poster-04.jpg",
        alt: "Cartaz azul com luas sorridentes para Quem É Você, Alice? e Turno Noturno",
        title: "quem é você, alice? + turno noturno",
        event: "espaço cultural zepelim / brasília",
      },
      {
        id: "poster-05",
        src: "/photos/web/poster-05.jpg",
        alt: "Cartaz rosa e roxo do Repeteco de Bolso com ilustração de gatinhos",
        title: "repeteco de bolso: sorosoro",
        event: "itiban comics / curitiba",
      },
    ] satisfies PosterItem[],
  },
} as const
