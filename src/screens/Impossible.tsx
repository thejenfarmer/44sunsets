import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, DarkPill, QuietExit, Eyebrow } from '../components/ui';
import { StackBlocks } from '../components/StackBlocks';
import { FeelChip } from '../components/FeelChip';
import { MATERIAL } from '../lib/tokens';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';
import type { Feel } from '../lib/seed';

// 16b — one locked monster at a time. pick → break → tag pieces → smallest piece →
// piece lands → chain (next piece or leave). Pieces never leave the room.
type Step = 'pick' | 'break' | 'tag' | 'piece' | 'landed' | 'chain';

export function Impossible() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const [step, setStep] = useState<Step>(s.impossible.signedOff ? 'piece' : 'pick');

  const pieces = s.impossible.pieces;
  const nextPiece = pieces.find((p) => !p.done);
  const remaining = pieces.filter((p) => !p.done).length;

  const tagPiece = (id: string, tag: Feel | 'skip') =>
    set((st) => ({ impossible: { ...st.impossible, pieces: st.impossible.pieces.map((p) => (p.id === id ? { ...p, tag: p.tag === tag ? null : tag } : p)) } }));

  const completePiece = () => {
    if (!nextPiece) return;
    set((st) => ({ impossible: { ...st.impossible, pieces: st.impossible.pieces.map((p) => (p.id === nextPiece.id ? { ...p, done: true } : p)) } }));
    landBlock('impossible', nextPiece.text);
    buzz(20);
    setStep('landed');
  };

  const material = MATERIAL.impossible;
  const slab = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, background: material, color: '#FAF3E7', padding: '22px 20px', boxShadow: '0 14px 30px -12px rgba(23,77,99,.9)', ...style }}>
      <Grain variant="dark" />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );

  // ── pick (①) ──
  if (step === 'pick') {
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow>The Impossible Thing</Eyebrow>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {slab(
              <>
                <div className="eyebrow" style={{ color: 'rgba(250,243,231,.6)' }}>Sitting heaviest</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.015em', margin: '10px 0 4px', lineHeight: 1.2 }}>{s.impossible.monster}</div>
              </>,
              { width: '100%' },
            )}
          </div>
          <DarkPill onClick={() => setStep('break')}>⚒ Break this one</DarkPill>
        </div>
      </Shell>
    );
  }

  // ── break sign-off (②) ──
  if (step === 'break') {
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Back" onClick={() => setStep('pick')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow>The Impossible Thing</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
            {slab(<div style={{ fontSize: 18, fontWeight: 700 }}>{s.impossible.monster}</div>)}
            <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
              {pieces.map((p) => (
                <div key={p.id} style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 12, padding: '12px 14px', fontSize: 14 }}>{p.text}</div>
              ))}
            </div>
          </div>
          <DarkPill onClick={() => { set((st) => ({ impossible: { ...st.impossible, signedOff: true } })); setStep('tag'); }}>Yes, break it apart</DarkPill>
        </div>
      </Shell>
    );
  }

  // ── tag each piece (③) — tagging never blocks; skip on every card ──
  if (step === 'tag') {
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Back" onClick={() => setStep('break')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
          <Eyebrow>The Impossible Thing</Eyebrow>
          <h1 style={{ margin: '8px 0 14px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 22 }}>How does each piece feel?</h1>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pieces.map((p) => (
              <div key={p.id} style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 16, padding: '14px 16px' }}>
                <div style={{ fontSize: 14.5, marginBottom: 10 }}>{p.text}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <FeelChip kind="pull" selected={p.tag === 'pull'} onClick={() => tagPiece(p.id, 'pull')} />
                  <FeelChip kind="dread" selected={p.tag === 'dread'} onClick={() => tagPiece(p.id, 'dread')} />
                  <button onClick={() => tagPiece(p.id, 'skip')} style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: 12.5, color: 'rgba(34,26,18,.45)' }}>skip →</button>
                </div>
              </div>
            ))}
          </div>
          <DarkPill onClick={() => setStep('piece')}>Start the smallest piece →</DarkPill>
        </div>
      </Shell>
    );
  }

  // ── landing (⑤) ──
  if (step === 'landed') {
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow style={{ textAlign: 'center' }}>The Impossible Thing</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <div style={{ width: 200 }}><StackBlocks blocks={[...s.stack]} newestId={s.stack[s.stack.length - 1]?.id} /></div>
            <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 26, textAlign: 'center' }}>One piece, off the pile.</h1>
          </div>
          <DarkPill onClick={() => setStep('chain')}>{remaining > 0 ? 'Next piece' : 'That’s the last piece'}</DarkPill>
        </div>
      </Shell>
    );
  }

  // ── chain (⑥) ──
  if (step === 'chain') {
    const noneLeft = remaining === 0;
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow>The Impossible Thing</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
            {noneLeft ? (
              <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 26 }}>The whole thing, in pieces. Done.</h1>
            ) : (
              slab(
                <>
                  <div className="eyebrow" style={{ color: 'rgba(250,243,231,.6)' }}>Up next</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{nextPiece?.text}</div>
                </>,
              )
            )}
          </div>
          {noneLeft ? (
            <DarkPill onClick={() => { set((st) => ({ doorsCompletedToday: st.doorsCompletedToday.includes('impossible') ? st.doorsCompletedToday : [...st.doorsCompletedToday, 'impossible'] })); nav('/home'); }}>Back home</DarkPill>
          ) : (
            <DarkPill onClick={() => setStep('piece')}>Yes, let’s start this.</DarkPill>
          )}
          <QuietExit onClick={() => nav('/home')}>Not today →</QuietExit>
        </div>
      </Shell>
    );
  }

  // ── the piece (④): the door ends on the smallest piece ──
  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Leave quietly" onClick={() => nav('/home')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
        <Eyebrow style={{ textAlign: 'center' }}>The Impossible Thing</Eyebrow>
        {/* finished pieces dim in place with their material dot; pieces never leave the room */}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pieces.filter((p) => p.done).map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.5, fontSize: 13.5 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: MATERIAL.impossible }} /> {p.text}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: '-.015em', textAlign: 'center', lineHeight: 1.25 }}>{nextPiece ? nextPiece.text : 'All pieces done.'}</div>
        </div>
        {nextPiece ? <DarkPill onClick={completePiece}>Mark it complete</DarkPill> : <DarkPill onClick={() => setStep('chain')}>Finish →</DarkPill>}
      </div>
    </Shell>
  );
}
