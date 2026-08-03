import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, DarkPill, QuietExit, Eyebrow } from '../components/ui';
import { StackBlocks } from '../components/StackBlocks';
import { DAWN } from '../lib/tokens';
import { useStore } from '../state/store';
import { buzz } from '../lib/haptics';

// 15a — scheduled session with Jen: pre → during (presence glow) → Stack landing.
type Step = 'pre' | 'during' | 'landed';

export function Session() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const [step, setStep] = useState<Step>('pre');
  const [work, setWork] = useState(s.deepWorkFocus);
  const [shown, setShown] = useState(false);

  const dealt = [s.deepWorkFocus, ...s.sideQuests.map((q) => q.title)].slice(0, 3);

  if (step === 'pre') {
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <BackPill label="← Back" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
          <Eyebrow>Focus call</Eyebrow>
          <h1 style={{ margin: '8px 0 2px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 24 }}>What will you work on?</h1>
          <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(34,26,18,.55)' }}>Jen starts at {s.call?.at ?? '2:00'}.</p>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
            {dealt.map((d, i) => (
              <button key={i} onClick={() => setWork(d)} style={{ textAlign: 'left', borderRadius: 14, padding: '14px 16px', fontSize: 15, fontWeight: work === d ? 600 : 500, border: work === d ? '1.5px solid #221A12' : '1px solid rgba(34,26,18,.14)', background: '#FFFDF6' }}>{d}</button>
            ))}
            <input placeholder="Or type it…" onKeyDown={(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (e.key === 'Enter' && v) setWork(v); }} style={{ border: '1px dashed rgba(34,26,18,.25)', borderRadius: 14, padding: '14px 16px', fontSize: 15, background: 'transparent' }} />
          </div>
          <DarkPill onClick={() => setStep('during')}>Sit down with Jen →</DarkPill>
          <QuietExit onClick={() => nav('/home')}>Not today. Go home →</QuietExit>
        </div>
      </Shell>
    );
  }

  if (step === 'landed') {
    return (
      <Shell bg={DAWN}>
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow style={{ textAlign: 'center' }}>Focus call</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
            <div style={{ width: 200 }}><StackBlocks blocks={[...s.stack]} newestId={s.stack[s.stack.length - 1]?.id} /></div>
            <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 26, textAlign: 'center' }}>That landed.</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(34,26,18,.6)' }}>
              <span className="glow" style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#F4A69B,#F6C95C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12 }}>J</span>
              Jen’s still at her desk.
            </div>
          </div>
          <QuietExit onClick={() => nav('/home')}>Back home →</QuietExit>
        </div>
      </Shell>
    );
  }

  // during
  return (
    <Shell bg={DAWN}>
      <Grain />
      <BackPill label="← Leave quietly" onClick={() => nav('/home')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
        <Eyebrow style={{ textAlign: 'center' }}>Focus call</Eyebrow>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <span className="glow" style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#F4A69B,#F6C95C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 24, color: '#221A12' }}>J</span>
            <div style={{ fontSize: 14, color: 'rgba(34,26,18,.7)' }}>Jen’s here</div>
            <div style={{ fontSize: 12.5, color: 'rgba(34,26,18,.5)', fontStyle: 'italic' }}>sketching the onboarding flow</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.015em', lineHeight: 1.25 }}>{work}</div>
          <button onClick={() => setShown(!shown)} style={{ background: 'none', border: 'none', fontSize: 13, color: 'rgba(34,26,18,.55)' }}>{shown ? 'Jen can see your task ✓' : 'Show Jen what you are working on →'}</button>
        </div>
        <DarkPill onClick={() => { landBlock('deep', work); buzz(20); setStep('landed'); }}>Mark it done</DarkPill>
        <QuietExit onClick={() => nav('/home')}>Stop here — leave a note for next time →</QuietExit>
      </div>
    </Shell>
  );
}
