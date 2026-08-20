# 🌿 Rooted & Green

_Gardens that live with you._

A front-end-only React + Vite blog site for a garden design & maintenance
business. Posts are seeded on first run and persisted entirely in the browser's
`localStorage` — no backend, no build-time data, no real auth.

## Stack

- **React 19** + **Vite**
- **react-router-dom** — routing
- **react-markdown** — renders post bodies (headings, lists, emphasis, and
  inline images)
- **localStorage** — the single source of truth for posts

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

| Route         | Page      | Purpose                                               |
| ------------- | --------- | ----------------------------------------------------- |
| `/`           | Landing   | Hero, services, latest 3 posts, call-to-action        |
| `/blog`       | Blog list | All posts as cards, with search + category filter     |
| `/blog/:slug` | Post      | Cover image, meta, Markdown body (with inline images) |
| `/admin`      | Admin     | Table of posts + create / edit / delete (open panel)  |

## How the data works

- `src/data/seedData.js` — ~5 garden-themed sample posts, each with a cover
  image and a Markdown `content` field containing an inline image, headings,
  and lists.
- `src/hooks/usePosts.js` — the shared hook and single source of truth. It
  loads from `localStorage` (seeding on first run) and exposes `getAll`,
  `getBySlug`, `create`, `update`, and `remove`. Every page uses it, so admin
  edits appear instantly on the public pages. It also syncs across open tabs.

To reset all data back to the seed posts, clear the site's `localStorage`
(key: `rooted-and-green:posts`).

## Notes / limitations

- No real authentication — the admin panel is intentionally open.
- Images are URLs only (no uploads); all sample imagery uses
  `picsum.photos` seeded URLs, so they load without any API key.
- Data lives in the browser, so it does not sync between devices.
