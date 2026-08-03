import { MATERIAL, MATERIAL_TEXT, DOOR_NAME, type DoorKey } from '../lib/tokens';
import { Grain } from './Grain';

// A Home door — a tilted material card, big name + arrow. Tilt is static (§5 Home).
// `variant`: 'full' large stacked card (day/golden band look) or 'compact' rounded card (night).
export function Door({
  door, tilt = 0, onClick, compact = false, done = false, thread, subtitle, night = false,
}: {
  door: DoorKey; tilt?: number; onClick?: () => void; compact?: boolean; done?: boolean;
  thread?: string; subtitle?: ReactNodeStr; night?: boolean;
}) {
  const text = MATERIAL_TEXT[door];
  const name = DOOR_NAME[door];
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={done ? onClick : onClick}
        aria-label={done ? `${name} — done for today` : `Open ${name}`}
        style={{
          position: 'relative', width: '100%', textAlign: 'left', border: 'none',
          background: MATERIAL[door], color: text, overflow: 'hidden',
          borderRadius: compact ? 18 : 20, padding: compact ? '18px 20px' : '22px 22px',
          minHeight: compact ? 66 : 92, transform: `rotate(${tilt}deg)`,
          opacity: done ? 0.32 : 1,
          boxShadow: night
            ? '0 10px 26px -14px rgba(0,0,0,.5)'
            : door === 'impossible'
            ? '0 14px 30px -12px rgba(23,77,99,.9)'
            : '0 12px 26px -16px rgba(120,80,40,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}
      >
        <Grain variant={door === 'impossible' || door === 'knockout' ? 'dark' : 'light'} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontWeight: 700, fontSize: compact ? 18 : 22, letterSpacing: '-.01em' }}>{name}</span>
          {subtitle && <span style={{ fontSize: 12.5, opacity: 0.8 }}>{subtitle}</span>}
        </div>
        <span style={{ position: 'relative', fontSize: 20, opacity: done ? 0.9 : 0.85 }}>{done ? '✓' : '→'}</span>
      </button>
      {thread && (
        // A live thread: paper slip tucked under the door's bottom edge, mid-sentence, italic, never dated (21b).
        <div style={{ margin: '-8px 14px 0', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: '0 0 14px 14px', padding: '10px 14px 8px', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(34,26,18,.6)' }}>
          {thread}
        </div>
      )}
    </div>
  );
}

type ReactNodeStr = string | null | undefined;
