# Omran — Video Editor Portfolio

A dark, animated one-page portfolio built with plain HTML, CSS, and
JavaScript — no frameworks, no build step, no dependencies.

## Folder structure

```
portfolio-site/
├── index.html              All page content and structure
├── css/
│   └── style.css           Design tokens, layout, components, animations
├── js/
│   ├── portfolio-data.js   ← the ONLY file you edit to update videos
│   └── main.js             Interactions: scroll rail, gallery, lightbox, form
└── assets/
    ├── videos/             Drop your exported .mp4 files here
    └── images/             Optional thumbnails / your portrait photo
```

## How to update your portfolio videos

Open `js/portfolio-data.js`. It's a plain array — copy an existing
entry, change the title/category/file path, save. The gallery grid
and the category filter pills rebuild themselves automatically; you
never touch `index.html` for this.

```js
{
  title: "New Client Reel",
  category: "Podcast",
  videoSrc: "assets/videos/reel-07.mp4",
  posterSrc: "",              // leave blank for an auto placeholder
  client: "Client name"
}
```

## How to preview locally

Any static file server works, for example from this folder:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Opening
`index.html` directly by double-clicking also works for most
features, since there's no build step.)

## How to deploy

This folder is a complete static site. Drag it into Netlify or
Vercel, or push it to a GitHub repo and enable GitHub Pages — no
build command needed.

## Things you'll likely want to personalize

- `assets/images/` — add a real photo and point
  `.about__portrait-frame` in `css/style.css` at it.
- `assets/videos/` — add your real exported reels.
- Contact section in `index.html` — swap the placeholder email,
  Instagram, and WhatsApp links for your real ones.
- `js/main.js`, section 7 (Contact form) — currently shows a
  success message locally only. Wire it to a real form endpoint
  (Formspree, Getform, your own backend) when you're ready to
  receive real submissions.

## Design notes

- The vertical rail on the left is a scroll-progress "playhead,"
  styled like a timeline scrubber, with each section labeled by a
  timecode instead of a plain nav label.
- Portfolio cards are 9:16 — the real native shape of a Short/Reel
  — rather than generic 16:9 thumbnails.
- Color palette is a dark "editing suite" background with a warm
  amber (record/tally light) and cool teal (waveform/color-scope)
  accent pair, echoing the teal-and-orange grade familiar from
  video color work.
- Respects `prefers-reduced-motion` throughout.
