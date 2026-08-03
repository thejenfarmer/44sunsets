// Demo seed data — CLAUDE_CODE_BUILD_PROMPT.md §6. Not real data, no backend.
export type Feel = 'dread' | 'pull' | null;
export type Source = 'email' | 'manual' | 'slack';
export interface NetItem { id: string; text: string; feel: Feel; source: Source; project: string; sorted?: boolean; }
export interface Piece { id: string; text: string; tag: Feel | 'skip'; done: boolean; }
export interface KnockItem { id: string; text: string; easy?: boolean; hard?: boolean; done: boolean; }
export interface Block { id: string; material: import('./tokens').DoorKey | 'net'; label: string; at: number; }

export const HARD_DATE = 'Monday, July 13.'; // never read the device clock

export const seedNet: NetItem[] = [
  { id: 'n1', text: "Book Mom's cardiology follow-up", feel: null, source: 'email', project: 'family' },
  { id: 'n2', text: "Reschedule Dad's hearing-aid fitting", feel: null, source: 'manual', project: 'family' },
  { id: 'n3', text: "Call the insurance about Dad's claim", feel: 'dread', source: 'manual', project: 'family' },
  { id: 'n4', text: 'Camp forms — due Friday', feel: null, source: 'email', project: 'family' },
  { id: 'n5', text: 'Rewrite the traction slide', feel: 'pull', source: 'manual', project: 'the deck' },
  { id: 'n6', text: 'Ask Sam for the churn numbers', feel: 'dread', source: 'slack', project: 'the deck' },
  { id: 'n7', text: 'Sign up for the Tuesday pottery class', feel: 'pull', source: 'manual', project: 'me' },
];

export const seedImpossible = 'Find a home aide for Dad';
export const seedDeepWork = 'Draft the fundraising narrative';
export const seedThread = '…drop the pricing table into page 2'; // attached to Deep Work

export const seedKnockout: KnockItem[] = [
  { id: 'k1', text: 'Reply to the accountant', easy: true, done: true },   // (easy start), pre-checked
  { id: 'k2', text: 'Draft one ugly paragraph of the pitch memo', hard: true, done: false }, // offers company
  { id: 'k3', text: 'Chase the Stripe invoice', done: false },
  { id: 'k4', text: 'Cancel the unused SaaS seat', done: false },
];

export const seedSideQuests = ['Rewrite the traction slide', 'Sketch the onboarding flow', 'Riff on the pricing page copy'];

export const seedCall = { with: 'Jen', at: '2:00' };

// ~6 blocks of prior work in mixed materials.
export const seedStack: Block[] = [
  { id: 'b1', material: 'side', label: 'Prior work', at: 1 },
  { id: 'b2', material: 'knockout', label: 'Prior work', at: 2 },
  { id: 'b3', material: 'deep', label: 'Prior work', at: 3 },
  { id: 'b4', material: 'side', label: 'Prior work', at: 4 },
  { id: 'b5', material: 'net', label: 'A sort', at: 5 },
  { id: 'b6', material: 'deep', label: 'Prior work', at: 6 },
];
