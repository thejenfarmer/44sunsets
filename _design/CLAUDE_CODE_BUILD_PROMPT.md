# Build prompt — 44 Sunsets demo app

Paste this whole file to Claude Code as the task brief. Everything it needs is here; the design source of truth is the file named in §1.

---

## 1. What you are building

A **clickable, front-end-only demo** of *44 Sunsets* — an ADHD founder productivity app — for third-party testers. It ships to GitHub and deploys on Vercel as a public link. Testers open it on a phone, walk a 2-screen onboarding, land on Home, and can enter every room and complete every loop against seeded demo data. No account, no backend, no network calls.

**Design source of truth:** `44 Sunsets.dc.html` in this repo (open it in a browser — it renders as a design canvas of iPhone mockups grouped into numbered "turns"). Every screen below cites its option id (e.g. `17b ②`, `23c`). When something is ambiguous, the **highest turn number wins** — turn 23 supersedes turn 20 supersedes turn 14, etc.

`MVP Documentation.md` and `Design System.md` are earlier drafts. Use them for tone and token values only. Where they conflict with `44 Sunsets.dc.html`, the .dc.html wins. Known stale bits in those files: "The One Thing" (now **Deep Work**), the day-shape bar (removed), the Net teaser at the bottom of Home (now a top-left icon), a fifth door for the scheduled call (now a header chip).

**Do not redesign anything.** Match the mockups. If a state isn't drawn, follow the rules in §7 and leave a `// SPEC GAP:` comment.

---

## 2. Stack and repo

- **Next.js (App Router) + TypeScript + Tailwind CSS.** No other UI libraries, no component kits, no icon packs.
- All state in React context + `localStorage` (key prefix `44s.demo.`). No database, no API routes, no auth, no analytics SDK.
- Fonts: **Poppins** 400/500/600/700 via `next/font/google`. (The design doc also uses Instrument Serif in one place — the onboarding promise line — load it the same way.)
- Mobile-first. The app is designed at **402 × 874** (iPhone 15 Pro). On desktop, center the app in a phone-width column (max-width 440px) on a `#EFE7DA` field — do not build a responsive desktop layout.
- Icons: hand-built from divs/CSS per the mockups. **Do not import an icon library and do not hand-draw complex SVG.** The only glyphs in the product are `→`, `←`, `✓`, `⚒`, and the Net checklist mark (three rows: a 4px hollow square + a 2px line).
- Structure:

```
app/
  layout.tsx            root, fonts, phone shell
  page.tsx              boots to onboarding or home
  onboarding/page.tsx
  home/page.tsx
  net/page.tsx          browse + sort entry
  net/sort/page.tsx
  deep-work/…           kickoff → ignition → session → landing
  knockout/…            entry → round → win → landing
  side-quests/page.tsx
  impossible/…          pick → break → piece → landing → complete
  session/page.tsx      scheduled session with Jen
  profile/…             profile → stack → settings
components/
  Door.tsx  BackPill.tsx  DarkPill.tsx  QuietExit.tsx  Paper.tsx  Grain.tsx
  NetIcon.tsx  CallChip.tsx  Avatar.tsx  StackBlocks.tsx  Sheet.tsx  FeelChip.tsx
lib/
  seed.ts     demo data
  deal.ts     the daily deal
  state.ts    context + localStorage
  haptics.ts  navigator.vibrate wrapper
```

---

## 3. Design tokens

```ts
paper       #FAF3E7   // every light screen
card        #FFFDF6   // quiet cards, sheets
ink         #221A12   // text, dark pill
inkMuted    rgba(34,26,18,.45–.6)
cream       #FAF3E7   // text on dark
dawn        linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 46%)   // warm top wash
```

**The four door materials — one material, one meaning. Never reuse a gradient outside its door.**

| Door | Material | Text |
|---|---|---|
| Deep Work | `linear-gradient(150deg,#F8B9A6,#F6C95C)` | ink |
| Knockout Round | `linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)` | cream |
| Side Quests | `linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)` | ink |
| The Impossible Thing | `linear-gradient(150deg,#174D63,#1B3A4A)` | cream |

