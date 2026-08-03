// Home header pieces (23e): Net icon top-left, call chip + avatar top-right.

// The Net glyph: a dashed rounded square holding the checklist mark
// (three rows: a 4px hollow square + a 2px line) + sunset count badge (§5).
export function NetIcon({ count, dark = false, onClick, onHold }: { count: number; dark?: boolean; onClick: () => void; onHold: () => void }) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const start = () => { timer = setTimeout(() => { onHold(); timer = null; }, 500); };
  const end = () => { if (timer) { clearTimeout(timer); timer = null; onClick(); } };
  const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };
  const stroke = dark ? 'rgba(250,243,231,.8)' : 'rgba(34,26,18,.65)';
  return (
    <button
      aria-label="Open the Net"
      onPointerDown={start} onPointerUp={end} onPointerLeave={cancel}
      style={{ position: 'relative', width: 44, height: 44, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span style={{ width: 34, height: 34, borderRadius: 10, border: `1.5px dashed ${stroke}`, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start', justifyContent: 'center', padding: '0 7px' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 4, height: 4, border: `1px solid ${stroke}`, display: 'block' }} />
            <span style={{ width: 12, height: 2, background: stroke, display: 'block' }} />
          </span>
        ))}
      </span>
      {count > 0 && (
        <span style={{ position: 'absolute', top: 2, right: 2, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'linear-gradient(150deg,#F8B9A6,#F6C95C)', color: '#221A12', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}

// Call chip (23e): a scheduled call WITH a person — a small avatar + who + when,
// so it never reads as a bare clock. States: "Jen · 2:00" / "Jen · in 5 min" / sunset "Join Jen" (live).
export function CallChip({ state, at, who = 'Jen', onClick, dark = false }: { state: 'later' | 'soon' | 'live'; at: string; who?: string; onClick: () => void; dark?: boolean }) {
  const live = state === 'live';
  const label = live ? `Join ${who}` : state === 'soon' ? `${who} · in 5 min` : `${who} · ${at}`;
  return (
    <button
      onClick={onClick}
      aria-label={live ? `Join the focus call with ${who}` : `Focus call with ${who} at ${at}`}
      style={{
        height: 34, padding: '0 12px 0 5px', borderRadius: 999, border: 'none', fontWeight: 600, fontSize: 12.5,
        background: live ? 'linear-gradient(150deg,#F8B9A6,#F6C95C)' : dark ? 'rgba(250,243,231,.14)' : '#FFFDF6',
        color: live ? '#221A12' : dark ? '#FAF3E7' : '#221A12',
        boxShadow: live ? 'none' : '0 1px 3px rgba(34,26,18,.12)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}
    >
      <span style={{ width: 24, height: 24, borderRadius: '50%', flex: 'none', background: 'linear-gradient(135deg,#F4A69B,#F6C95C)', color: '#221A12', fontWeight: 600, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{who[0]}</span>
      {label}
    </button>
  );
}

// Avatar (→ profile), sunset gradient with initial.
export function Avatar({ letter = 'J', onClick, size = 32 }: { letter?: string; onClick?: () => void; size?: number }) {
  return (
    <button
      onClick={onClick}
      aria-label="Your profile"
      style={{ width: size, height: size, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg,#F4A69B,#F6C95C)', color: '#221A12', fontWeight: 600, fontSize: size * 0.4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {letter}
    </button>
  );
}
