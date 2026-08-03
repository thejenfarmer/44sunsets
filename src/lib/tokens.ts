// Design tokens — CLAUDE_CODE_BUILD_PROMPT.md §3 + Design System.md.
// The four door materials: ONE MATERIAL, ONE MEANING. Never reuse outside its door.
export type DoorKey = 'deep' | 'knockout' | 'side' | 'impossible';

export const MATERIAL: Record<DoorKey, string> = {
  deep: 'linear-gradient(150deg,#F8B9A6,#F6C95C)',
  knockout: 'linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)',
  side: 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)',
  impossible: 'linear-gradient(150deg,#174D63,#1B3A4A)',
};

// Deepened Knockout for the in-room (roasted) timer pills.
export const KNOCKOUT_ROOM_BAND = 'linear-gradient(150deg,#3D5C33,#155A4E 52%,#174D63)';

// Text color that rides on each material.
export const MATERIAL_TEXT: Record<DoorKey, string> = {
  deep: '#221A12',
  knockout: '#FAF3E7',
  side: '#221A12',
  impossible: '#FAF3E7',
};

export const DOOR_NAME: Record<DoorKey, string> = {
  deep: 'Deep Work',
  knockout: 'Knockout Round',
  side: 'Side Quests',
  impossible: 'The Impossible Thing',
};

export const INK = '#221A12';
export const PAPER = '#FAF3E7';
export const CARD = '#FFFDF6';
export const DAWN = 'linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 46%)';
export const inkMuted = (a = 0.55) => `rgba(34,26,18,${a})`;

// Sky washes for Home outfit (turn 14): day / golden hour / night.
export const SKY = {
  day: 'linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 42%)',
  golden: 'linear-gradient(180deg,#F6B98F 0%,#F6C95C 30%,#5E9FBE 100%)',
  night: 'linear-gradient(180deg,#0E2A3A 0%,#123043 45%,#0A1E2B 100%)',
} as const;
export type SkyMode = keyof typeof SKY;

// Home's background follows the real time of day (the DATE stays hard-coded per §6,
// but the sky is live): day → golden hour → night.
export function skyByClock(d: Date = new Date()): SkyMode {
  const h = d.getHours();
  if (h >= 20 || h < 6) return 'night';
  if (h >= 17) return 'golden';
  return 'day';
}
