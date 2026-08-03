import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, DarkPill, QuietExit, Eyebrow } from '../components/ui';
import { Sheet } from '../components/Sheet';
import { InviteSheet } from '../components/InviteSheet';
import { StackBlocks } from '../components/StackBlocks';
import { DAWN, MATERIAL } from '../lib/tokens';
import { useStore } from '../state/store';

type Step = 'focus' | 'switch' | 'ignition' | 'settling' | 'running' | 'landed';

export function DeepWork() {
  const nav = useNavigate();
  const { s, set, landBlock } = useStore();
  const [step, setStep] = useState<Step>('focus');
  const [focus, setFocus] = useState(s.deepWorkFocus);
  const [invite, setInvite] = useState(false);
  const [threadSheet, setThreadSheet] = useState(false);
  const [write, setWrite] = useState('');

  const alts = ['Investor update — June numbers', 'Pricing page rewrite'];

  const finish = () => {
    landBlock('deep', focus);
    set((st) => ({
      deepWorkFocus: focus,
      thread: null, // thread vanishes when finished (21b)
      doorsCompletedToday: st.doorsCompletedToday.includes('deep') ? st.doorsCompletedToday : [...st.doorsCompletedToday, 'deep'],
    }));
    setStep('landed');
  };

  const back = () => {
    if (step === 'switch') return setStep('focus');
    if (step === 'ignition') return setStep('focus');
    nav('/home');
  };

  // ── landing (④) ──
  if (step === 'landed') {
    return (
      <Shell bg={DAWN}>
        <Grain />
        <BackPill label="← Home" onClick={() => nav('/home')} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow style={{ textAlign: 'center' }}>The One Thing</Eyebrow>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
            <div style={{ width: 200 }}><StackBlocks blocks={[...s.stack]} newestId={s.stack[s.stack.length - 1]?.id} /></div>
            <h1 style={{ margin: 0, fontWeight: 700, letterSpacing: '-.015em', fontSize: 28, textAlign: 'center' }}>Things are stacking up.</h1>
          </div>
          <QuietExit onClick={() => nav('/home')}>Back home →</QuietExit>
        </div>
      </Shell>
    );
  }

  // ── settling (③a) / running (③b): the room ──
  if (step === 'settling' || step === 'running') {
    return (
      <Shell bg={DAWN}>
        <Grain />
        <BackPill label="← Leave quietly" onClick={() => setThreadSheet(true)} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px' }}>
          <Eyebrow style={{ textAlign: 'center' }}>Deep Work</Eyebrow>
          <div style={{ textAlign: 'center', marginTop: 6, fontWeight: 600, fontSize: 16 }}>{step === 'settling' ? 'Settle in.' : 'You’re in.'}</div>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(34,26,18,.5)' }}>Just this, for now.</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
            <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: '-.015em', textAlign: 'center', lineHeight: 1.25 }}>{focus}</div>
            {step === 'settling' && (
              <div style={{ width: '100%' }}>
                <div style={{ height: 14, borderRadius: 999, background: 'rgba(34,26,18,.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,#F4A69B,#F2B84B)', width: '30%', animation: 'settle-fill 120s linear forwards' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: 'rgba(34,26,18,.55)' }}>Take the first two minutes to get settled.</div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <DarkPill onClick={finish}>Mark it done</DarkPill>
            <QuietExit onClick={() => setThreadSheet(true)}>Stop here — leave a note for next time →</QuietExit>
          </div>
        </div>
        {threadSheet && (
          // 21a — the thread: a pre-filled, mid-sentence note + equal-weight Not now →.
          <Sheet onDismiss={() => setThreadSheet(false)}>
            <Eyebrow>Leave a note for next time</Eyebrow>
            <input value={write || '…drop the pricing table into page 2'} onChange={(e) => setWrite(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid rgba(34,26,18,.15)', borderRadius: 12, padding: '13px 14px', fontSize: 15, background: '#FAF3E7', margin: '12px 0 16px', fontStyle: 'italic' }} />
            <DarkPill onClick={() => { set({ thread: { text: write || '…drop the pricing table into page 2', owner: 'deep' } }); nav('/home'); }}>Leave the note →</DarkPill>
            <QuietExit onClick={() => nav('/home')}>Not now →</QuietExit>
          </Sheet>
        )}
      </Shell>
    );
  }

  // ── kickoff steps on paper ──
  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Back" onClick={back} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
        <Eyebrow style={{ textAlign: 'center' }}>Deep Focus Kickoff</Eyebrow>

        {step === 'focus' && (
          <>
            <h1 style={{ margin: '10px 0 4px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 24, textAlign: 'center' }}>What are you sitting down to?</h1>
            <p style={{ margin: 0, textAlign: 'center', fontSize: 13, color: 'rgba(34,26,18,.5)' }}>We picked up where you left off.</p>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
              <div style={{ position: 'relative', borderRadius: 22, padding: '26px 22px', background: MATERIAL.deep, boxShadow: '0 14px 30px -18px rgba(180,110,60,.6)', overflow: 'hidden' }}>
                <Grain />
                <div style={{ position: 'relative' }}>
                  <div className="eyebrow" style={{ color: 'rgba(34,26,18,.55)', marginBottom: 8 }}>Your focus</div>
                  <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: '-.015em', lineHeight: 1.2 }}>{focus}</div>
                  {s.thread && (
                    <button onClick={() => setStep('running')} style={{ marginTop: 14, textAlign: 'left', width: '100%', background: 'rgba(255,253,246,.8)', border: 'none', borderRadius: 12, padding: '10px 12px' }}>
                      <div className="eyebrow" style={{ fontSize: 10, color: 'rgba(34,26,18,.5)' }}>Your note from last time</div>
                      <div style={{ fontStyle: 'italic', fontSize: 13, color: 'rgba(34,26,18,.7)', marginTop: 2 }}>{s.thread.text}</div>
                    </button>
                  )}
                </div>
              </div>
              <button onClick={() => setStep('switch')} style={{ alignSelf: 'center', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.15)', borderRadius: 999, padding: '10px 16px', fontSize: 13.5, fontWeight: 500 }}>
                ⇄ Work on something else
              </button>
            </div>
            <DarkPill onClick={() => setStep('ignition')}>This one →</DarkPill>
          </>
        )}

        {step === 'switch' && (
          <>
            <h1 style={{ margin: '10px 0 4px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 24, textAlign: 'center' }}>Something else, then.</h1>
            <p style={{ margin: 0, textAlign: 'center', fontSize: 13, color: 'rgba(34,26,18,.5)' }}>Only what’s already on your plate.</p>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
              {alts.map((a) => (
                <button key={a} onClick={() => { setFocus(a); setStep('focus'); }} style={{ textAlign: 'left', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.14)', borderRadius: 14, padding: '15px 16px', fontSize: 15, fontWeight: 500 }}>{a}</button>
              ))}
              <input placeholder="Or type it — one line is enough…" onKeyDown={(e) => { const v = (e.target as HTMLInputElement).value.trim(); if (e.key === 'Enter' && v) { setFocus(v); setStep('focus'); } }} style={{ background: 'transparent', border: '1px dashed rgba(34,26,18,.25)', borderRadius: 14, padding: '15px 16px', fontSize: 15 }} />
            </div>
            <QuietExit onClick={() => setStep('focus')}>← back to the narrative</QuietExit>
          </>
        )}

        {step === 'ignition' && (
          <>
            <h1 style={{ margin: '10px 0 4px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 24, textAlign: 'center' }}>How do you want to start?</h1>
            <p style={{ margin: 0, textAlign: 'center', fontSize: 13, color: 'rgba(34,26,18,.5)' }}>{focus} — locked in.</p>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
              <button onClick={() => setInvite(true)} style={{ position: 'relative', textAlign: 'left', border: 'none', borderRadius: 18, padding: '18px 18px', background: MATERIAL.deep, overflow: 'hidden' }}>
                <Grain />
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <div><div style={{ fontWeight: 600, fontSize: 15.5 }}>Sit with someone</div><div style={{ fontSize: 12.5, color: 'rgba(34,26,18,.65)' }}>Invite them now — a person beside you while you work.</div></div>
                  <span style={{ fontSize: 18 }}>→</span>
                </div>
              </button>
              <button onClick={() => setStep('settling')} style={{ textAlign: 'left', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.14)', borderRadius: 18, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div><div style={{ fontWeight: 600, fontSize: 15.5 }}>A settle timer</div><div style={{ fontSize: 12.5, color: 'rgba(34,26,18,.55)' }}>A few quiet minutes to land before the work starts.</div></div>
                <span style={{ fontSize: 18, color: 'rgba(34,26,18,.4)' }}>→</span>
              </button>
            </div>
            <QuietExit onClick={() => setStep('running')}>Just jump in →</QuietExit>
          </>
        )}
      </div>
      {invite && <InviteSheet onDismiss={() => setInvite(false)} onSent={() => { setInvite(false); setStep('settling'); }} />}
    </Shell>
  );
}
