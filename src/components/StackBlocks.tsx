import { MATERIAL, type DoorKey } from '../lib/tokens';
import type { Block } from '../lib/seed';

const MAT = (m: DoorKey | 'net') => (m === 'net' ? 'repeating-linear-gradient(135deg,rgba(34,26,18,.12) 0 6px,transparent 6px 12px)' : MATERIAL[m as DoorKey]);

// Widths derived deterministically per block so the pile reads hand-stacked.
function widthFor(i: number, year: boolean) {
  const seq = [64, 88, 72, 94, 80, 60, 90, 76, 84, 96, 70, 82];
  return year ? 56 + ((i * 37) % 40) : seq[i % seq.length];
}

export function StackBlocks({ blocks, view = 'week', newestId, dark = false }: { blocks: Block[]; view?: 'week' | 'year'; newestId?: string; dark?: boolean }) {
  const year = view === 'year';
  const rows = year ? blocks.slice(-42) : blocks.slice(-14);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: year ? 3 : 6, padding: year ? '0 6px' : '0 8px', overflow: 'hidden' }}>
      {rows.map((b, i) => (
        <div
          key={b.id}
          style={{
            height: year ? 8 + (i % 4) : 20, width: widthFor(i, year) + '%', alignSelf: 'center',
            borderRadius: year ? 3 : 999, background: MAT(b.material),
            position: 'relative', left: year ? ((i * 13) % 12) - 6 + '%' : 0,
            animation: b.id === newestId ? 'block-drop .5s cubic-bezier(.2,.8,.3,1.1) both' : 'none',
            boxShadow: b.id === newestId ? '0 8px 18px rgba(34,26,18,.22)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

export function StackLegend({ dark = false }: { dark?: boolean }) {
  const c = dark ? 'rgba(250,243,231,.7)' : 'rgba(34,26,18,.6)';
  const item = (mat: DoorKey, label: string) => (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: MATERIAL[mat] }} />
      {label}
    </span>
  );
  return (
    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', fontSize: 12, color: c, flexWrap: 'wrap' }}>
      {item('deep', 'The One Thing')}
      {item('side', 'Pulls me')}
      {item('knockout', 'Dreading it')}
    </div>
  );
}
