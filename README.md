# BWIRE — Botswana, in focus

A digital-first national news experience built with Gatsby 5 and React 18. The project reimagines what a modern Botswana news product can be: clear editorial hierarchy, fast local assets, useful audio and reading tools, and a complete mobile experience.

## Highlights

- Editorial homepage with a lead story, latest-news rail, top stories, most-read list, sport table, culture and opinion
- 13 statically generated article pages and 7 topic sections
- Instant client-side search across the newsroom
- Saved-story reading list persisted in local storage
- Browser-generated audio briefings and listen-to-article controls
- Newsletter validation and success states
- Responsive navigation, accessible dialogs, keyboard focus states and reduced-motion support
- Locally bundled Inter and Newsreader fonts; no render-blocking font requests

## Run locally

```bash
npm install
npm run develop
```

The development server binds to `0.0.0.0:8000` by default.

```bash
npm run build
npm run serve
```

## Content

Stories live in `src/data/articles.json`. `gatsby-node.js` creates an article route for every entry and a section route for every topic. Shared page furniture lives in `src/components`; the visual system is in `src/css/main.css`.

News photography is used for editorial demonstration. See [ATTRIBUTION.md](./ATTRIBUTION.md) for source credits.
