# ADHD Founder OS — Design System ("Sunset Paper")

The final visual system for all MVP + body-doubling screens (`ADHD Founder OS.dc.html`). Current as of July 11, 2026. Companion to `MVP Documentation.md` (screen-by-screen spec).

---

## 1. Principles (non-negotiable, from the brief)

1. **Minimize decisions and activation energy; never punish a lapse.** Every screen passes both tests or doesn't ship.
2. **Frozen structure, novel content.** Chrome and control positions never change; novelty lives in content only.
3. **Calm base, deliberate spikes.** Low stimulation everywhere except the sanctioned delight moments.
4. **One object per screen. One primary action per screen** — enforced literally as a single saturated element (some mid-session and guest surfaces have zero).
5. **No red, ever.** No streaks, rings, points, targets, overdue states, backlog counts, or numeric countdowns on focus surfaces. Color never encodes status, urgency, or lateness — "late" doesn't exist.
6. **No blank fields as a first action.** Everything arrives pre-filled; write-in is always the escape hatch, never the default.

---

## 2. Color

### Base
| Token | Value | Use |
|---|---|---|
| Paper | `#FAF3E7` | Screen background |
| Grain | fractal-noise SVG overlay, opacity .05 | On every paper surface (static texture, never animated) |
| Card | `#FFFDF6` + `1px solid rgba(34,26,18,.10–.12)` | Quiet cards, list items |
| Ink | `#221A12` | Text, dark CTA pill, dark tab pill |
| Muted ink | `rgba(34,26,18,.45–.6)` | Eyebrows, secondary text, quiet links |
| Dashed inset | `1px dashed rgba(34,26,18,.25)` | The Net (teaser + full screen) — the holding-place material |

### The three brand materials (gradients)
| Material | Value | Meaning |
|---|---|---|
| **Sunset** | `linear-gradient(160deg, #F8B9A6 → #F6C95C)` | The One Thing. Hero card on Home, Lift-off full sky, Stack layers for One-Thing wins, presence avatars |
| **Knockout band** | `linear-gradient(105deg, #7CA75F → #2E9B82 → #2F7FA0)` + grain | Knockout mode only. Home row tease → 2d full immersion (deepened to `#3D5C33→#155A4E→#174D63`). Stack layers for knocked-out Dread wins. Dread chip dot |
| **Blue→yellow** | `linear-gradient(105deg, #2F7FA0 → #F6C95C)` | Side Quests / Pulls me. Stack layers, quest-title stroke in the Side Quest Room, Pulls-me chip dot |

**Rule: one material, one meaning.** A gradient never appears outside its meaning. The Stack re-tells where each win happened by wearing the material of the surface it came from.

### Accents
- Active time in the day-shape bar: soft peach `#F0B49C` (kin to the sunset hero, deliberately not eye-catching).
- Yellow `#F2B84B`: active timer part in the Knockout ring; settle-bar fill end.
- Warm tints: dawn wash `#FBE3CE→paper` (top of Deep Work / reward surfaces); Quiet-warmth card tint `rgba(248,185,166,.32)→rgba(246,201,92,.22)` (lamplight, e.g. old Quiet Room card).
- Pink is decorative warmth only — never status, never on a Dread surface.

### CTA
- **The dark pill**: bg `#221A12`, text `#FAF3E7`, `border-radius:999px`, `min-height:56px`, weight 600, shadow `0 10px 22px -10px rgba(34,26,18,.6)`. The one saturated element per screen.
- Equal-weight quiet alternative (when declining must cost nothing, e.g. guest conversion): same-size pill, `1.5px solid rgba(34,26,18,.25)`, muted text.
- Quiet exits: plain muted text, `"… →"` form ("Come back later →", "Done for now →", "Not now →", "Maybe later →", "Leave side quests →").

---

## 3. Type

