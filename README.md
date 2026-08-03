# 44 Sunsets — demo

A clickable, front-end-only demo of **44 Sunsets**, an ADHD-founder productivity app.
No account, no backend, no network calls — all state lives in React + `localStorage`
(key prefix `44s.demo.`). Built from `CLAUDE_CODE_BUILD_PROMPT.md`; the visual source
of truth is `_design/44_Sunsets.dc.html`.

**This is a demo. The data is not real and nothing is saved to a server.**

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # serve the build
```

Stack: **Vite + React + TypeScript + Tailwind CSS**. Hash routing (so refresh works on
static hosting). Fonts: Poppins + Instrument Serif (the onboarding promise) via Google Fonts.

## The tester's happy path

1. **Onboarding** (2 screens, one tap each) → the promise → the four doors → **Start**.
2. **Home** — four material doors (Deep Work · Knockout Round · Side Quests · The Impossible
   Thing), the Net icon (top-left, badge), the call chip + avatar (top-right).
3. Open any door and complete its loop; every finish lands a block on **The Stack**.
   - **Deep Work**: kickoff → pick how to start (sit with someone / settle timer / just jump in) → room → *Mark it done*.
   - **Knockout Round**: ring the bell → the roasted-dark room, draining timer, check items off → the win.
   - **Side Quests**: pick one → *Mark it done* → the batch lands.
   - **The Impossible Thing**: break the monster → tag the pieces → finish the smallest → chain to the next.
4. **The Net**: tap the icon to browse (tap to tag, hold to let go); **hold** the icon on Home to capture a thought; **The Sort** swipes the deck.
5. **Profile → Your Stack / Your Net / Settings**.

## Reset

There is no visible admin UI. **Long-press the profile avatar for 2 seconds** (Profile screen)
to clear `localStorage` and return to onboarding.

## What I had to decide / guess

- **Stack:** the build prompt named Next.js; per the request this is **Vite + React** (also what the project's own MVP README specifies). Same tokens, rules, and screens.
- **Onboarding:** built as the **2-screen** flow per `CLAUDE_CODE_BUILD_PROMPT.md` §5 (there is also a separate 5-screen `ONBOARDING.md`; the build prompt won).
- A few `// SPEC GAP:` comments mark places the drawings didn't specify (per-door onboarding one-liners; press states; the Sort uses tappable direction controls as a stand-in for swipe gestures).
- Demo timers are compressed so a tester can watch them (Knockout blocks drain in seconds, not minutes).

## Not yet done (needs your accounts)

- Pushing to a GitHub repo and deploying to Vercel/Netlify — see below.
