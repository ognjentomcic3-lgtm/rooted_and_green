# 🌿 Malina Garden

_Gardens that live with you._

A front-end-only React + Vite site for a garden design & maintenance business.
Projects are seeded on first run and persisted entirely in the browser's
`localStorage` — no backend, no build-time data, no real auth.

## Stack

- **React 19** + **Vite**
- **react-router-dom** — routing
- **react-markdown** — renders project bodies (headings, lists, emphasis, and
  inline images)
- **localStorage** — the single source of truth for projects

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Pages

| Route             | Page         | Purpose                                                  |
| ----------------- | ------------ | -------------------------------------------------------- |
| `/`               | Landing      | Full-screen header, services in detail, references        |
| `/projects`       | Project list | All projects as cards, with search + category filter      |
| `/projects/:slug` | Project      | Cover image, meta, Markdown body (with inline images)     |
| `/admin`          | Admin        | Table of projects + create / edit / delete (open panel)   |

## How the data works

- `src/data/seedData.js` — ~5 garden-themed sample projects, each with a cover
  image and a Markdown `content` field containing an inline image, headings,
  and lists.
- `src/hooks/usePosts.js` — the shared hook and single source of truth. It
  loads from `localStorage` (seeding on first run) and exposes `getAll`,
  `getBySlug`, `create`, `update`, and `remove`. Every page uses it, so admin
  edits appear instantly on the public pages. It also syncs across open tabs.

To reset all data back to the seed projects, clear the site's `localStorage`
(key: `rooted-and-green:posts`).

## Notes / limitations

- No real authentication — the admin panel is intentionally open.
- Images are URLs only (no uploads); all sample imagery uses
  `picsum.photos` seeded URLs, so they load without any API key.
- Data lives in the browser, so it does not sync between devices.
