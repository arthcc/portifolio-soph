# sophia lino — portfólio

Port da code base do Figma Make [Concert Photographer Portfolio](https://www.figma.com/make/GnTGeJPTisizYVVYsCPac6/Concert-Photographer-Portfolio)
para um projeto Vite + React 19 + TypeScript standalone.

O design não foi alterado: `src/index.css`, todos os componentes e
`src/portfolioContent.ts` são cópias verbatim dos fontes do Make.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve dist/
npm run typecheck  # tsc --noEmit
```

## Estrutura

```
index.html
src/
  main.tsx              entrypoint React
  App.tsx               roteamento por hash (#/fotografia, #/comunicacao, #/design)
  index.css             todo o design: shells, stack, galeria, cartazes, responsivo
  portfolioContent.ts   conteúdo + tipos (brand, nav, stack, gallery, communication, design)
  components/
    TopNavigation.tsx     topbar
    BrandBadge.tsx        doodle + "barulho visual"
    PhotoStack.tsx        pilha de fotos (scroll/teclado descarta, clique substitui)
    StackArtwork.tsx      variantes photo / contact sheet / editorial
    PhotographyGallery.tsx grid denso com legendas no hover
    CommunicationPage.tsx  duas colunas + preview "darkroom" no hover
    DesignPage.tsx        16 cartazes arrastáveis com tooltip + reset
public/
  favicon.svg
  sophia-lino-doodle.png
  photos/sophia-crowd-01.jpg
```

## Rotas

Hash-based, sem biblioteca de router:

| Hash             | Tela                |
| ---------------- | ------------------- |
| (vazio)          | landing (badge + pilha de fotos) |
| `#/fotografia`   | galeria             |
| `#/comunicacao`  | comunicação         |
| `#/design`       | cartazes            |

## Diferenças em relação ao Make

Nada visual — só o que era infraestrutura do próprio Make e não existe fora dele:

- **`vite.config.ts`**: o original importava `./.figma/make/site.json` e registrava
  cinco plugins internos do Figma (injeção de meta tags, replay do overlay de erro,
  fallback de React Refresh, rota `/.figma/make/kit.html`, sourcemaps de pacotes
  linkados). Nenhum desses arquivos vem no export. Ficaram apenas `react()`,
  `tailwindcss()` e o alias `@ → ./src`.
- **`index.html`**: os placeholders `<!-- figma:lang -->`, `<!-- figma:title -->` e
  os slots de script eram preenchidos em build pelo plugin acima. Foram substituídos
  por valores literais — `lang="pt-BR"`, título `sophia lino — barulho visual` e o
  `<link rel="icon">`. Ajuste o título se o `site.json` do Make usava outro.
- **`package.json`**: `name` passou de `figma-make-app` para `sophia-lino-portfolio`;
  acrescentado o script `typecheck`. Dependências idênticas.
- **`src/imports/_MG_6556.jpg`**: vinha no export mas nenhum fonte o referencia —
  é o mesmo arquivo que `public/photos/sophia-crowd-01.jpg`. Mantido por fidelidade.

## Imagens

Só três assets são locais (`public/`). O resto das fotos, capas e cartazes aponta
para URLs do Unsplash em `src/portfolioContent.ts`, exatamente como no Make — logo a
galeria, a página de comunicação e a de design precisam de rede para renderizar.
Para hospedar por conta própria, baixe os arquivos e troque as URLs naquele arquivo.
