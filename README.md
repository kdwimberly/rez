# REZ — Of Rune & Ruin

The canonical website for **REZ**, an interactive illustrated fantasy novel.

This repository contains the permanent artwork, editorial pages, and scroll-directed chapter system deployed to Vercel.

## Structure

- `public/artwork/prologue/` — permanent Prologue artwork
- `public/artwork/editorial/` — identity and editorial reference artwork
- `public/js/` — reusable navigation and scroll-scene components
- `public/styles/` — shared design system and chapter themes
- route folders — independent static routes, each with its own `index.html`

## Local preview

```bash
npx serve public
```

## Production

Vercel serves `public` with clean URLs. `kdwimberly/rez` is the canonical source repository.