Other surfaces: Knockout mid-round room is `#221A12` + grain (the one mode shift, "stage lights not warning lights"). The Net's material is **cream + 1.5px dashed** ink at 25–35%.

**Grain:** a static fractal-noise SVG at opacity .05 (.06–.14 on dark), `pointer-events:none`, on every paper surface. Copy the data-URI from any mockup. Never animate it.

**Type:** Poppins only, except the onboarding promise (Instrument Serif 400, 44px/1.2). Headlines 700, −.015em, 24–34px. Eyebrows 600 11px, `.14em`, uppercase, muted. Body 13–14.5px, line-height ≥1.4.

**Shape:** cards 24px radius, pills 999px, min-height 56px for the dark pill, **44px minimum hit target everywhere**.

**Dark pill** (the one saturated element on a screen): `bg #221A12`, `color #FAF3E7`, `shadow 0 10px 22px -10px rgba(34,26,18,.6)`.

**Motion budget — exactly three things move. Nothing else, ever:**
1. **Time** — the settle bar filling; Knockout blocks draining with one breath-pulse per minute.
2. **Reward** — a block dropping onto the Stack, ~350ms settle, no persistent highlight.
3. **Presence** — the body-doubling glow: `0 0 0 5px rgba(246,201,92,.3), 0 0 22px rgba(244,166,155,.5)`, slow, low amplitude. If you notice it while reading the task title, it's too loud.

Respect `prefers-reduced-motion: reduce` — drop all three to instant state changes.

---

## 4. Product rules (these are the spec — enforce them in code review)

1. **No red anywhere.** No streaks, points, targets, overdue states, backlog counts, or numeric countdowns on focus surfaces. Color never encodes status or lateness. "Late" does not exist in this product.
2. **Time is a shape, never digits** on a focus surface. The only sanctioned digits in the whole demo are the scheduled call time ("2:00") and the Knockout win line ("20 minutes done.").
3. **One saturated element per screen, maximum.** Mid-session screens have zero.
4. **Every screen has exactly one exit.** Top-left ghost pill: muted text, no border, no fill, same slot on every room (`19a`).
   - `← Home` on a room entry or a Stack landing.
   - `← Back` when the screen is a step inside a room, or the room was entered from a notification (Kickoff switch/ignition, every Impossible Thing step, the capture sheet, the invite composer, the scheduled session pre-screen).
   - `← Leave quietly` while a session, round, or quest is running.
   - No confirmation dialog, ever. Leaving costs nothing and progress already landed.
   - A bottom quiet exit exists **only** when it is a *different action* — declining the dealt task ("Not today →", "Not now →", "Not yet →") or moving to the next piece. Never a second way home.
5. **No blank field as a first action.** Everything arrives pre-filled; write-in is the escape hatch.
6. **Never expose routing logic.** No "Pulls me" labels inside rooms, no counts, no time estimates, no "3 of 7".
7. **The app never makes a sound.** Every alert is one short `navigator.vibrate(20)`: the 5-minute call reminder, the round-end bell, a landed capture. (Guard for unsupported browsers.)
8. **Locked vocabulary, used verbatim:** Deep Work · Knockout Round · Side Quests · The Impossible Thing · The Net · The Sort · The Stack · Dreading it · Pulls me · Mark it done. Never invent synonyms.
9. **Plain language.** Literal, idiom-free, present tense, one fact per line — the copy has been through a pass for autistic founders. Use the strings in the mockups verbatim; do not "improve" them.

---

## 5. Screens to build

Each entry: route — what it is — doc reference.

### Onboarding (on rails, 2 screens, one tap each)
- `/onboarding` step 1 — **the promise** (`18f`). Cream paper, sunset horizon band rising from the bottom (no sun drawn), Instrument Serif: "Some lists can't be prioritized." / italic at 78% ink "They can only be started." One dark pill: `Begin →`.
- `/onboarding` step 2 — **the four doors** (`18c`). Headline "Every morning you get four doors." + "A door is a way to start working. The app puts today's tasks behind them for you based on how you feel about the work." Then four rows, each a 46×56 rounded material swatch + door name + one literal sentence. Closing line "You can open any door. You can leave any room at any time." Dark pill: `Start` → `/home`. Onboarding is shown once (localStorage flag).

