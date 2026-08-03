# ADHD Founder OS — MVP Documentation (final so far)

Source of truth for the shipped mockups in `ADHD Founder OS.dc.html` (screens 2a–2h, 3a, 4a–4b, 5a) plus the clickable demo in `Walkthrough.dc.html`. Reflects every decision through July 11, 2026.

---

## 0. Design system — the Sunset skin (final direction)

Chosen: **Sunset paper** (Magic Mind–inspired, turn 8) — warm cream with a faint grain, rounded Poppins type, soft pill buttons, dark near-black CTAs, one rough green–blue material reserved for Knockout.

**Tokens**
- Font: `Poppins` (400/500/600/700). Headlines 600, −.01em.
- Screen background: `#FAF3E7` cream + static fractal-noise grain overlay (never animated). Ink: `#221A12`. Muted: `rgba(34,26,18,.45–.7)`.
- Cards: `#FFFDF6`, `1px solid rgba(34,26,18,.1)`, radius 18–24px. Net teaser: dashed `rgba(34,26,18,.25)`.
- **Primary CTA:** near-black pill — `#221A12`, cream text, radius 999px, min-height 56px, soft drop shadow. One per screen.
- Sunset gradient `#F8B9A6 → #F6C95C` (pink→yellow): decorative warmth only — the ONE THING hero card, avatar, notification tile. Never status, never near Dread.
- **Knockout material:** rough olive→teal→blue band `#7CA75F → #2E9B82 → #2F7FA0` + grain. One material, one meaning: teased on Home's Knockout row (cream text), fully immersive on the round's timer pills (roasted-black room, active pill glows teal, sky-blue `#8FC7E0` eyebrow — the only colored eyebrow in the app).
- **Feeling scale (Stack strata + Net chips):** each layer wears the material of the surface it came from — sunset `#F8B9A6→#F6C95C` = The One Thing (hero-card gradient) · blue→yellow `#2F7FA0→#F6C95C` = Pulls me / Side Quests · green→blue band `#7CA75F→#2E9B82→#2F7FA0` = Dreading it (the Knockout material). The Stack re-tells where each win happened; still never alarm.
- Eyebrow rule: muted ink on all light surfaces; hierarchy comes from cards, not labels.
- Active time in the day-shape bar: soft peach `#F0B49C` (kin to the hero card gradient); pill-shaped segments.
- No red anywhere. No streaks, rings, points, targets, overdue, backlog counts. No numeric countdowns on focus surfaces. No ambient/looping motion (grain is static).

**Time metaphor (locked):** time is a shape. Home: the 24-hour day as a row of rectangles (spent parts lie thin, remaining stand tall, ink now-marker). Knockout: 4 big blocks of 5 minutes that drain. Deep Work: a two-minute settle bar that fills then dissolves. Never digits.

**Delight budget:** exactly two moments — ignition (Deep Work settle-bar completing; Side Quest Room entry) and completion (a block landing on the Stack). Nothing else moves.

---

## 2a — Home

Structure (top → bottom): `[ name ]` wordmark placeholder + avatar (→ Settings) · headline **"Saturday, July 4."** · day-shape bar · THE ONE THING · SIDE QUESTS · Knockout Round row · THE NET teaser.

