import type { ReactNode } from 'react';

// Bottom sheet over a dimmed backdrop, grab handle. Drops on action, no confirm (§ layout grammar).
export function Sheet({ children, onDismiss }: { children: ReactNode; onDismiss: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
      <div onClick={onDismiss} style={{ position: 'absolute', inset: 0, background: 'rgba(34,26,18,.18)' }} />
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, background: '#FFFDF6',
          borderRadius: '22px 22px 0 0', boxShadow: '0 -6px 30px rgba(34,26,18,.18)',
          padding: '14px 20px calc(28px + env(safe-area-inset-bottom))',
          animation: 'block-drop .28s ease both',
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(34,26,18,.18)', margin: '0 auto 14px' }} />
        {children}
      </div>
    </div>
  );
}
