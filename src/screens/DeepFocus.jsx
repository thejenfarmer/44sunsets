import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Head, Landing } from '../components.jsx'
import { DEMO } from '../state.js'

// Deep Focus Kickoff (canvas 17b): ① focus pre-selected → ①b switch (two
// alternates + write-in) → ② ignition → ③ the Deep Work room (settle bar via
// timer / identical room via jump-in) → ④ the Stack landing.

const SETTLE_SECONDS = 20 // demo-accelerated stand-in for the two minutes

export function WriteIn({ placeholder, onSubmit, style }) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) onSubmit(value.trim())
      }}
      style={style}
    >
      <input className="writein" value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} />
    </form>
  )
}

export default function DeepFocus({ focusItem, setFocusItem, presence, openInvite, onDone, goHome, stack, landing }) {
  const [step, setStep] = useState('focus') // focus | switch | ignition | room | landed
  const [entered, setEntered] = useState(false)
  const [usedTimer, setUsedTimer] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (step === 'room' && usedTimer && !entered) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          const next = p + 1 / SETTLE_SECONDS
          if (next >= 1) {
            clearInterval(timerRef.current)
            setEntered(true)
            return 1
          }
          return next
        })
      }, 1000)
      return () => clearInterval(timerRef.current)
    }
  }, [step, usedTimer, entered])

  const enterRoom = (withTimer) => {
    setUsedTimer(withTimer)
    setEntered(!withTimer)
    setProgress(withTimer ? 0.04 : 0)
    setStep('room')
  }

  if (step === 'focus') {
    return (
      <div className="screen bg-dawn grain">
        <Head eyebrow="Deep Focus Kickoff" headline="What are you sitting down to?" sub="We picked up where you left off." />
        <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div className="hero-card hero-card--sunset">
            <div className="hero-eyebrow">YOUR FOCUS</div>
            <div className="hero-title">{focusItem}</div>
          </div>
          <button className="switch-pill" onClick={() => setStep('switch')}>
            ⇄&nbsp; Work on something else
          </button>
        </div>
        <button className="pill" onClick={() => setStep('ignition')}>
          This one →
        </button>
      </div>
    )
  }

  if (step === 'switch') {
    const pick = (item) => {
      setFocusItem(item)
      setStep('focus')
    }
    return (
      <div className="screen bg-dawn grain">
        <Head eyebrow="Deep Focus Kickoff" headline="Something else, then." sub="Only what's already on your plate." />
        <div className="spacer col" style={{ justifyContent: 'center', gap: 12 }}>
          {DEMO.focusAlternates.map((alt) => (
            <button key={alt} className="option-card" onClick={() => pick(alt)}>
              {alt}
            </button>
          ))}
          <WriteIn placeholder="Or type it — one line is enough…" onSubmit={pick} />
        </div>
        <button className="quiet" style={{ fontSize: 14 }} onClick={() => setStep('focus')}>
          ← back to it
        </button>
      </div>
    )
  }

  if (step === 'ignition') {
    return (
      <div className="screen bg-dawn grain">
        <Head eyebrow="Deep Focus Kickoff" headline="How do you want to start?" sub={`${focusItem} — locked in.`} />
        <div className="spacer col" style={{ justifyContent: 'center', gap: 13 }}>
          <button
            style={{ background: 'var(--grad-sunset)', borderRadius: 24, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 18px 38px -18px rgba(244,166,155,.9)' }}
            onClick={() => openInvite(() => enterRoom(false))}
          >
            <span className="col" style={{ gap: 4, flex: 1 }}>
              <span style={{ font: "700 18px/1.25 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Sit with someone</span>
              <span style={{ font: "400 12.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)' }}>
                Invite them now — a person beside you while you work.
              </span>
            </span>
            <span style={{ flex: 'none', font: "700 17px/1 'Poppins',sans-serif" }}>→</span>
          </button>
          <button
            style={{ background: '#FFFDF6', border: '1.5px solid rgba(34,26,18,.14)', borderRadius: 24, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 14 }}
            onClick={() => enterRoom(true)}
          >
            <span className="col" style={{ gap: 4, flex: 1 }}>
              <span style={{ font: "700 18px/1.25 'Poppins',sans-serif", letterSpacing: '-.01em' }}>A settle timer</span>
              <span style={{ font: "400 12.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>
                A few quiet minutes to land before the work starts.
              </span>
            </span>
            <span style={{ flex: 'none', font: "700 17px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>→</span>
          </button>
        </div>
        <button className="quiet" style={{ fontSize: 14 }} onClick={() => enterRoom(false)}>
          Just jump in →
        </button>
      </div>
    )
  }

  if (step === 'landed') {
    return (
      <Landing
        eyebrow="The One Thing"
        headline="Things are stacking up."
        stack={stack}
        landing={landing}
        onExit={goHome}
      />
    )
  }

  // ③ The Deep Work room — one room, two entrances; only the header copy differs.
  return (
    <div className="screen bg-dawn-deep grain" style={{ padding: '64px 20px 42px' }}>
      <Head
        eyebrow="Deep Work"
        headline={entered ? "You're in." : 'Settle in.'}
        sub="Just this, for now."
        eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }}
      />
      {presence.live && (
        <div className="col" style={{ alignItems: 'center', gap: 8, paddingTop: 18 }}>
          <Avatar size={52} glow />
          <div style={{ font: "500 14px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>Jen's here</div>
          <div style={{ font: "400 13.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', fontStyle: 'italic' }}>
            “{presence.label}”
          </div>
        </div>
      )}
      {presence.invited && !presence.live && (
        <div className="quiet" style={{ paddingTop: 14, minHeight: 0 }}>
          The invite's out — the link is waiting.
        </div>
      )}
      <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', gap: 28, padding: '8px 4px', textAlign: 'center' }}>
        <div style={{ font: "600 30px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em', padding: '0 6px' }}>{focusItem}</div>
        {usedTimer && !entered && (
          <div className="col" style={{ width: '100%', gap: 12 }}>
            <div className="settlebar">
              <div className="settlebar-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <div style={{ font: "400 13.5px/1.5 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)' }}>
              Take the first two minutes to get settled.
            </div>
          </div>
        )}
      </div>
      <div className="col" style={{ gap: 14 }}>
        {!presence.live && !presence.invited && (
          <button className="quiet" style={{ minHeight: 0, paddingBottom: 4 }} onClick={() => openInvite()}>
            Sit with someone →
          </button>
        )}
        <button
          className="pill"
          style={{ font: "600 16.5px/1 'Poppins',sans-serif" }}
          onClick={() => {
            onDone()
            setStep('landed')
          }}
        >
          Mark it done
        </button>
        <button className="quiet" style={{ font: "400 13px/1 'Poppins',sans-serif", minHeight: 0 }} onClick={goHome}>
          Come back later →
        </button>
      </div>
    </div>
  )
}
