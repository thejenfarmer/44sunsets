import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, Eyebrow } from '../components/ui';
import { StackBlocks } from '../components/StackBlocks';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';

// The Sort (20c): a deck. Left = dreading it · right = pulls me · up = Impossible-worthy · down = toss.
// Size/timing is proposed on the card, never swiped (20c). Deck cleared → a dashed block lands (20e).
type Dir = 'left' | 'right' | 'up' | 'down';

export function Sort() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const unsorted = s.net.filter((n) => !n.sorted);
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState<Dir | null>(null);

  if (done || unsorted.length === 0) {
    // 20e — deck cleared: sorting counts as work; a dashed block lands on the Stack.
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow>The Sort</Eyebrow>
          <StackBlocks blocks={[...s.stack]} newestId={s.stack[s.stack.length - 1]?.id} />
          <h1 style={{ margin: '18px 0 0', fontWeight: 700, letterSpacing: '-.015em', fontSize: 26, textAlign: 'center' }}>Sorted. That counted.</h1>
          <div style={{ flex: 1 }} />
          <button onClick={() => nav('/net')} style={{ background: 'none', border: 'none', padding: '14px 0', color: 'rgba(34,26,18,.5)', fontSize: 13.5 }}>Back to the Net →</button>
        </div>
      </Shell>
    );
  }

  const card = unsorted[i];
  const advance = (dir: Dir) => {
    setLeaving(dir);
    buzz(20);
    set((st) => ({
      net: st.net.map((n) => {
        if (n.id !== card.id) return n;
        if (dir === 'down') return { ...n, sorted: true }; // toss (kept simple: marked handled)
        if (dir === 'up') return { ...n, sorted: true, feel: n.feel }; // Impossible-worthy
        return { ...n, sorted: true, feel: dir === 'left' ? 'dread' : 'pull' };
      }),
    }));
    setTimeout(() => {
      setLeaving(null);
      if (i + 1 >= unsorted.length) { landBlock('net', 'A sort'); setDone(true); } else setI(i + 1);
    }, 180);
  };

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Back" onClick={() => nav('/net')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
        <Eyebrow style={{ textAlign: 'center' }}>The Sort</Eyebrow>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 320, background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 24, padding: '30px 24px', boxShadow: '0 18px 40px -20px rgba(34,26,18,.4)', textAlign: 'center', transition: 'transform .18s, opacity .18s', transform: leaving ? `translate(${leaving === 'left' ? -60 : leaving === 'right' ? 60 : 0}px, ${leaving === 'up' ? -60 : leaving === 'down' ? 60 : 0}px) rotate(${leaving === 'left' ? -6 : leaving === 'right' ? 6 : 0}deg)` : 'none', opacity: leaving ? 0 : 1 }}>
            <div style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.35 }}>{card.text}</div>
            <div style={{ marginTop: 14, fontSize: 12.5, color: 'rgba(34,26,18,.45)' }}>Short task · this week · tap to change</div>
          </div>
        </div>
        {/* direction controls (swipe stand-in) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
          <button onClick={() => advance('left')} style={dirBtn}>← Dreading it</button>
          <button onClick={() => advance('right')} style={dirBtn}>Pulls me →</button>
          <button onClick={() => advance('up')} style={dirBtn}>↑ Impossible-worthy</button>
          <button onClick={() => advance('down')} style={{ ...dirBtn, color: 'rgba(34,26,18,.45)' }}>↓ Toss</button>
        </div>
      </div>
    </Shell>
  );
}

const dirBtn: React.CSSProperties = { border: '1px solid rgba(34,26,18,.15)', background: '#FFFDF6', borderRadius: 14, padding: '13px 10px', fontSize: 13.5, fontWeight: 500, color: '#221A12' };
