// Demo state helpers — all local, no backend. Jen's presence is mocked with timers.

const KEY = 'adhd-founder-os-v1'

export function loadPersisted() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function persist(partial) {
  const current = loadPersisted()
  localStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }))
}

// Deterministic outfit, seeded by date — never changes mid-day.
function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

// Each outfit: door order + per-door tilt. Three doors always:
// deep (The One Thing), knockout (Knockout Round), quests (Side Quests).
const OUTFITS = [
  { order: ['deep', 'knockout', 'quests'], tilts: [-2, 1.5, -1] },
  { order: ['deep', 'quests', 'knockout'], tilts: [1.5, -2, 1] },
  { order: ['knockout', 'deep', 'quests'], tilts: [-1, 2, -1.5] },
  { order: ['quests', 'deep', 'knockout'], tilts: [2, -1.5, 1] },
]

export function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function outfitForToday(pinnedLayout) {
  if (pinnedLayout != null) return OUTFITS[pinnedLayout % OUTFITS.length]
  return OUTFITS[hashString(todayKey()) % OUTFITS.length]
}

export const PINNED_OUTFIT_INDEX = 0

// morning / golden / night by clock
export function skyModeNow() {
  const h = new Date().getHours()
  if (h >= 6 && h < 17) return 'morning'
  if (h >= 17 && h < 20) return 'golden'
  return 'night'
}

export function dateHeadline() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

// Fraction of the waking day elapsed, for the day-shape bar marker (no digits shown).
export function dayFraction() {
  const d = new Date()
  const mins = d.getHours() * 60 + d.getMinutes()
  const start = 6 * 60
  const end = 23 * 60
  return Math.min(1, Math.max(0, (mins - start) / (end - start)))
}

// ——— Demo content (pre-filled; every write-in is an escape hatch, never a blank field) ———

export const DEMO = {
  focusItem: 'Write the investor update',
  focusAlternates: ['Draft the pricing page', 'Reply to the Stripe email'],

  impossibleThing: 'Untangle the billing migration',
  impossibleAlternates: ['Rebuild the onboarding flow', 'File the Delaware franchise tax'],
  pieces: [
    'List every table the migration touches',
    'Export a snapshot of the current billing data',
    'Write the mapping for plans and prices',
    'Migrate one test customer end to end',
    'Schedule the cutover window',
  ],

  knockoutChecklist: [
    'Reply to the accountant',
    'Cancel the unused SaaS seat',
    'Approve the new logo files',
    'Book the flight for the offsite',
  ],

  sideQuests: [
    'Update the team on the roadmap change',
    'Clear the App Store review queue',
    'Send Sam the intro they asked for',
  ],

  netItems: [
    { text: 'Ask the designer about the empty-state art', when: 'last night' },
    { text: 'That podcast idea about founder burnout', when: 'yesterday' },
    { text: 'Look into the new EU invoicing rules', when: 'yesterday' },
  ],

  jen: {
    name: 'Jen',
    oneLiner: "Rewriting the onboarding email until it doesn't sound like a robot.",
  },
}

export function stackBlock(label, material) {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, label, material, when: 'just now' }
}