### Home (`/home`)
Header (`23e`), always: **Net icon top-left** (dashed rounded square, checklist glyph, sunset count badge) · **call chip + profile avatar top-right**. Then date headline + one line, then **exactly four doors** — Deep Work, Knockout Round, Side Quests, The Impossible Thing, each tilted ±0.6–1.2° (static). Nothing else. Reference `14d` for the default outfit; `21b` for a door carrying a thread slip.
- Net icon: **tap** → `/net`; **hold (500ms)** → capture sheet over Home (`23a`), icon presses in, one vibration, field focused. Badge = unsorted count, caps at `9+`, hidden at zero (icon stays), **persists across sessions/overnight**. The icon exists **only on Home** — no capture inside a room.
- Call chip states (`23e`): absent when nothing is scheduled · cream `2:00` later today · cream `in 5 min` · **sunset gradient `Join`** when live (the only time a header element is saturated). Tap before → `/session` pre-screen; live → straight into the session.
- Avatar → `/profile`.
- A live thread renders as a paper slip tucked under its door's bottom edge, italic, mid-sentence, never dated (`21b`).
- **Day zero** (`23c`): four doors in "empty" faces — cream card, dashed border in the door's own hue, a material dot, the door name, and what it needs ("Needs one big task."). Dark pill "Put something in the Net" + quiet "Or connect email, Slack, Linear →". Same face is used for a single empty door.
- **All done** (`23d`): finished doors stay in place at 32% material opacity with a ✓ and "Done for today." No re-deal button. A done door is tappable and opens its room read-only. Quiet line: "See today on the Stack →".

### The Net (`/net`, `/net/sort`)
- Capture sheet (`20a`/`23a`): "Write it down." + one question only — **Dreading it / Pulls me** (skippable) — then "Save to the Net".
- The Sort (`20c`): swipe deck. Left = dreading it, right = pulls me, up = Impossible-worthy, down = toss. Size/timing is *proposed* on the card ("Short task · this week · tap to change"), never swiped. Already-tagged catches skip to size/timing.
- The toss (`20d`): serif moment, card sinks and fades, no confirm, no undo toast.
- Deck cleared (`20e`): a dashed block lands on the Stack — sorting counts as work.
- Browse (`20f` by project · `20g` by feel · `20h` by freshness). Build `20f` as the default view with `20g` as a toggle; older items fade (`20h` behavior) but never turn red or say "late".

### Deep Work (`/deep-work`)
Opening the Deep Work door **always** opens the Kickoff — there is no second path.
1. `17b ①` **the focus**, pre-selected, with any live thread shown as a "YOUR NOTE FROM LAST TIME" slip on the card. Tapping the slip skips step 2 and opens the session mid-motion (`21c`). Otherwise `This one →`.
2. `17b ①b` **the switch** — exactly two alternates + a write-in. Never a task list.
3. `17b ②` **choose how to start** — "Work with another person" (primary, sunset) / "Start with quiet minutes first" / quiet "Start now, with no timer →".
4. `17b ③a` settle-timer landing / `③b` no-timer landing. Deep Work is **not** timeboxed: no cap, no countdown. Actions: dark pill `Mark it done` + quiet `Stop here — leave a note for next time →`.
5. `17b ④` the sunset block lands on the Stack.

### The thread (turn 21)
- `21a` on the quiet exit: a pre-filled, mid-sentence note ("…drop the pricing table into page 2"), ellipsis intact, plus an equal-weight `Not now →`.
- **One thread at a time, ever.** It belongs to the task it was written about and is drawn under that task's door. Writing a new one replaces the old. It never ages, never shows a date, and vanishes when picked up or finished.
- `21c` re-entry: pulling the thread starts the session with zero decisions and the sentence completes itself upright.

