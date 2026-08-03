import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, DarkPill, Eyebrow } from '../components/ui';
import { FeelChip } from '../components/FeelChip';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';
import type { Feel } from '../lib/seed';

// The Net (2f + 20f browse): a holding place, not a list. Undated, unnumbered.
// Tap opens feel chips; hold lifts + "let it go" → fade. No delete word, no confirm.
const OFFSETS = ['flex-start', 'flex-end', 'center', 'flex-start', 'flex-end', 'center', 'flex-start'] as const;

export function Net() {
  const nav = useNavigate();
  const { s, set, netUnsorted } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const [holding, setHolding] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setTag = (id: string, tag: Feel) =>
    set((st) => ({ net: st.net.map((n) => (n.id === id ? { ...n, feel: n.feel === tag ? null : tag, sorted: true } : n)) }));

  const startHold = (id: string) => { timer.current = setTimeout(() => { setHolding(id); }, 350); };
  const endHold = (id: string) => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    if (holding === id) {
      // Keep holding to let it go → remove, no confirm, no undo toast.
      set((st) => ({ net: st.net.filter((n) => n.id !== id) }));
      buzz(20); setHolding(null);
    }
  };

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Home" onClick={() => nav('/home')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '48px 20px 0' }}>
        <Eyebrow>The Net</Eyebrow>
        <h1 style={{ margin: '8px 0 4px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 24, lineHeight: 1.2 }}>
          Caught so your head doesn’t have to hold them.
        </h1>
        <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'rgba(34,26,18,.55)' }}>Tap one to open it. Hold one to let it go.</p>

        <div style={{ flex: 1, overflowY: 'auto', border: '1.5px dashed rgba(34,26,18,.28)', borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
          {s.net.length === 0 && <div style={{ margin: 'auto', color: 'rgba(34,26,18,.4)', fontSize: 13.5 }}>Nothing caught. Your head can rest.</div>}
          {s.net.map((n, i) =>
            open === n.id ? (
              <div key={n.id} onClick={() => setOpen(null)} style={{ alignSelf: OFFSETS[i % 7], maxWidth: '88%', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.14)', borderRadius: 16, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                <span style={{ fontSize: 14 }}>{n.text}</span>
                <div style={{ display: 'flex', gap: 8 }} onClick={(e) => e.stopPropagation()}>
                  <FeelChip kind="dread" selected={n.feel === 'dread'} onClick={() => setTag(n.id, 'dread')} />
                  <FeelChip kind="pull" selected={n.feel === 'pull'} onClick={() => setTag(n.id, 'pull')} />
                </div>
              </div>
            ) : (
              <button
                key={n.id}
                onClick={() => setOpen(n.id)}
                onPointerDown={() => startHold(n.id)} onPointerUp={() => endHold(n.id)} onPointerLeave={() => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } }}
                style={{
                  alignSelf: OFFSETS[i % 7], maxWidth: '84%', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)',
                  borderRadius: 999, padding: '11px 16px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8,
                  transform: holding === n.id ? 'translateY(-4px) scale(1.02)' : 'none',
                  boxShadow: holding === n.id ? '0 12px 22px -10px rgba(34,26,18,.4)' : 'none',
                  opacity: holding === n.id ? 0.6 : 1, transition: 'transform .12s, box-shadow .12s',
                }}
              >
                {n.text}
                {n.feel && <span style={{ width: 6, height: 6, borderRadius: '50%', background: n.feel === 'pull' ? 'linear-gradient(150deg,#2F7FA0,#F6C95C)' : 'linear-gradient(150deg,#7CA75F,#2E9B82,#2F7FA0)' }} />}
              </button>
            ),
          )}
          {holding && <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(34,26,18,.45)' }}>Keep holding to let it go…</div>}
        </div>

        <div style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}>
          <DarkPill onClick={() => nav('/home')}>+ Catch a thought</DarkPill>
        </div>
      </div>
    </Shell>
  );
}
