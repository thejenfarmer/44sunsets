import React, { useState } from 'react'
import { Avatar } from '../components.jsx'

// Onboarding (ONBOARDING.md + onboarding-01…05.png): five on-rails screens
// before Home, exactly ONE tappable element per screen, ending by dropping
// into the live Home. Shows on every fresh load; nothing persisted.

const SLAB = 'linear-gradient(150deg,#174D63,#1B3A4A)'

function QuietNext({ onClick }) {
  return (
    <button className="quiet" style={{ font: "600 16px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }} onClick={onClick}>
      Next →
    </button>
  )
}

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(1)
  const next = () => setStep(step + 1)

  // 1 — The promise: ink + grain, serif headline, cream pill.
  if (step === 1) {
    return (
      <div className="screen grain grain--dark" style={{ background: '#221A12', color: '#FAF3E7', padding: '74px 28px 40px' }}>
        <div className="spacer col" style={{ justifyContent: 'center' }}>
          <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 44, lineHeight: 1.18, letterSpacing: '-.01em' }}>
            Some lists can't
            <br />
            be ranked.
            <div
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(105deg,#F4A69B,#F6C95C)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              They can only be
              <br />
              started.
            </div>
          </div>
        </div>
        <button className="pill" style={{ background: '#FAF3E7', color: '#221A12' }} onClick={next}>
          Begin →
        </button>
      </div>
    )
  }

  // 2 — The Net + the sort: two idea blocks, zero saturated elements.
  if (step === 2) {
    return (
      <div className="screen grain" style={{ background: '#FAF3E7', padding: '74px 28px 40px' }}>
        <div className="spacer col" style={{ justifyContent: 'center', gap: 40, alignItems: 'center' }}>
          <div className="col" style={{ gap: 20, alignItems: 'center' }}>
            <div style={{ border: '1.5px dashed rgba(34,26,18,.3)', borderRadius: 32, padding: '24px 26px', display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 330 }}>
              {['the deck', 'the doctor', 'emails', 'that idea'].map((t) => (
                <span key={t} style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 999, padding: '12px 20px', font: "500 15px/1 'Poppins',sans-serif" }}>
                  {t}
                </span>
              ))}
            </div>
            <div style={{ font: "500 19px/1.5 'Poppins',sans-serif", textAlign: 'center', maxWidth: 330 }}>
              Everything you're carrying goes in one place — your Net.
            </div>
          </div>
          <div className="col" style={{ gap: 20, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ width: 58, height: 82, borderRadius: 18, background: 'linear-gradient(150deg,#F8B9A6,#F6C95C)', transform: 'rotate(-2deg)' }} />
              <span style={{ width: 58, height: 82, borderRadius: 18, background: 'linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)', transform: 'rotate(1.5deg)' }} />
              <span style={{ width: 58, height: 82, borderRadius: 18, background: SLAB, transform: 'rotate(-1deg)' }} />
            </div>
            <div style={{ font: "500 19px/1.5 'Poppins',sans-serif", textAlign: 'center', maxWidth: 340 }}>
              How the work feels is how it gets sorted — what you dread, what pulls you — quietly, behind doors.
            </div>
          </div>
        </div>
        <QuietNext onClick={next} />
      </div>
    )
  }

  // 3 — The doors: a blue→yellow door swung open over a sunset card.
  if (step === 3) {
    return (
      <div className="screen grain" style={{ background: '#FAF3E7', padding: '74px 28px 40px' }}>
        <div className="spacer col" style={{ justifyContent: 'center', gap: 36, alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 240, height: 250 }}>
            <span
              style={{
                position: 'absolute',
                left: 74,
                top: 8,
                width: 158,
                height: 218,
                borderRadius: 26,
                background: 'linear-gradient(150deg,#F8B9A6,#F6C95C)',
                transform: 'rotate(3deg)',
                boxShadow: '0 0 60px rgba(246,201,92,.55)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 4,
                top: 0,
                width: 168,
                height: 228,
                borderRadius: 26,
                background: 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)',
                transform: 'rotate(-4deg)',
                transformOrigin: 'left bottom',
                boxShadow: '0 24px 48px -20px rgba(47,127,160,.7)',
              }}
            />
          </div>
          <div className="col" style={{ gap: 12, alignItems: 'center' }}>
            <div style={{ font: "600 20px/1.5 'Poppins',sans-serif", textAlign: 'center', maxWidth: 340 }}>
              A door isn't a task. It's a way to walk into the work — you pick how you start.
            </div>
            <div style={{ font: "400 15px/1.5 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)', textAlign: 'center', maxWidth: 300 }}>
              No wrong door. Whatever you're up for, there's a way in.
            </div>
          </div>
        </div>
        <QuietNext onClick={next} />
      </div>
    )
  }

  // 4 — The deal: the Home layout, shown not entered. All doors inert.
  if (step === 4) {
    const door = (name, bg, tilt, dark = false) => (
      <div key={name} className="door" style={{ minHeight: 92, background: bg, transform: `rotate(${tilt}deg)`, color: dark ? '#FAF3E7' : undefined, boxShadow: '0 14px 26px -14px rgba(34,26,18,.35)' }}>
        <span className="door-name">{name}</span>
        <span className="door-arrow" style={{ background: dark ? 'rgba(250,243,231,.16)' : 'rgba(255,253,246,.55)' }}>→</span>
      </div>
    )
    return (
      <div className="screen grain" style={{ background: 'linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 52%)', padding: '74px 20px 40px', gap: 16, overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', position: 'relative', paddingTop: 4 }}>
          <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>Monday, July 13.</div>
          <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)', marginTop: 6 }}>
            Light morning. Good window for the big one.
          </div>
        </div>
        <div className="spacer col" style={{ justifyContent: 'center', gap: 12, position: 'relative' }}>
          {door('Deep Work', 'linear-gradient(150deg,#F8B9A6,#F6C95C)', -1.2)}
          {door('Knockout Round', 'linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)', 0.9, true)}
          {door('Side Quests', 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)', -0.7)}
          {door('The Impossible Thing', SLAB, 0.8, true)}
          <div className="door" style={{ minHeight: 92, background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', transform: 'rotate(-0.9deg)', boxShadow: '0 14px 26px -16px rgba(34,26,18,.35)' }}>
            <Avatar size={44} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              <span style={{ font: "700 18px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Focus call with Jen</span>
              <span style={{ font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>2:00</span>
            </span>
            <span className="door-arrow" style={{ background: 'rgba(34,26,18,.07)', color: 'rgba(34,26,18,.6)' }}>→</span>
          </div>
        </div>
        <QuietNext onClick={next} />
      </div>
    )
  }

  // 5 — The Stack + exit: the flow's one dark pill.
  return (
    <div className="screen grain" style={{ background: '#FAF3E7', padding: '74px 28px 40px' }}>
      <div className="head">
        <div className="eyebrow" style={{ color: 'rgba(34,26,18,.45)' }}>
          The Stack
        </div>
        <div style={{ font: "700 30px/1.25 'Poppins',sans-serif", letterSpacing: '-.01em', paddingTop: 8, textAlign: 'center' }}>
          What you did, not what's left.
        </div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 172, height: 44, borderRadius: 999, background: 'linear-gradient(105deg,#7CA75F,#2E9B82,#2F7FA0)' }} />
        <span style={{ width: 210, height: 44, borderRadius: 999, background: 'linear-gradient(105deg,#F8B9A6,#F6C95C)' }} />
        <span style={{ width: 290, height: 1, background: 'rgba(34,26,18,.15)' }} />
      </div>
      <div style={{ font: "400 15.5px/1.55 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)', textAlign: 'center', maxWidth: 340, alignSelf: 'center', padding: '26px 0 22px' }}>
        You'll never see the pile of everything left — no list of 421 things waiting to shame you. The only thing on screen is what landed. It grows, and it never comes down.
      </div>
      <button className="pill" onClick={onDone}>
        Step inside →
      </button>
    </div>
  )
}