### Knockout Round (`/knockout`)
- `11c` entry, before the bell: full-bleed band material, `Ring the bell →`, quiet `Not now →`.
- `11d` mid-round: the one mode shift — `#221A12` room, 4 pill blocks of 5 minutes (spent flat, active draining with a yellow glow and one breath-pulse per minute), zero saturated elements. Checking an item off **ticks in place**; nothing takes over the screen and the timer never pauses. A hard item shows one quiet contextual line offering company. **Nothing from the Impossible Thing ever appears in this list.**
- **Leaving early restarts the round.** A round left at minute 6 is not resumed — re-entering deals a fresh 20 minutes. Anything already checked off has landed; there is no "6 minutes remaining" anywhere.
- `11e` the win — shown **only when the timer ends**. Four flat blocks, "20 minutes done." / "That's the win — full stop." The list **stays live** below it ("Wanna check off anything else before you leave?"): same items, checked ones struck through in place, no new timer, no "extend" button.
- `11i` the Stack landing — fires **once, on the way out** of the round (pill, or leaving after the bell), one block per finished item in that item's material. A round where nothing got checked still lands: the sat-down time is the block.

### Side Quests (`/side-quests`)
- `11h` one screen: selection rings (not arrows), pick → work → `Mark it done`. Exit is the ghost pill only.
- `11g` completion: blocks land on the Stack, no counts anywhere.

### The Impossible Thing (`/impossible`)
- **One selected monster at a time, locked** — it cannot be swapped until every piece is done. The switch (`16b ①b`) is reachable only when nothing is in progress.
- `16b ①` pick → `①b` switch → `②` sign off on the break (the whole breakdown, visually) → `③` the door ends on the smallest piece → `④` the piece lands on the Stack → `⑤` complete: one question, next piece or leave.
- **Pieces never leave the room.** No tagging, no routing into Knockout or Side Quests. A finished piece dims in place wearing its material dot.

### Scheduled session with Jen (`/session`)
- `15a ①` before: "What will you work on?" + "Jen starts at 2:00." + dealt items + write-in + quiet "Not today. Go home →".
- `15a ②` during: presence glow on Jen's avatar, her own one-liner ("sketching the onboarding flow" — the app never exposes her list), opt-in "Show Jen what you are working on →", dark pill `Mark it done`, quiet `Stop here — leave a note for next time →`.
- `15a ③` the Stack landing; Jen's presence line stays until she leaves.
- `9b` invite composer: pick a slot (10/20/30), one tap sends the link.

### Profile (`/profile`, `/profile/stack`, `/profile/settings`) — `23b`
Reached only by tapping the avatar. Three destinations: **Your Stack** (its first real entrance — blocks, oldest at the bottom, no counts/streaks/heat-map), **Your Net** (full review, "7 still to sort"), **Settings** (connections, reminders/vibration, the people you can sit with). One number in the whole screen: "Day 41." — days since you started, never days in a row.

---

## 6. Demo data (seed it exactly)

Persona: a solo founder with two kids, aging parents, and a hobby she keeps postponing. Preload the Net with a realistic mix so the Sort feels true:

```ts
// lib/seed.ts
net: [
  { text: "Book Mom's cardiology follow-up", feel: null,        source: 'email',  project: 'family' },
  { text: "Reschedule Dad's hearing-aid fitting", feel: null,   source: 'manual', project: 'family' },
  { text: "Call the insurance about Dad's claim", feel: 'dread',source: 'manual', project: 'family' },
  { text: "Camp forms — due Friday", feel: null,                source: 'email',  project: 'family' },
  { text: "Rewrite the traction slide", feel: 'pull',           source: 'manual', project: 'the deck' },
  { text: "Ask Sam for the churn numbers", feel: 'dread',       source: 'slack',  project: 'the deck' },
  { text: "Sign up for the Tuesday pottery class", feel: 'pull', source: 'manual', project: 'me' },
]
impossible: "Find a home aide for Dad"      // the one locked monster
deepWork:   "Draft the fundraising narrative"
thread:     "…drop the pricing table into page 2"   // attached to Deep Work
knockout:   ["Reply to the accountant (easy start)" /* pre-checked */,
             "Draft one ugly paragraph of the pitch memo" /* hard → offers company */,
             "Chase the Stripe invoice", "Cancel the unused SaaS seat"]
call:       { with: 'Jen', at: '2:00' }
stack:      ~6 blocks of prior work in mixed materials
date:       "Monday, July 13."   // hard-coded; never read the device clock
```