- **THE ONE THING** — sunset-gradient hero card (pink→yellow): task title, ⇄ swap button, the dark pill **Start**, escape hatch "Not ready? Pick a Side Quest below."
- **SIDE QUESTS** — three quiet cards, title only (no "Pulls me" tags, no time estimates), each with a `···` affordance. Tap = start immediately; long-press/`···` = manage menu (*Complete* → Stack; *No longer needed* → Net, silent). Never a Dread item here.
- **Knockout Round row** — the rough olive→teal→blue grain band (the Knockout material's tease): bell icon, "Knockout Round" · "Twenty minutes of effort is the win." · "Ring the bell →", all in cream. Appears only when small-dread items exist.
- **THE NET** — inset dashed card, warm sample copy ('Caught in your Net today — "Chase the Stripe invoice," "Buy Sam's birthday gift," and more.'), **Open →**. Never a count.

## 2b — Change it: swap in place (the Set-your-day ritual is CUT)

Decision: no planning screen. Home arrives pre-shaped; this bottom sheet is the entire "planning" surface.

- Tapping ⇄ on Home lifts a light sheet over a dimmed Home: eyebrow THE ONE THING, headline **"Everything else can wait. This can't."**, a short list of known candidates with the current pick checked. Tap one → sheet drops, Home updates. No lock, no ceremony, no CTA.
- Bottom: two quiet dashed tiles — **+ type it** / **🎙 speak it** — the escape hatch for a brand-new task, never the default. Type opens its field only after the tap (no blank compose box ever leads); speak transcribes and drops the sheet.
- Feeling tagging moved to The Net (2f), where routing happens.

## 2c — Focus / Deep Work (The Quiet Room)

Centered single column: eyebrow **DEEP WORK** · quiet label "The most important thing." · task title hero ("Send the investor update") · settle bar · Quiet Room card · actions.

- **Not timeboxed** (unlike Knockout): the bar fills over the first two minutes — sub-line "Take the first two minutes to get settled." — then dissolves into a calm ambient running state. No cap, no countdown, nothing to outlast. The fill-and-dissolve is one of the two sanctioned delight spikes.
- **Quiet Room card** — 4 stacked presence avatars, "4 founders working right now. No cameras, no mics — presence is the whole point.", ink-outline **Sit with them**. Never a gate; the session runs the same without it.
- Actions: sturdy green **Mark it done** (one saturated element) · gray **Come back later →**.

## 2d — Knockout Round (mid-round)

The one deliberate mode shift: same warm-neutral family inverted to a dark dense room (`#211D12`) — "step into the ring." No new hue, so nothing reads as alarm.

- Centered eyebrow **KNOCKOUT ROUND** · quiet label **"The bell's rung. You're in it."**
- **Timer as hero** — 4 blocks of 5 minutes, light-on-dark: one spent (flat), the active one mid-drain with a halo, breath-pulsing once per minute. No digits.
- One-card checklist beneath: first item done (✓ + strikethrough, "Reply to the accountant *(easy start)*"), active item bold with a heavy ring ("Call the pharmacy"), rest quiet. Checking items off IS the interaction.
- **No CTA mid-round.** Zero saturated elements while the clock drains. Only exit: gray **Done for now →**.
- **Win state (timer ends):** "20 minutes done. That's the win — full stop." Never a cleared/total count; leftovers roll to the Net silently.

## 2e — Lift-off (ignition for The One Thing)

Back in the MVP, rebuilt as the ignition surface — the launchpad for the day's main thing.

- Full-bleed sunset sky (The One Thing's material, pink→yellow settling into cream + grain). Eyebrow **LIFT-OFF** · "Starting is the hard part, not the work."
- Framing line "This is the one that moves everything:" over the One Thing title, large and centered.
- **Countdown without digits** — three dots fill one by one once the helper accepts (~1s apart); on the third the screen tips into Deep Work (2c). This is the ignition delight spike.
- Human card: "Maya's got you. She'll sit with you while you begin. Not checking on you — just there." Trust line verbatim: "Real people in the founder pool. Never a bot, never AI. Usually under two minutes."
- Dark pill **[ Get a lift-off ]** (locked CTA) · quiet "Not now →".
- Framing line and dots behavior flagged for copy/motion sign-off.

## 2f — The Net

- Eyebrow THE NET · headline **"Caught so your head doesn't have to hold them."** · sub "Tap one to open it. Hold one to let it go."
- Items are loose pills drifting inside a dashed boundary — undated, unnumbered; a two-year-old item looks identical to today's. Nothing in here can be late.
- **Tap** → item settles open with the two feeling chips (**Pulls me** / **Dreading it**; untagged = Neutral). Tagging alone routes it — no "Move into motion" action.
- **Hold** → item lifts + "Keep holding to let it go…" → fades out. Release cancels. No delete word, no confirm, no undo toast.
- Sturdy green **+ Catch a thought** at the foot (the screen's one saturated element).

## 2g — The Stack (Week)

- Eyebrow THE STACK + **Day / Week / Month / Year** segmented tabs (Week active). Headline **"The week, stacking up."** — no counts.
- Sediment strata accumulate bottom-up in the three feeling colors; legend beneath (The One Thing / Pulls me / Dreading it — "landed anyway" is the quiet brag). Layers never come down.
- **Reward moment** (sanctioned delight #2): a new layer drops from above, one soft settle (~500ms), no persistent highlight.
- Deliberately absent: targets, rings, streaks, comparisons.

## 2h — Notifications (the only one)

- Lock-screen mock (dark), single notification: **"Set your day — Three taps and today has a shape. Under three minutes."**
- With Lift-off cut, this is the app's complete notification surface. No badges.

## 3a — The Stack (Year)

- Same screen, Year tab active. Headline **"The year, stacking up."** — count removed; the pile is the whole story.
- Each landing compresses to a thin book-spine layer with horizontal jitter — a hand-stacked pile of books filling the screen; scrolling up digs into earlier months. Same three-color legend.

## 4a — The Side Quest Room (reward surface)

Mirrors 2c exactly — same calm paper, centered grammar, sturdy CTA. Differentiation is **structural, not tonal**: the two swap cards and the absence of any clock say "this room is play."

- Eyebrow **SIDE QUESTS** · "The good stuff. Pick one and go." · quest title hero, title only (`···` beneath — no tags, no time estimates; play isn't measured).
- **Buffet, not monogamy:** two small swap cards at the bottom (the 3-cap made visible). Tap = instant swap, no confirm, no penalty. Deep Work shows no swap affordance.
- Sturdy green **Mark it done** · gray **Leave side quests →**.
- Delight: entry bloom (~500ms, then stillness) + completion landing. Manage menu via ···/long-press, same as Home.

## 4b — Side Quest completion

- Celebration grammar: reward on top — the cleared quests land on the week's Stack one by one (~350ms apart, fixed sequence, no slot-machine flourish; top block shown mid-landing) — then headline **"You cleared the good stuff."**
- Sturdy green **More side quests** (momentum straight back to the buffet, zero decision load) · gray **Done for now →**. No counts.

## 5a — Settings

Set-once-and-leave; flat, inert. Two sections only (Kit section cut). Deliberately absent: themes, notification toggles, streak/goal config — anything inviting daily fiddling.

- **CONNECTIONS** ("Where your tasks flow in from.") — rollout banner; Slack + Google connected (each with a "What flows in: Everything / Flagged only" toggle; Flagged-only shows a helper line); Asana, Sunsama, AI Notes with green-outline **Connect**. Disconnect is muted gray → inline "Disconnect? Yes / Keep", no modal.
- **ACCOUNT** — "Founder OS — active · software + kit + accountability" + Manage; card •••• 4242 + Update; muted Sign out.
- Accent budget: green as text/outline only on row actions (config surface, off the work path). Letter tiles are placeholders for source logos.

---

## Open items / flagged placeholder copy
- Product name — `[ name ]` wordmark placeholder throughout.
- Side Quest and swap-sheet task titles are invented placeholders.
- Flagged for copy sign-off: 2d headline + "Done for now →", 4a "The good stuff. Pick one and go.", 5a connections copy, Quiet Room card strings.
- 2e Lift-off is back in the MVP as the ignition screen; its notification ("Lift-off — Maya's got you…") is not yet restored to 2h — pending decision.
