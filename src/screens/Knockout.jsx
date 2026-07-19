import React, { useEffect, useState } from 'react'
import { Head, Landing } from '../components.jsx'
import { DEMO } from '../state.js'

// Knockout Round (canvas 11c → 11d → 11e → 11i): entry before the bell →
// mid-round under stage lights (4 draining pill blocks, checklist, zero
// saturated elements) → the win → the round lands on the Stack.

const BLOCKS = 4
const SECONDS_PER_BLOCK = 8 // demo-accelerated stand-in for 5 minutes
const CREAM_EYEBROW = { color: '#8FC7E0' }

function BellIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="9" r="5.5" stroke="#FAF3E7" strokeWidth="1.7" />
      <circle cx="10" cy="9" r="1.4" fill="#FAF3E7" />
      <path d="M10 3.5V2" stroke="#FAF3E7" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 16.5L5.5 18M13.5 16.5L14.5 18" stroke="#FAF3E7" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export default function Knockout({ onWin, goHome, openInvite, stack, landing }) {
  const [phase, setPhase] = useState('pre') // pre | mid | won | landed
  const [elapsed, setElapsed] = useState(0)
  const [checks, setChecks] = useState(DEMO.knockoutItems.map((c) => ({ ...c })))

  const total = BLOCKS * SECONDS_PER_BLOCK

  useEffect(() => {
    if (phase !== 'mid') return
    const t = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= total) {
          clearInterval(t)
          setPhase('won')
          return total
        }
        return e + 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phase, total])

  if (phase === 'pre') {
    return (
      <div className="screen grain grain--band" style={{ background: 'linear-gradient(105deg,#7CA75F 0%,#2E9B82 46%,#2F7FA0 100%)', color: '#FAF3E7', padding: '64px 20px 42px' }}>
        <Head eyebrow="Knockout Round" eyebrowStyle={{ color: 'rgba(250,243,231,.85)' }} />
        <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', gap: 28, textAlign: 'center', padding: '0 6px', position: 'relative' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(250,243,231,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BellIcon />
          </div>
          <div style={{ font: "600 30px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Twenty minutes of effort is the win.</div>
          <button
            style={{ font: "600 17px/1.3 'Poppins',sans-serif", color: '#FAF3E7', padding: '14px 22px', border: '1.5px solid rgba(250,243,231,.5)', borderRadius: 999, minHeight: 44, display: 'flex', alignItems: 'center' }}
            onClick={() => setPhase('mid')}
          >
            Ring the bell →
          </button>
        </div>
        <button className="quiet quiet--cream" onClick={goHome}>
          Not now →
        </button>
      </div>
    )
  }

  if (phase === 'won') {
    return (
      <div className="screen grain grain--dark" style={{ background: '#221A12', color: '#FAF3E7', padding: '64px 20px 42px', gap: 16 }}>
        <Head eyebrow="Knockout Round" eyebrowStyle={CREAM_EYEBROW} headline="20 minutes done." sub={<span style={{ color: 'rgba(250,243,231,.55)' }}>That's the win — full stop.</span>} />
        <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24, width: '100%', padding: '0 12px' }}>
            {Array.from({ length: BLOCKS }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 10, borderRadius: 999, background: 'rgba(250,243,231,.16)' }} />
            ))}
          </div>
        </div>
        <button
          className="quiet quiet--cream"
          style={{ padding: '12px 0' }}
          onClick={() => {
            onWin()
            setPhase('landed')
          }}
        >
          Back home →
        </button>
      </div>
    )
  }

  if (phase === 'landed') {
    return (
      <Landing
        eyebrow="Knockout Round"
        eyebrowStyle={CREAM_EYEBROW}
        bgClass=""
        grain="grain grain--dark"
        dark
        headline="The round's on the Stack."
        stack={stack}
        landing={landing}
        onExit={goHome}
      />
    )
  }

  // Mid-round — roasted-dark room; the timer is the hero, no digits.
  const activeBlock = Math.min(BLOCKS - 1, Math.floor(elapsed / SECONDS_PER_BLOCK))
  const remainInActive = 1 - (elapsed - activeBlock * SECONDS_PER_BLOCK) / SECONDS_PER_BLOCK
  const toggle = (i) => setChecks((cs) => cs.map((c, j) => (j === i ? { ...c, done: !c.done } : c)))

  return (
    <div className="screen grain grain--dark" style={{ background: '#221A12', color: '#FAF3E7', padding: '64px 20px 42px', gap: 16 }}>
      <Head eyebrow="Knockout Round" eyebrowStyle={CREAM_EYEBROW} headline="The bell's rung." sub={<span style={{ color: 'rgba(250,243,231,.55)' }}>You're in it.</span>} />
      <div className="spacer col" style={{ justifyContent: 'center', gap: 26, position: 'relative' }}>
        <div className="ko-blocks">
          {Array.from({ length: BLOCKS }, (_, i) => {
            if (i < activeBlock) return <div key={i} className="ko-block ko-block--spent" />
            if (i === activeBlock) return <div key={i} className="ko-block ko-block--active" style={{ height: Math.max(10, Math.round(72 * remainInActive)) }} />
            return <div key={i} className="ko-block" style={{ height: 72 }} />
          })}
        </div>
        <div style={{ background: 'rgba(250,243,231,.06)', border: '1px solid rgba(250,243,231,.14)', borderRadius: 24, padding: '8px 18px' }} className="col">
          {checks.map((c, i) => (
            <div key={c.text} className="col" style={{ padding: '13px 0', gap: 9, borderBottom: i < checks.length - 1 ? '1px solid rgba(250,243,231,.12)' : 'none' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => toggle(i)}>
                {c.done ? (
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#155A4E,#174D63)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF3E7', font: "600 12px/1 'Poppins',sans-serif" }}>✓</span>
                ) : (
                  <span style={{ width: 24, height: 24, borderRadius: '50%', border: c.hard ? '2px solid #F2B84B' : '1.5px solid rgba(250,243,231,.35)', flex: 'none' }} />
                )}
                <span
                  style={
                    c.done
                      ? { font: "400 14.5px/1.4 'Poppins',sans-serif", color: 'rgba(250,243,231,.45)', textDecoration: 'line-through' }
                      : c.hard
                        ? { font: "600 14.5px/1.4 'Poppins',sans-serif" }
                        : { font: "400 14.5px/1.4 'Poppins',sans-serif", color: 'rgba(250,243,231,.85)' }
                  }
                >
                  {c.text} {c.suffix && <span style={{ fontStyle: 'italic' }}>{c.suffix}</span>}
                </span>
              </button>
              {c.hard && !c.done && (
                <button style={{ font: "400 12.5px/1.45 'Poppins',sans-serif", color: 'rgba(250,243,231,.6)', paddingLeft: 36 }} onClick={() => openInvite()}>
                  This one's hard — want someone sitting with you? →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="quiet quiet--cream" style={{ padding: '12px 0' }} onClick={() => setPhase('won')}>
        Done for now →
      </button>
    </div>
  )
}
