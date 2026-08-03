import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, QuietExit } from '../components/ui';
import { InviteSheet } from '../components/InviteSheet';
import { KNOCKOUT_ROOM_BAND, MATERIAL } from '../lib/tokens';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';

// Demo compression: 4 blocks of "5 minutes" drain over ~7s each so a tester can watch.
const BLOCK_MS = 7000;
const BLOCKS = 4;

export function Knockout() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const [phase, setPhase] = useState<'pre' | 'mid' | 'won'>('pre');
  const [items, setItems] = useState(() => s.knockout.items.map((k) => ({ ...k }))); // fresh 20 on entry
  const [spent, setSpent] = useState(0); // whole blocks fully drained
  const [frac, setFrac] = useState(0);   // 0..1 within active block
  const raf = useRef<number>(0);
  const start = useRef<number>(0);
  const [invite, setInvite] = useState(false);
  const landed = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const runTimer = () => {
    start.current = performance.now();
    let lastMinuteBuzz = -1;
    const tick = (now: number) => {
      const elapsed = now - start.current;
      const total = elapsed / BLOCK_MS;
      const whole = Math.min(BLOCKS, Math.floor(total));
      setSpent(whole);
      setFrac(total - whole);
      const minute = Math.floor(total); // breath-pulse cue per block
      if (minute !== lastMinuteBuzz && minute < BLOCKS) { lastMinuteBuzz = minute; }
      if (total >= BLOCKS) { setSpent(BLOCKS); setFrac(0); buzz(20); setPhase('won'); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const landOnce = () => {
    if (landed.current) return;
    landed.current = true;
    // 11i — one block per finished item; a round where nothing got checked still lands the sat-down time.
    const finished = items.filter((i) => i.done).length;
    const n = Math.max(1, finished);
    for (let k = 0; k < n; k++) landBlock('knockout', 'Knockout');
    set((st) => ({ doorsCompletedToday: st.doorsCompletedToday.includes('knockout') ? st.doorsCompletedToday : [...st.doorsCompletedToday, 'knockout'] }));
  };

  const leave = () => { cancelAnimationFrame(raf.current); if (phase !== 'pre') landOnce(); nav('/home'); };
  const toggle = (id: string) => { setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))); buzz(20); };

  // ── entry (11c) ──
  if (phase === 'pre') {
    return (
      <Shell bg={MATERIAL.knockout} dark>
        <Grain variant="dark" />
        <BackPill label="← Home" onClick={() => nav('/home')} dark />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', color: '#FAF3E7' }}>
          <div className="eyebrow" style={{ color: 'rgba(250,243,231,.7)' }}>Knockout Round</div>
          <h1 style={{ margin: '10px 0 0', fontWeight: 700, letterSpacing: '-.015em', fontSize: 30 }}>Twenty minutes of effort is the win.</h1>
        </div>
        <div style={{ position: 'relative', padding: '0 20px calc(20px + env(safe-area-inset-bottom))' }}>
          <button onClick={() => { setPhase('mid'); runTimer(); buzz(20); }} style={{ width: '100%', minHeight: 56, borderRadius: 999, border: '1.5px solid rgba(250,243,231,.6)', background: 'rgba(250,243,231,.12)', color: '#FAF3E7', fontWeight: 600, fontSize: 16.5 }}>Ring the bell →</button>
          <QuietExit dark onClick={() => nav('/home')}>Not now →</QuietExit>
        </div>
      </Shell>
    );
  }

  // ── win (11e) ──
  if (phase === 'won') {
    return (
      <Shell bg="#221A12" dark>
        <Grain variant="dark" />
        <BackPill label="← Leave quietly" onClick={leave} dark />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', color: '#FAF3E7' }}>
          <div className="eyebrow" style={{ color: '#8FC7E0', textAlign: 'center' }}>Knockout Round</div>
          <div style={{ display: 'flex', gap: 8, height: 64, margin: '22px 0 20px' }}>
            {Array.from({ length: BLOCKS }).map((_, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 999, background: KNOCKOUT_ROOM_BAND, opacity: 0.5, alignSelf: 'flex-end', height: 10 }} />
            ))}
          </div>
          <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 28, textAlign: 'center' }}>20 minutes done.</h1>
          <p style={{ margin: '6px 0 20px', textAlign: 'center', color: 'rgba(250,243,231,.7)', fontSize: 14 }}>That’s the win — full stop.</p>
          <div style={{ fontSize: 12.5, color: 'rgba(250,243,231,.55)', marginBottom: 10 }}>Wanna check off anything else before you leave?</div>
          <div style={{ background: 'rgba(250,243,231,.06)', border: '1px solid rgba(250,243,231,.14)', borderRadius: 20, padding: '6px 16px' }}>
            {items.map((it, i) => (
              <Row key={it.id} it={it} last={i === items.length - 1} onToggle={() => toggle(it.id)} active={false} />
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <QuietExit dark onClick={leave}>Done for now →</QuietExit>
        </div>
      </Shell>
    );
  }

  // ── mid-round (11d): roasted-dark room, draining timer, checklist, zero saturated elements ──
  const firstOpen = items.findIndex((i) => !i.done);
  return (
    <Shell bg="#221A12" dark>
      <Grain variant="dark" />
      <BackPill label="← Leave quietly" onClick={leave} dark />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '46px 20px 20px', color: '#FAF3E7', minHeight: 0 }}>
        <div className="eyebrow" style={{ color: '#8FC7E0', textAlign: 'center' }}>Knockout Round</div>
        <div style={{ textAlign: 'center', color: 'rgba(250,243,231,.7)', fontSize: 15, marginTop: 6 }}>The bell’s rung. You’re in it.</div>

        {/* timer as hero: 4 blocks; spent flat, active draining with a glow, remaining tall */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 84, margin: '26px 2px' }}>
          {Array.from({ length: BLOCKS }).map((_, i) => {
            const isSpent = i < spent;
            const isActive = i === spent;
            const h = isSpent ? 10 : isActive ? 72 : 72;
            return (
              <div key={i} style={{ flex: 1, height: h, borderRadius: 999, position: 'relative', overflow: 'hidden', background: isSpent ? 'rgba(250,243,231,.16)' : KNOCKOUT_ROOM_BAND, boxShadow: isActive ? '0 0 26px rgba(46,155,130,.55)' : 'none' }}>
                {isActive && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: `${(1 - frac) * 100}%`, background: 'rgba(34,26,18,.55)' }} />}
              </div>
            );
          })}
        </div>

        <div style={{ background: 'rgba(250,243,231,.06)', border: '1px solid rgba(250,243,231,.14)', borderRadius: 24, padding: '6px 16px' }}>
          {items.map((it, i) => (
            <Row key={it.id} it={it} last={i === items.length - 1} active={i === firstOpen} onToggle={() => toggle(it.id)} onCompany={it.hard ? () => setInvite(true) : undefined} companyOpen={it.hard && i === firstOpen} />
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <QuietExit dark onClick={leave}>Step out early — that’s finishing too →</QuietExit>
      </div>
      {invite && <InviteSheet onDismiss={() => setInvite(false)} onSent={() => setInvite(false)} />}
    </Shell>
  );
}

function Row({ it, last, active, onToggle, onCompany, companyOpen }: { it: { id: string; text: string; easy?: boolean; done: boolean }; last: boolean; active: boolean; onToggle: () => void; onCompany?: () => void; companyOpen?: boolean }) {
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid rgba(250,243,231,.12)', padding: '12px 0' }}>
      <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', background: 'none', border: 'none' }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF3E7', fontSize: 12, background: it.done ? 'linear-gradient(135deg,#2E9B82,#2F7FA0)' : 'transparent', border: it.done ? 'none' : active ? '2px solid #2E9B82' : '1.5px solid rgba(250,243,231,.35)' }}>{it.done ? '✓' : ''}</span>
        <span style={{ fontSize: 14.5, fontWeight: active && !it.done ? 600 : 400, color: it.done ? 'rgba(250,243,231,.45)' : active ? '#FAF3E7' : 'rgba(250,243,231,.85)', textDecoration: it.done ? 'line-through' : 'none' }}>
          {it.text}{it.easy ? <span style={{ fontStyle: 'italic' }}> (easy start)</span> : null}
        </span>
      </button>
      {companyOpen && onCompany && (
        <button onClick={onCompany} style={{ marginLeft: 36, marginTop: 4, background: 'none', border: 'none', color: 'rgba(143,199,224,.9)', fontSize: 12.5 }}>Want someone to sit with you for this? →</button>
      )}
    </div>
  );
}
