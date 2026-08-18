# Rooted & Green — Design Spec

**Date:** 2026-07-11
**Type:** Front-end only React + Vite web app (no backend)

## Brand

- **Name:** Rooted & Green — local garden design & maintenance business
- **Tagline:** "Gardens that grow with you."
- **Mood:** Fresh & natural. Calm, trustworthy, organic.
- **Palette:** deep leaf green (primary), sage, cream (background), soft earth brown (accent)
- **Type:** clean sans-serif, generous whitespace, plant imagery

## Tech Stack

- React + Vite
- React Router for pages
- `react-markdown` for rendering post bodies
- Data persisted in **localStorage** (no server, no real auth)

## Pages & Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Hero, services overview, "Latest from the blog" (3 recent posts), CTA |
| `/blog` | Blog list | All posts as cards, with search + category filter |
| `/blog/:slug` | Single post | Full article (markdown), cover image, author/date, back link |
| `/admin` | Admin panel | List posts + create / edit / delete (working UI, fake data) |

## Data Model (one post)

```
{
  id,
  title,
  slug,
  excerpt,
  coverImage,   // hero image URL for cards + top of post
  content,      // Markdown string — may contain inline images ![alt](url), headings, lists
  category,
  author,
  date
}
```

## Data Layer ("fake data")

- ~5 seeded sample posts in `seedData.js`.
- A shared `usePosts` hook is the single source of truth, reading/writing localStorage.
- Landing, Blog list, and Admin all use `usePosts` so they stay in sync.
- Admin create/edit/delete updates localStorage → changes appear instantly on public pages.
- Content is Markdown; the post page renders it (inline images via URL, headings, lists, emphasis).
- No login wall required. Data resets only if browser storage is cleared.

## Component Structure

- **Shared:** `Navbar`, `Footer`, `Layout`, `PostCard`
- **Public:** `Landing`, `BlogList`, `BlogPost`
- **Admin:** `AdminDashboard` (posts table), `PostForm` (create/edit, markdown textarea)
- **Data:** `usePosts` hook + `seedData.js`

## Out of Scope (intentionally simple)

No real backend, no real authentication, no image uploads (images are URLs),
no comments, no tags/reading-time. All easy to add later.
