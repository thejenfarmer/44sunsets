import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill } from '../components/ui';
import { useStore } from '../state/store';

// 23b — Profile. Three destinations + one number ("Day 41." — days since you started).
// Hidden reset: long-press the avatar 2s → clears localStorage → onboarding (§6).
export function Profile() {
  const nav = useNavigate();
  const { reset, netUnsorted } = useStore();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = () => { timer.current = setTimeout(() => { reset(); nav('/onboarding'); }, 2000); };
  const cancel = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };

  const dest = (title: string, sub: string, to: string) => (
    <button onClick={() => nav(to)} style={{ width: '100%', textAlign: 'left', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: 16, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div><div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div><div style={{ fontSize: 12.5, color: 'rgba(34,26,18,.5)' }}>{sub}</div></div>
      <span style={{ color: 'rgba(34,26,18,.35)', fontSize: 18 }}>→</span>
    </button>
  );

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Home" onClick={() => nav('/home')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, margin: '10px 0 26px' }}>
          <button
            onPointerDown={start} onPointerUp={cancel} onPointerLeave={cancel}
            aria-label="Your profile"
            style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg,#F4A69B,#F6C95C)', color: '#221A12', fontWeight: 600, fontSize: 26 }}
          >J</button>
          <div style={{ fontSize: 14, color: 'rgba(34,26,18,.6)' }}>Day 41.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {dest('Your Stack', 'What you did, not what’s left.', '/profile/stack')}
          {dest('Your Net', `${netUnsorted} still to sort`, '/net')}
          {dest('Settings', 'Connections, reminders, the people you sit with.', '/profile/settings')}
        </div>
      </div>
    </Shell>
  );
}
