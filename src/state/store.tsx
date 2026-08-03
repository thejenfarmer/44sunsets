import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  seedNet, seedStack, seedCall, HARD_DATE,
  type NetItem, type Feel, type KnockItem, type Block, type Piece,
} from '../lib/seed';
import { computeDeal } from '../lib/deal';
import type { DoorKey, SkyMode } from '../lib/tokens';

export interface Thread { text: string; owner: 'deep' }
export interface State {
  onboardingSeen: boolean;
  date: string;
  skyMode: SkyMode;
  pinnedLayout: boolean;
  net: NetItem[];
  deepWorkFocus: string;
  thread: Thread | null;
  knockout: { items: KnockItem[]; phase: 'pre' | 'mid' | 'won' };
  sideQuests: { title: string; done: boolean }[];
  selectedQuest: number;
  impossible: { monster: string; signedOff: boolean; pieces: Piece[] };
  call: { with: string; at: string } | null;
  stack: Block[];
  doorsCompletedToday: DoorKey[];
  connections: Record<string, 'Everything' | 'Flagged only' | false>;
}

function fresh(): State {
  const deal = computeDeal(seedNet);
  const pieces: Piece[] = [
    { id: 'p1', text: 'List three agencies to call', tag: null, done: false },
    { id: 'p2', text: 'Write down what "good" looks like', tag: null, done: false },
    { id: 'p3', text: 'Ask two friends who they used', tag: null, done: false },
  ];
  return {
    onboardingSeen: false,
    date: HARD_DATE,
    skyMode: 'day',
    pinnedLayout: false,
    net: seedNet.map((n) => ({ ...n, sorted: false })),
    deepWorkFocus: deal.deepWork,
    // No pre-seeded thread: the "note from last time" only appears once the user
    // has actually left one via Deep Work's "Stop here — leave a note" exit.
    thread: null,
    knockout: { items: deal.knockout.map((k) => ({ ...k })), phase: 'pre' },
    sideQuests: deal.sideQuests.map((t) => ({ title: t, done: false })),
    selectedQuest: 0,
    impossible: { monster: deal.impossible, signedOff: false, pieces },
    call: seedCall,
    stack: [...seedStack],
    doorsCompletedToday: [],
    connections: { Slack: 'Everything', Google: 'Flagged only', Asana: false, Sunsama: false, 'AI Notes': false },
  };
}


interface Ctx {
  s: State;
  set: (patch: Partial<State> | ((s: State) => Partial<State>)) => void;
  reset: () => void;
  netUnsorted: number;
  landBlock: (material: DoorKey | 'net', label: string) => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  // In-memory only — nothing is persisted, so a browser refresh starts the demo
  // over from onboarding (per the demo reset rule). State survives in-app
  // navigation; only a reload resets it.
  const [s, setS] = useState<State>(fresh);

  const set: Ctx['set'] = (patch) =>
    setS((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));

  const reset = () => setS(fresh());

  const landBlock: Ctx['landBlock'] = (material, label) =>
    setS((prev) => ({ ...prev, stack: [...prev.stack, { id: 'b' + Date.now() + Math.round(performance.now()), material, label, at: prev.stack.length + 1 }] }));

  const netUnsorted = s.net.filter((n) => !n.sorted).length;

  const value = useMemo<Ctx>(() => ({ s, set, reset, netUnsorted, landBlock }), [s, netUnsorted]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error('useStore must be used within StoreProvider');
  return c;
}

export type { NetItem, Feel, KnockItem, Block, Piece };
