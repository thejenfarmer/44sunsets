import { MATERIAL } from '../lib/tokens';
import type { Feel } from '../lib/seed';

// Feeling chip — bordered pill with material dot; selected = ink border.
// Pulls me = blue→yellow (side) dot · Dreading it = band (knockout) dot.
export function FeelChip({ kind, selected, onClick }: { kind: 'pull' | 'dread'; selected: boolean; onClick: () => void }) {
  const label = kind === 'pull' ? 'Pulls me' : 'Dreading it';
  const dot = kind === 'pull' ? MATERIAL.side : MATERIAL.knockout;
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999,
        border: selected ? '1.5px solid #221A12' : '1px solid rgba(34,26,18,.2)',
        background: '#FFFDF6', padding: '6px 12px', fontSize: 12.5,
        fontWeight: selected ? 600 : 500, color: selected ? '#221A12' : 'rgba(34,26,18,.6)',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot }} />
      {label}
    </button>
  );
}

export type { Feel };
