// The daily deal — CLAUDE_CODE_BUILD_PROMPT.md §6. Deterministic, seeded by date,
// computed once at first open of the day and never changed mid-day. Because the
// demo hard-codes the date, the deal is effectively fixed from the seed.
import { seedNet, seedDeepWork, seedImpossible, seedKnockout, type NetItem } from './seed';

export interface Deal {
  deepWork: string;                 // largest pull/untagged "big" item
  knockout: typeof seedKnockout;    // up to 4 small dread items
  sideQuests: string[];             // pull items that are not the Deep Work item
  impossible: string;               // the one locked monster (or '' → pick screen)
}

export function computeDeal(net: NetItem[] = seedNet): Deal {
  const pulls = net.filter((n) => n.feel === 'pull').map((n) => n.text);
  const sideQuests = pulls.filter((t) => t !== seedDeepWork).slice(0, 3);
  // Keep three stable side quests for the demo even if the Net is light.
  const filled = [...sideQuests];
  for (const t of ['Rewrite the traction slide', 'Sketch the onboarding flow', 'Riff on the pricing page copy']) {
    if (filled.length >= 3) break;
    if (!filled.includes(t)) filled.push(t);
  }
  return {
    deepWork: seedDeepWork,
    knockout: seedKnockout,
    sideQuests: filled.slice(0, 3),
    impossible: seedImpossible,
  };
}
