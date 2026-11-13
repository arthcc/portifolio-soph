# sophia lino — portfólio

Vite + React 19 + TypeScript. Site estático, deploy automático no Fly.io a cada push na `main`.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run images     # gera as fotos para web a partir de media/originals (macOS)
npm run build      # gera dist/
npm run typecheck
```

## Fotos e cartazes

Os arquivos originais (pesados) ficam em `media/originals/` — **fora do git e fora do site**.
Cada pasta vira uma pilha automaticamente:

```
media/originals/
  home/                    rastro de imagens do cursor na página inicial
  fotografia/festivais/    pilha "festivais"
  fotografia/shows/        pilha "shows"
  fotografia/35mm/         pilha "35mm"
  design/flyers/           pilha "flyers"
  design/autorias/         pilha "autorias"
```

Para adicionar/trocar/remover: coloque ou apague o arquivo na pasta e rode `npm run images`.
O script cria a versão web (máx. 2000px, JPEG 80) em `public/images/<mesma pasta>/` com nome
em minúsculas-com-hífen e atualiza `src/mediaManifest.json`. Faça commit de `public/images/`
e do manifesto.

Legendas (banda / local, título do cartaz) ficam em `src/portfolioContent.ts`, nos mapas
`photoCaptions` e `posterInfo`, usando o id do arquivo (ex.: `stereolab-02`). Foto sem
legenda não mostra tooltip.

## Estrutura

```
public/
  favicon.svg
  brand/doodle.png          doodle branco (home, sobre mim)
  images/…                  gerado por `npm run images` — não editar à mão
scripts/optimize-images.mjs
src/
  App.tsx                   rotas por hash + idioma [pt / en]
  portfolioContent.ts       todos os textos (pt/en), legendas e montagem das pilhas
  mediaManifest.json        gerado
  index.css                 estilos
  components/
    TopNavigation.tsx       menu + seletor de idioma
    HomeCanvas.tsx          doodle + rastro de imagens
    PhotographyGallery.tsx  pilhas de fotos → grid
    CommunicationPage.tsx   duas colunas
    DesignPage.tsx          pilhas de cartazes que se espalham, arrastáveis
    ContactPage.tsx         credencial de imprensa + copiar e-mail
    AboutPage.tsx           retrato + bio
    CursorTooltip.tsx       caixinha que segue o cursor
```

## Rotas

| Hash            | Página       |
| --------------- | ------------ |
| (vazio)         | home         |
| `#/fotografia`  | fotografia   |
| `#/comunicacao` | comunicação  |
| `#/design`      | design       |
| `#/contato`     | contato      |
| `#/sobre`       | sobre mim    |
