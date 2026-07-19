import React, { useState } from 'react'
import { Avatar, Head, Landing } from '../components.jsx'
import { DEMO } from '../state.js'
import { WriteIn } from './DeepFocus.jsx'

// Scheduled session (canvas 15a): ① the pre-session sit-down hand →
// ② live open desks (Jen's glow + her self-written one-liner) →
// ③ the Stack landing with Jen's presence line.

export default function Session({ onDone, goHome, stack, landing }) {
  const [phase, setPhase] = useState('hand') // hand | live | landed
  const [item, setItem] = useState(null)

  if (phase === 'hand') {
    const pick = (t) => {
      setItem(t)
      setPhase('live')
    }
    return (
      <div className="screen bg-dawn grain">
        <Head eyebrow="Deep Focus Kickoff" headline="What are you sitting down with?">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
            <Avatar size={26} />
            <div style={{ font: "400 13.5px/1.35 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>Jen's sitting down at 2:00</div>
          </div>
        </Head>
        <div className="spacer col" style={{ justifyContent: 'center', gap: 12 }}>
          {DEMO.sessionHand.map((t, i) => (
            <button
              key={t}
              style={{
                background: '#FFFDF6',
                border: '1px solid rgba(34,26,18,.10)',
                borderRadius: 18,
                padding: '17px 18px',
                font: "600 15px/1.35 'Poppins',sans-serif",
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 8px 18px -14px rgba(34,26,18,.35)',
                transform: `rotate(${i % 2 ? 0.4 : -0.5}deg)`,
              }}
              onClick={() => pick(t)}
            >
              {t}
            </button>
          ))}
          <WriteIn placeholder="+ something else on your mind" onSubmit={pick} style={{ textAlign: 'center' }} />
        </div>
        <button className="quiet" style={{ paddingTop: 16 }} onClick={goHome}>
          Skip the rest — done for now →
        </button>
      </div>
    )
  }

  if (phase === 'landed') {
    return (
      <Landing
        eyebrow="Deep Focus Kickoff"
        headline="Things are stacking up."
        stack={stack}
        landing={landing}
        under={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar size={26} />
            <div style={{ font: "400 13.5px/1.35 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>Jen's still at her desk</div>
          </div>
        }
        onExit={goHome}
      />
    )
  }

  // ② Live — open desks: presence, not performance.
  return (
    <div className="screen grain" style={{ background: '#FAF3E7', padding: '74px 28px 44px' }}>
      <div className="col" style={{ alignItems: 'center', gap: 14, paddingTop: 8 }}>
        <div className="eyebrow">Deep Focus Kickoff</div>
        <Avatar size={52} glow />
        <div className="col" style={{ gap: 4, alignItems: 'center' }}>
          <div style={{ font: "500 14px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>Jen's here</div>
          <div style={{ font: "400 13.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', fontStyle: 'italic' }}>
            “{DEMO.jen.oneLiner}”
          </div>
        </div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 26, alignItems: 'center' }}>
        <div style={{ font: "700 29px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em', textAlign: 'center', maxWidth: 300 }}>{item}</div>
        <div style={{ width: 200, height: 8, borderRadius: 999, background: 'rgba(34,26,18,.08)', overflow: 'hidden' }}>
          <div style={{ width: '62%', height: '100%', borderRadius: 999, background: 'var(--grad-settle)' }} />
        </div>
        <button style={{ font: "400 13px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.4)', textAlign: 'center', border: '1px dashed rgba(34,26,18,.2)', borderRadius: 999, padding: '10px 18px' }}>
          Share what you're on →
        </button>
      </div>
      <div className="col" style={{ gap: 12, alignItems: 'center' }}>
        <button
          className="pill"
          onClick={() => {
            onDone(item)
            setPhase('landed')
          }}
        >
          Mark it done
        </button>
        <button className="pill pill--outline" onClick={goHome}>
          Done for now →
        </button>
      </div>
    </div>
  )
}
