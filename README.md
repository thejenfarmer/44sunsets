# ADHD Founder OS — MVP Demo

A mobile-first focus app for overwhelmed founders, built as a click-through demo.
The core loop: a calm Home deals the day's three "doors" (The One Thing, Side
Quests, Knockout Round), each door opens a single-object room, every completed
thing lands as a material block on The Stack, and a lightweight body-doubling
invite lets a friend "sit with you" during deep work.

## Stack

- **Vite + React**, single-page app. No backend, no database, no auth.
- All state in React + `localStorage`. Jen's presence is mocked with timers.
- Phone-shaped layout: a fixed ~402px app column centered on the paper
  background, so it demos well on desktop and mobile browsers.

## Run it

```sh
npm install
npm run dev      # local dev server
npm run build    # static build in dist/
npm run preview  # serve the build locally
```

## Deploy (free tier)

The build is fully static (`vite build` → `dist/`, relative asset paths), so
any of these produce a public shareable URL:

- **Vercel**: import the repo at vercel.com/new — it auto-detects Vite. URL: `*.vercel.app`.
- **Netlify**: "Add new site → Import from Git", build command `npm run build`,
  publish directory `dist`. URL: `*.netlify.app`.
- **GitHub Pages**: `npm run build && npx gh-pages -d dist`, then enable Pages
  on the `gh-pages` branch.

## Design system — "Sunset Paper"

Tokens live in `src/styles.css`. The essentials, per the handoff spec:

- Paper `#FAF3E7`, card `#FFFDF6`, ink `#221A12`, muted ink `rgba(34,26,18,.45–.6)`.
- Three meaning-locked gradients: Sunset (`160deg #F8B9A6→#F6C95C`, deep work),
  Knockout band (`105deg #7CA75F→#2E9B82→#2F7FA0`, deepened in-room), and
  Blue→yellow (`105deg #2F7FA0→#F6C95C`, side quests).
- Poppins only (400–700). Grain = static fractal-noise SVG at .05 opacity.
- Dark pill CTA: `#221A12`, 999px radius, min-height 56px; 44px minimum hit targets.
- Rules: one saturated element per screen, no red, no counts, no digits on
  focus surfaces, every exit is a quiet "… →".
- Motion budget — exactly three things move: time shapes (settle bar, Knockout
  drain), reward (Stack block drop, ~500ms settle), presence (the breathing glow).

## Demo notes

- The daily "outfit" (door order + tilts) is picked deterministically from the
  date; the sky (morning / golden hour / night) follows the clock. Settings can
  pin a layout ("My pick" vs "Fresh each morning").
- Timers are demo-accelerated: the settle bar fills in ~15s and the 20-minute
  Knockout Round drains in ~32s.
- Sending an invite makes Jen "arrive" at her desk a few seconds later (mocked).
