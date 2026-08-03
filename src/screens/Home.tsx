import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { Door } from '../components/Door';
import { NetIcon, CallChip, Avatar } from '../components/home-parts';
import { Sheet } from '../components/Sheet';
import { FeelChip } from '../components/FeelChip';
import { DarkPill, QuietExit } from '../components/ui';
import { SKY, type DoorKey } from '../lib/tokens';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';
import type { Feel } from '../lib/seed';

const DOORS: DoorKey[] = ['deep', 'knockout', 'side', 'impossible'];
const TILT: Record<DoorKey, number> = { deep: -0.8, knockout: 0.7, side: -1.0, impossible: 0.9 };

export function Home() {
  const nav = useNavigate();
  const { s, set, netUnsorted, landBlock } = useStore();
  const [capture, setCapture] = useState(false);
  const [draft, setDraft] = useState('');
  const [feel, setFeel] = useState<Feel>(null);
  const night = s.skyMode === 'night';

  const routeFor: Record<DoorKey, string> = { deep: '/deep-work', knockout: '/knockout', side: '/side-quests', impossible: '/impossible' };

  // Completed doors come forward (front of the tilted stack) (§5 Home).
  const ordered = [...DOORS].sort((a, b) => {
    const da = s.doorsCompletedToday.includes(a) ? 0 : 1;
    const db = s.doorsCompletedToday.includes(b) ? 0 : 1;
    return da - db;
  });
  const allDone = DOORS.every((d) => s.doorsCompletedToday.includes(d));

  const saveCapture = () => {
    if (!draft.trim()) { setCapture(false); return; }
    set((st) => ({ net: [...st.net, { id: 'n' + Date.now(), text: draft.trim(), feel, source: 'manual', project: 'me', sorted: false }] }));
    buzz(20); // a landed capture (§4.7)
    setDraft(''); setFeel(null); setCapture(false);
  };

  const callState: 'later' | 'soon' | 'live' = 'later';

  return (
    <Shell bg={SKY[s.skyMode]} dark={night}>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Grain variant={night ? 'dark' : 'light'} />

        {/* header (23e) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 14px 0' }}>
          <NetIcon count={netUnsorted} dark={night} onClick={() => nav('/net')} onHold={() => { buzz(20); setCapture(true); }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {s.call && <CallChip state={callState} at={s.call.at} dark={night} onClick={() => nav('/session')} />}
            <Avatar onClick={() => nav('/profile')} />
          </div>
        </div>

        {/* date + one line */}
        <div style={{ position: 'relative', padding: '10px 22px 16px' }}>
          <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 27, lineHeight: 1.15 }}>{s.date}</h1>
          <p style={{ margin: '6px 0 0', fontSize: 13.5, color: night ? 'rgba(250,243,231,.7)' : 'rgba(34,26,18,.55)' }}>
            {allDone ? 'That’s the day, wearing well.' : 'Pick a door. The rest is inside.'}
          </p>
        </div>

        {/* doors */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 20px 10px', overflowY: 'auto' }}>
          {ordered.map((d) => (
            <Door
              key={d}
              door={d}
              tilt={TILT[d]}
              night={night}
              done={s.doorsCompletedToday.includes(d)}
              thread={d === 'deep' && s.thread ? s.thread.text : undefined}
              onClick={() => nav(routeFor[d])}
            />
          ))}
        </div>

        {/* quiet Net line at the foot */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '4px 20px 10px' }}>
          <button onClick={() => nav('/net')} style={{ background: 'none', border: 'none', fontSize: 12.5, color: night ? 'rgba(250,243,231,.55)' : 'rgba(34,26,18,.45)' }}>
            {netUnsorted > 0 ? 'The Net’s holding a few things →' : 'Your Net is clear →'}
          </button>
        </div>

        {capture && (
          <Sheet onDismiss={() => { setDraft(''); setFeel(null); setCapture(false); }}>
            <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-.01em', marginBottom: 12 }}>Write it down.</div>
            <input
              autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
              placeholder="What’s on your mind?"
              onKeyDown={(e) => { if (e.key === 'Enter') saveCapture(); }}
              style={{ width: '100%', boxSizing: 'border-box', border: '1px solid rgba(34,26,18,.15)', borderRadius: 12, padding: '13px 14px', fontSize: 15, background: '#FAF3E7', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 8, margin: '14px 0 18px' }}>
              <FeelChip kind="dread" selected={feel === 'dread'} onClick={() => setFeel(feel === 'dread' ? null : 'dread')} />
              <FeelChip kind="pull" selected={feel === 'pull'} onClick={() => setFeel(feel === 'pull' ? null : 'pull')} />
            </div>
            <DarkPill onClick={saveCapture}>Save to the Net</DarkPill>
            <QuietExit onClick={() => { setDraft(''); setFeel(null); setCapture(false); }}>Not now →</QuietExit>
          </Sheet>
        )}
      </div>
    </Shell>
  );
}
