import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, DarkPill, QuietExit, Eyebrow } from '../components/ui';
import { StackBlocks } from '../components/StackBlocks';
import { MATERIAL } from '../lib/tokens';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';

// 11h — one screen: selection rings (not arrows), pick in place → work → Mark it done.
// 11g — completion: blocks land on the Stack, no counts.
export function SideQuests() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const [sel, setSel] = useState(s.sideQuests.findIndex((q) => !q.done) === -1 ? 0 : s.sideQuests.findIndex((q) => !q.done));
  const [done, setDone] = useState(false);

  const open = s.sideQuests.filter((q) => !q.done);

  const markDone = () => {
    const title = s.sideQuests[sel]?.title;
    set((st) => ({ sideQuests: st.sideQuests.map((q, i) => (i === sel ? { ...q, done: true } : q)) }));
    landBlock('side', title || 'Side quest');
    buzz(20);
    setDone(true);
  };

  if (done) {
    const remaining = s.sideQuests.filter((q) => !q.done).length;
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Home" onClick={() => { markSideDoor(set); nav('/home'); }} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow style={{ textAlign: 'center' }}>Side Quests</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            <div style={{ width: 210 }}><StackBlocks blocks={[...s.stack]} newestId={s.stack[s.stack.length - 1]?.id} /></div>
            <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 30, textAlign: 'center', lineHeight: 1.2 }}>You cleared the good stuff.</h1>
          </div>
          {remaining > 0
            ? <DarkPill onClick={() => { setSel(s.sideQuests.findIndex((q) => !q.done)); setDone(false); }}>More side quests</DarkPill>
            : <DarkPill onClick={() => { markSideDoor(set); nav('/profile/stack'); }}>See the Stack</DarkPill>}
          <QuietExit onClick={() => { markSideDoor(set); nav('/home'); }}>Done for now →</QuietExit>
        </div>
      </Shell>
    );
  }

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Home" onClick={() => nav('/home')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
        <Eyebrow style={{ textAlign: 'center' }}>Side Quests</Eyebrow>
        <p style={{ margin: '6px 0 0', textAlign: 'center', fontSize: 16, color: 'rgba(34,26,18,.55)' }}>The good stuff. Pick one and go.</p>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          {s.sideQuests.map((q, i) =>
            q.done ? null : (
              <button key={i} onClick={() => setSel(i)} style={{ position: 'relative', overflow: 'hidden', textAlign: 'left', borderRadius: 18, padding: '18px 18px', border: sel === i ? 'none' : '1px solid rgba(34,26,18,.14)', background: sel === i ? MATERIAL.side : '#FFFDF6', display: 'flex', alignItems: 'center', gap: 12 }}>
                {sel === i && <Grain />}
                <span style={{ position: 'relative', width: 22, height: 22, borderRadius: '50%', flex: 'none', border: sel === i ? '2px solid rgba(34,26,18,.55)' : '1.5px solid rgba(34,26,18,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {sel === i && <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#221A12' }} />}
                </span>
                <span style={{ position: 'relative', fontSize: 16, fontWeight: sel === i ? 600 : 500 }}>{q.title}</span>
              </button>
            ),
          )}
        </div>
        <DarkPill onClick={markDone}>Mark it done</DarkPill>
        <QuietExit onClick={() => nav('/home')}>Leave side quests →</QuietExit>
      </div>
    </Shell>
  );
}

function markSideDoor(set: (p: any) => void) {
  set((st: any) => ({ doorsCompletedToday: st.sideQuests.every((q: any) => q.done) && !st.doorsCompletedToday.includes('side') ? [...st.doorsCompletedToday, 'side'] : st.doorsCompletedToday }));
}