- **One family: Poppins** (400/500/600/700). No serif in the final system.
- Headlines: 600–700, letter-spacing −.01em, 26–33px (phone).
- Eyebrows: 600 11px, letter-spacing .14em, UPPERCASE, muted ink. Colored eyebrows are reserved for mode rooms only (e.g. Knockout's on-dark).
- Quiet sub-labels under eyebrows: 400–500 16–17px, muted.
- Body 13–14.5px, line-height ≥1.4. No dense paragraphs on action surfaces.

---

## 4. Shape & layout grammar

- Everything rounds: pills (999px) for CTAs, bars, day segments, tabs, strata; 14–24px radii for cards (24px for feature/hero cards).
- **Centered session grammar** (Deep Work, Knockout, Side Quest Room, Lift-off, guest screens): centered eyebrow + quiet label on top → hero cluster (title/timer) at optical center → actions anchored at the foot.
- **Home grammar**: wordmark + avatar → date headline → day-shape bar → THE ONE THING → SIDE QUESTS → Knockout row → THE NET teaser.
- Sheets (swap, ritual, invite composer): light `#FFFDF6` bottom sheet with grab handle over dimmed (rgba ink .18) Home/session; sheet drops on action, no confirmation screens.
- Flex/grid + gap everywhere; 44px minimum hit targets.

---

## 5. Time (the one metaphor)

**Time is a shape. Never digits on a focus surface.**
- Home: the 24-hour day as a row of pill segments — spent lie flat/muted, the active one is soft peach, remaining are outlined cream. No now-marker line.
- Knockout: 4 large pill blocks = 5 minutes each; spent goes flat, active drains with a glow (breath-pulse once per minute), remaining stand tall.
- Deep Work / guest: the settle bar — fills over the first two minutes (sunset gradient fill `#F4A69B→#F2B84B`), then dissolves into an ambient running state. Deep Work is NOT timeboxed: no cap, no countdown.
- Deadlines render as shapes, not dates, wherever possible.

---

## 6. Motion budget (exactly three, nothing else moves)

1. **Time** — settle bar filling/dissolving; Knockout block draining (one breath-pulse per minute).
2. **Reward** — a block landing on the Stack: drops from above, one soft settle (~500ms), no persistent highlight. Side Quest completion lands the batch ~350ms apart, fixed sequence (no slot-machine flourish). Lift-off ignition: three dots fill (~1s apart), then tips into the session.
3. **Presence** — the glow (body-doubling only, the product's only ambient motion): a soft halo breathing slowly at low amplitude around a companion's avatar while their session runs. Hard spec: peripheral-vision-invisible; if you notice it while reading the task title, it's too loud. Never pulsing.

Grain is static. Nothing loops visibly, nothing else animates ambiently.

---

## 7. Component inventory

- **Day-shape bar** — pill segments of the 24h day (Home, ritual sheet backdrop).
- **Hero feature card** — sunset gradient, 24px radius, dark pill CTA inside, ⇄ swap button (32–34px circle) beside the title.
- **Quiet list card** — `#FFFDF6` card, title only (no tags/durations exposed to users), `···` manage affordance (long-press/···: *Complete* → Stack; *No longer needed* → Net, silent).
- **Knockout row** — the band material + grain, cream text, bell icon in a ring, "Ring the bell →". Appears only when small-dread items exist.
- **Net item** — loose pill inside a dashed boundary; tap opens feeling chips (Pulls me = ink dot · Dreading it = band dot; untagged = Neutral; tagging alone routes). Hold = lift + "Keep holding to let it go…" → fade; release cancels. No delete word, no confirm, no undo toast.
- **Stack strata** — pill layers in the three materials, accumulate bottom-up, never come down. Week = chunky layers; Year = thin book-spines with horizontal jitter. Day/Week/Month/Year tabs (dark pill active). No counts anywhere.
- **Segmented tabs** — cream pill container, dark pill active segment.
- **Presence avatar** — photo or initial tile (sunset gradient) in a glow ring: `0 0 0 5px rgba(246,201,92,.3), 0 0 22px rgba(244,166,155,.5)`. Initials must read identically to photos. Dimmed variant for near-dark rooms.
- **Feeling chips** — bordered pills with material dots; selected = ink border.
- **Destination tiles** — quiet cream tiles in a row (Slack/Teams/Contacts/SMS), one tap sends.
- **QR pairing card** — QR on a `#FFFDF6` card over paper; the scan is the action, zero saturated elements.

---

## 8. Modes & rooms

- **Default rooms**: paper + grain, calm.
- **Knockout** is the ONE mode shift: roasted-dark room (`#221A12` family) + grain, band-material timer, yellow active light. "Under stage lights, not warning lights." Mid-round: zero saturated elements; checking items off is the interaction.
- **Reward/ignition surfaces** (Side Quest Room, Lift-off, guest post-session, Deep Work top): warm dawn washes of the sunset material. Energy from material, never urgency.
- **Near-dark synced session** (in-person body-doubling): `#1C1710`, barely-visible ink-on-dark text, dimmed glow — the phone becomes a desk object.

---

## 9. Voice

Neutral-to-warm coach; never disappointed, never cute. Locked vocabulary used verbatim: The One Thing, Side Quests, Knockout Round, Lift-off, The Net, The Quiet Room, Set your day, Re-plan, The Stack, Pulls me / Dreading it. Users never see routing logic (no "Pulls me" labels inside the Side Quest Room; no counts, no time estimates on quests). Stopping early is finishing — every exit is a quiet "… →" with no residue.
