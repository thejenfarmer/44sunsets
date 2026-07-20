# Handoff: Onboarding Demo — comprehension-test build

Add this to the existing ADHD Founder OS demo (44sunsets.vercel.app). It is the entry flow shown BEFORE the Home screen — 5 on-rails screens, one scripted tap each, ending by dropping the user into the existing live Home. Reference mockups: `screenshots/onboarding-01…05.png` (also turn 18 on the design canvas, ids 18a–18d + 18i).

## Rules (inherit everything from README.md / Design System.md, plus)
- Fully on rails: exactly ONE tappable element per screen; everything else inert.
- One dark pill max across the whole flow — it appears ONLY on screen 5 ("Step inside →"). Screens 2–4 use the quiet muted-text "Next →" CTA. Screen 1's pill is cream-on-ink (the inversion of the dark pill for the ink screen).
- No red, no digits/counts on focus surfaces, no clinical language ("dread", "pull" — never "executive function", "ADHD").
- No persistence: refresh restarts at screen 1 with the full demo reset (consistent with the existing in-memory-only rule).
- The Impossible Thing material everywhere: `linear-gradient(150deg,#174D63,#1B3A4A)`, shadow `0 14px 30px -12px rgba(23,77,99,.9)`, cream text `#FAF3E7` — never black.

## Screen 1 — The promise (onboarding-01)
Ink `#221A12` + grain. Serif headline (Instrument Serif, 44px, cream): "Some lists can't be ranked." / italic second line "They can only be started." in gradient text `linear-gradient(105deg,#F4A69B,#F6C95C)` (background-clip:text). CTA: cream pill "Begin →".

## Screen 2 — The Net + the sort (onboarding-02)
Paper + grain. Two idea blocks, each visual + one line:
1. Dashed-border Net container holding loose cream pills ("the deck", "the doctor", "emails", "that idea") → line: "Everything you're carrying goes in one place — your Net."
2. Three small tilted material cards (sunset / knockout band / deep-sea slab) → line: "How the work feels is how it gets sorted — what you dread, what pulls you — quietly, behind doors."
CTA: quiet "Next →". Zero saturated elements.

## Screen 3 — The doors (onboarding-03)
Paper + grain. Visual: a blue→yellow door card (`linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)`) swung open (rotate −4°, origin left-bottom) over a sunset card behind it with warm light spill.
Copy: "A door isn't a task. It's a way to walk into the work — you pick how you start." / muted sub: "No wrong door. Whatever you're up for, there's a way in."
CTA: quiet "Next →".

## Screen 4 — The deal (onboarding-04)
The Home layout, shown not entered. Dawn wash top, date headline "Monday, July 13." + sub "Light morning. Good window for the big one." All FIVE doors, nameless (door names only, no task titles), tilted stack, in order: Deep Work (sunset) / Knockout Round (band) / Side Quests (blue→yellow) / The Impossible Thing (deep-sea slab) / Focus call with Jen (cream card, J avatar, "2:00").
All doors inert. CTA: quiet "Next →".

## Screen 5 — The Stack + exit (onboarding-05)
Paper + grain. Eyebrow THE STACK, headline "What you did, not what's left." Two example strata pills sitting on a baseline (band on top of sunset).
Line: "You'll never see the pile of everything left — no list of 421 things waiting to shame you. The only thing on screen is what landed. It grows, and it never comes down."
CTA: dark pill "Step inside →" → rails come off, route to the existing live Home (all 5 cards, fresh state).

## Routing / logic
- Onboarding shows on every fresh load (it's a demo; no "seen it" flag, nothing persisted).
- Screens advance only via their single scripted CTA; no back navigation, no skip.
- "Step inside →" lands on Home exactly as it exists today; onboarding is not reachable again except by refresh.
