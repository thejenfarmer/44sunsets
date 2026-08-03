import type { ReactNode } from 'react';

// ── The dark pill — the one saturated element on a screen (§3) ──
export function DarkPill({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 56, width: '100%', borderRadius: 999, border: 'none',
        background: '#221A12', color: '#FAF3E7', fontWeight: 600, fontSize: 16.5,
        boxShadow: '0 10px 22px -10px rgba(34,26,18,.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
      }}
    >
      {children}
    </button>
  );
}

// Equal-weight quiet alternative pill (declining must cost nothing) (§3).
export function GhostPill({ children, onClick, dark = false }: { children: ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 56, width: '100%', borderRadius: 999,
        background: 'transparent', border: `1.5px solid ${dark ? 'rgba(250,243,231,.35)' : 'rgba(34,26,18,.25)'}`,
        color: dark ? 'rgba(250,243,231,.85)' : 'rgba(34,26,18,.6)', fontWeight: 500, fontSize: 15.5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

// Quiet exit — plain muted text, "… →" form. A DIFFERENT action from the top-left home/back (§4.4).
export function QuietExit({ children, onClick, dark = false }: { children: ReactNode; onClick?: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', width: '100%', padding: '12px 0',
        color: dark ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.5)', fontWeight: 400, fontSize: 13.5, textAlign: 'center',
      }}
    >
      {children}
    </button>
  );
}

// The single exit, top-left ghost slot — same position on every room (§4.4, 19a).
export function BackPill({ label, onClick, dark = false }: { label: string; onClick: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label.replace(/^←\s*/, '')}
      style={{
        position: 'absolute', top: 8, left: 12, zIndex: 6,
        background: 'none', border: 'none', padding: '10px 12px 10px 4px',
        color: dark ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.5)', fontWeight: 500, fontSize: 13.5,
      }}
    >
      {label}
    </button>
  );
}

export function Eyebrow({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontWeight: 600, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(34,26,18,.5)', ...style }}>{children}</div>;
}

export function Headline({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 28, lineHeight: 1.15, ...style }}>{children}</h1>;
}