**The deal (demo rule — implement in `lib/deal.ts`, deterministic, seeded by date):**
- Deep Work ← the largest `pull`-or-untagged item marked "big".
- Knockout Round ← up to 4 small `dread` items.
- Side Quests ← `pull` items that are not the Deep Work item.
- The Impossible Thing ← the one locked monster; if none is chosen, the door opens on the pick screen.
- The deal is computed once at first open of the day and **never changes mid-day**.

Ship a hidden reset: **long-press the profile avatar for 2s** → clears `localStorage` and reloads to onboarding. No visible admin UI.

---

## 7. When the spec runs out

Known gaps — pick the calmest option consistent with §4, and leave a `// SPEC GAP:` comment:
- Press/active states for doors, pills and rows (suggest: 0.98 scale + shadow reduction, 120ms).
- Room-to-room transition motion (suggest: 180ms cross-fade; no slide).
- Screen-reader strings for time-as-shape (e.g. `aria-label="15 of 20 minutes remaining"` on the block row — digits are allowed to assistive tech, never on screen).
- Backgrounded settle timer (Knockout is settled: restart. Deep Work has no timer, so nothing to resume).

---

## 8. Accessibility

- 44px minimum hit targets, verified.
- Text contrast ≥ 4.5:1 for body, ≥ 3:1 for large — the muted-ink scale bottoms out at `rgba(34,26,18,.6)` on paper for anything readable.
- `prefers-reduced-motion` disables all three motion types.
- Every icon-only control gets an `aria-label` in the locked vocabulary ("Open the Net", "Your profile").
- Real semantic buttons, keyboard focus visible, no div-only click targets.

---

## 9. Ship it

1. `npx create-next-app@latest` (TypeScript, Tailwind, App Router, no src dir), build the above.
2. `README.md`: what the demo is, the tester's happy path, how to reset, and the "not real data, no backend" disclaimer.
3. Commit in logical chunks. Push to a new GitHub repo `44-sunsets-demo`.
4. Deploy on Vercel from that repo. Framework preset Next.js, no env vars needed.
5. `app/layout.tsx` metadata: title "44 Sunsets", `viewport: { width: 'device-width', initialScale: 1, viewportFit: 'cover' }`, `themeColor: '#FAF3E7'`, apple-mobile-web-app-capable, and an apple-touch-icon so it looks right when a tester adds it to their home screen.
6. Report back with the Vercel URL and anything you had to guess.

## 10. Acceptance checklist

- [ ] Onboarding is 2 screens, one tap each, shown once.
- [ ] Home shows **exactly four doors**, Net icon top-left, call chip + avatar top-right — on every state.
- [ ] Every room has exactly one exit, in the top-left slot, with the correct label of the three.
- [ ] No red pixel anywhere; no digits on a focus surface except "2:00" and "20 minutes done."
- [ ] Net icon: tap opens the Net, hold captures, badge caps at 9+ and survives a reload.
- [ ] Leaving a Knockout round mid-way and re-entering deals a **fresh** 20 minutes.
- [ ] `11i` fires once on exit — never on an individual check-off.
- [ ] The Impossible Thing cannot be swapped while pieces remain; no piece appears in any other room.
- [ ] One thread maximum in the entire app at any time.
- [ ] Day-zero and all-done Home states render per `23c`/`23d`.
- [ ] Every alert vibrates; nothing plays audio.
- [ ] Reduced-motion setting stops the glow, the drain, and the Stack drop.
- [ ] Lighthouse accessibility ≥ 95 on `/home`.
