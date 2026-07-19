// Demo state helpers — all local, no backend. Jen's presence is mocked with timers.

const KEY = 'adhd-founder-os-v3'

export function loadPersisted() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function persist(partial) {
  // Storage can be unavailable (private mode, embedded webviews) — the demo
  // must keep working without it.
  try {
    const current = loadPersisted()
    localStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }))
  } catch {
    /* non-persistent session */
  }
}

// Deterministic outfit, seeded by date — dealt at first open, never mid-day.
function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// The wardrobe (canvas t14): day deals 14d (tilted doors), 14f (marquee) or
// 14h (ribbons); night deals 14l (moonlit stack), 14m (night ribbons) or
// 14o (starfield). Golden hour is 14n. A Settings preference pins one outfit.
const DAY_OUTFITS = ['tilted', 'marquee', 'ribbons']
const NIGHT_OUTFITS = ['moonlit', 'nightribbons', 'starfield']

export function outfitForToday(pinned) {
  if (pinned) return { day: 'tilted', night: 'moonlit' }
  const h = hashString(todayKey())
  return { day: DAY_OUTFITS[h % 3], night: NIGHT_OUTFITS[(h >> 3) % 3] }
}

// morning / golden / night by clock. `?sky=` and `?outfit=` override for
// demos (e.g. ?sky=night&outfit=starfield).
export function skyModeNow() {
  const forced = new URLSearchParams(location.search).get('sky')
  if (forced === 'morning' || forced === 'golden' || forced === 'night') return forced
  const h = new Date().getHours()
  if (h >= 6 && h < 17) return 'morning'
  if (h >= 17 && h < 20) return 'golden'
  return 'night'
}

// The day-shape bar (Design System §5): the waking day as pill segments —
// spent lie flat and muted, the active one is soft peach, remaining stand
// tall in outlined cream. No now-marker, no digits.
export function daySegments() {
  const now = new Date().getHours()
  const START = 6
  const END = 22
  return Array.from({ length: END - START }, (_, i) => {
    const hour = START + i
    return hour < now ? 'spent' : hour === now ? 'active' : 'ahead'
  })
}

export function callOverride() {
  return new URLSearchParams(location.search).get('call') // 'none' forces the slab, 'on' forces Jen's card
}

// The 2:00 call is on the books until the session is done (or ?call=none).
// The Impossible Thing is always dealt — Home holds up to five cards.
export function scheduledCallDefault() {
  return { time: '2:00' }
}

export function outfitOverride() {
  const o = new URLSearchParams(location.search).get('outfit')
  if (['tilted', 'marquee', 'ribbons'].includes(o)) return { day: o }
  if (['moonlit', 'nightribbons', 'starfield'].includes(o)) return { night: o }
  return null
}

export function dateHeadline() {
  const d = new Date()
  return `${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.`
}

export function weekday() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

// Seeded micro stars for the night skies (deterministic, per canvas 14o).
export function starsForToday(count = 46) {
  let h = hashString(todayKey() + 'stars')
  const next = () => {
    h = Math.imul(h ^ (h >>> 13), 1597334677) >>> 0
    return (h >>> 8) / 16777216
  }
  return Array.from({ length: count }, () => ({
    left: `${(next() * 100).toFixed(1)}%`,
    top: `${(next() * 100).toFixed(1)}%`,
    size: `${(1.5 + next() * 2.5).toFixed(1)}px`,
    opacity: (0.25 + next() * 0.5).toFixed(2),
  }))
}

// ——— Demo content (canvas copy; pre-filled, write-in is the escape hatch) ———

export const DEMO = {
  focusItem: 'Draft the fundraising narrative',
  focusAlternates: ['Investor update — June numbers', 'Pricing page rewrite'],

  impossibleThing: 'Sort out the company health insurance',
  impossibleAlternates: ['Respond to the tax audit letter', 'Finish the Acantha site'],
  // Largest first, smallest last — the break descends; the chain climbs back up.
  pieces: [
    'Compare the three plan options',
    "Ask Sam for last year's plan docs",
    'Find the in-network doctor list',
    'Log into the insurance site',
  ],

  knockoutItems: [
    { text: 'Reply to the accountant', suffix: '(easy start)', done: true },
    { text: 'Draft one ugly paragraph of the pitch memo', hard: true, done: false },
    { text: 'Chase the Stripe invoice', done: false },
    { text: 'Cancel the unused SaaS seat', done: false },
  ],

  sideQuests: ['Sketch the onboarding flow', 'Riff on the pricing page copy', 'Storyboard the launch teaser'],

  sessionHand: ['Draft the fundraising narrative', 'Untangle the hiring plan'],

  netItems: [
    'Chase the Stripe invoice',
    "Buy Sam's birthday gift",
    'Look at the new office space',
    'Idea: async standup memo',
    'Renew passports',
    'Intro Priya to the fintech GP',
  ],

  jen: { name: 'Jen', oneLiner: 'sketching the onboarding flow' },
}

// Stack blocks: material + a stylized width so the pile reads like the canvas.
const WIDTHS = [88, 72, 84, 78, 62, 80, 70, 86]

export function seedStack() {
  // A week of strata for the Stack room; the LAST four match the canvas
  // landing pile, bottom-up: sunset 88 · band 72 · sunset 84 · blue→yellow 78.
  return [
    { id: 'seed-a', material: 'sunset', width: 74 },
    { id: 'seed-b', material: 'bluegold', width: 82 },
    { id: 'seed-c', material: 'band', width: 68 },
    { id: 'seed-d', material: 'sunset', width: 86 },
    { id: 'seed-e', material: 'bluegold', width: 76 },
    { id: 'seed-f', material: 'sunset', width: 90 },
    { id: 'seed-g', material: 'band', width: 70 },
    { id: 'seed-h', material: 'sunset', width: 80 },
    { id: 'seed-1', material: 'sunset', width: 88 },
    { id: 'seed-2', material: 'band', width: 72 },
    { id: 'seed-3', material: 'sunset', width: 84 },
    { id: 'seed-4', material: 'bluegold', width: 78 },
  ]
}

export function stackBlock(material, index) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    material,
    width: index === 4 ? 62 : WIDTHS[index % WIDTHS.length],
    day: todayKey(), // lets the Stack's Day zoom show only today's landings
  }
}
