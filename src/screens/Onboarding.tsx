import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { DarkPill } from '../components/ui';
import { MATERIAL, DOOR_NAME, type DoorKey } from '../lib/tokens';
import { useStore } from '../state/store';

// SPEC GAP: per-door one-liners aren't given verbatim in the brief; written literal & idiom-free (§4.9).
const DOOR_LINE: Record<DoorKey, string> = {
  deep: 'For the one big thing. You settle in and stay a while.',
  knockout: 'Twenty minutes on small things you have been avoiding.',
  side: 'Lighter work you actually want to do.',
  impossible: 'Too big to start. You break it into pieces.',
};

export function Onboarding() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  const { set } = useStore();

  if (step === 0) {
    // 18f — the promise. Sunset horizon rising from the bottom (no sun drawn).
    return (
      <Shell bg="#FAF3E7">
        <Grain />
        <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '46%', background: 'linear-gradient(0deg,#F8B9A6 0%,rgba(246,201,92,.35) 45%,rgba(250,243,231,0) 100%)' }} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
          <p style={{ margin: 0, fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 44, lineHeight: 1.2, color: '#221A12' }}>
            Some lists can’t be prioritized.
            <br />
            <span style={{ fontStyle: 'italic', color: 'rgba(34,26,18,.78)' }}>They can only be started.</span>
          </p>
        </div>
        <div style={{ position: 'relative', padding: '0 20px calc(20px + env(safe-area-inset-bottom))' }}>
          <DarkPill onClick={() => setStep(1)}>Begin →</DarkPill>
        </div>
      </Shell>
    );
  }

  // 18c — the four doors.
  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 0', overflowY: 'auto' }}>
        <h1 style={{ margin: '8px 0 8px', fontWeight: 700, letterSpacing: '-.015em', fontSize: 28, lineHeight: 1.15 }}>Every morning you get four doors.</h1>
        <p style={{ margin: '0 0 20px', fontSize: 14, lineHeight: 1.5, color: 'rgba(34,26,18,.6)' }}>
          A door is a way to start working. The app puts today’s tasks behind them for you based on how you feel about the work.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(Object.keys(DOOR_LINE) as DoorKey[]).map((d) => (
            <div key={d} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 46, height: 56, borderRadius: 12, background: MATERIAL[d], flex: 'none', boxShadow: '0 6px 14px -8px rgba(34,26,18,.4)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15.5 }}>{DOOR_NAME[d]}</div>
                <div style={{ fontSize: 13, lineHeight: 1.4, color: 'rgba(34,26,18,.6)' }}>{DOOR_LINE[d]}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '22px 0 0', fontSize: 14, lineHeight: 1.5, color: 'rgba(34,26,18,.6)' }}>
          You can open any door. You can leave any room at any time.
        </p>
      </div>
      <div style={{ position: 'relative', padding: '16px 20px calc(20px + env(safe-area-inset-bottom))' }}>
        <DarkPill onClick={() => { set({ onboardingSeen: true }); nav('/home'); }}>Start</DarkPill>
      </div>
    </Shell>
  );
}
