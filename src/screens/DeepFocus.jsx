import React, { useEffect, useRef, useState } from 'react'
import { Pill, QuietExit, PresenceDesk } from '../components.jsx'
import { DEMO } from '../state.js'

// Deep Focus Kickoff (canvas 17b):
// ① focus pre-selected on the sunset card → ①b switch list →
// ② ignition (Sit with someone / A settle timer / Just jump in →) →
// ③ Deep Work room (settle bar via timer, or straight in) → ④ Stack landing.

const SETTLE_SECONDS = 15 // demo-accelerated settle timer

export default function DeepFocus({ focusItem, setFocusItem, presence, openInvite, onComplete, goHome }) {
  const [step, setStep] = useState('focus') // focus | switch | ignition | room
  const [entered, setEntered] = useState(false) // false = settling, true = "You're in."
  const [usedTimer, setUsedTimer] = useState(false)
  const [settleProgress, setSettleProgress] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (step === 'room' && usedTimer && !entered) {
      timerRef.current = setInterval(() => {
        setSettleProgress((p) => {
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

  if (step === 'focus') {
    return (
      <div className="screen">
        <p className="eyebrow">Deep Work</p>
        <div className="spacer" style={{ minHeight: 28 }} />
        <div className="card card--sunset" style={{ padding: '34px 26px' }}>
          <p className="eyebrow" style={{ color: 'rgba(34,26,18,.5)' }}>
            The One Thing
          </p>
          <h1 className="headline" style={{ marginTop: 10 }}>
            {focusItem}
          </h1>
        </div>
        <button className="quiet-exit" style={{ marginTop: 14 }} onClick={() => setStep('switch')}>
          ⇄ Work on something else
        </button>
        <div className="spacer" />
        <Pill onClick={() => setStep('ignition')}>This is the one</Pill>
        <QuietExit onClick={goHome}>back home … →</QuietExit>
      </div>
    )
  }

  if (step === 'switch') {
    const pick = (item) => {
      setFocusItem(item)
      setStep('focus')
    }
    return (
      <div className="screen">
        <p className="eyebrow">Deep Work</p>
        <h1 className="headline" style={{ marginTop: 10 }}>
          Work on something else
        </h1>
        <div className="spacer" style={{ minHeight: 24 }} />
        <div className="stack-gap-12">
          {DEMO.focusAlternates.map((alt) => (
            <button key={alt} className="card" style={{ width: '100%', fontSize: 16 }} onClick={() => pick(alt)}>
              {alt}
            </button>
          ))}
          <WriteIn onSubmit={pick} />
        </div>
        <div className="spacer" />
        <QuietExit onClick={() => setStep('focus')}>never mind … →</QuietExit>
      </div>
    )
  }

  if (step === 'ignition') {
    return (
      <div className="screen">
        <p className="eyebrow">Deep Work</p>
        <h1 className="headline" style={{ marginTop: 10 }}>
          How do you want to start?
        </h1>
        <div className="spacer" style={{ minHeight: 24 }} />
        <div className="stack-gap-12">
          <button
            className="card card--sunset"
            style={{ width: '100%', padding: '26px 22px' }}
            onClick={() => openInvite(() => enterRoom(false))}
          >
            <span style={{ fontSize: 18, fontWeight: 600 }}>Sit with someone</span>
            <span className="sub" style={{ display: 'block', marginTop: 4, color: 'rgba(34,26,18,.55)' }}>
              A friend at the next desk while you work.
            </span>
          </button>
          <button className="card" style={{ width: '100%', padding: '22px' }} onClick={() => enterRoom(true)}>
            <span style={{ fontSize: 17, fontWeight: 500 }}>A settle timer</span>
            <span className="sub" style={{ display: 'block', marginTop: 4 }}>
              A slow bar while you land.
            </span>
          </button>
        </div>
        <div className="spacer" />
        <QuietExit onClick={() => enterRoom(false, true)}>Just jump in →</QuietExit>
      </div>
    )
  }

  function enterRoom(withTimer, jumpedIn = false) {
    setUsedTimer(withTimer)
    setEntered(!withTimer)
    setSettleProgress(0)
    setStep('room')
  }

  // ③ The Deep Work room — single object, no digits on focus surfaces.
  return (
    <div className="screen">
      <p className="eyebrow">Deep Work</p>
      <div className="spacer" style={{ minHeight: 40 }} />
      <div className="card card--sunset" style={{ padding: '40px 26px' }}>
        <h1 className="headline">{focusItem}</h1>
      </div>
      <p className="sub" style={{ marginTop: 18, textAlign: 'center', fontSize: 16 }}>
        {entered ? "You're in." : 'Settle in.'}
      </p>
      {usedTimer && !entered && (
        <div className="settlebar" style={{ marginTop: 16 }}>
          <div className="settlebar__fill" style={{ width: `${settleProgress * 100}%` }} />
        </div>
      )}
      <div className="spacer" />
      {presence.live ? (
        <PresenceDesk name={presence.companion} oneLiner={presence.label} live />
      ) : (
        <QuietExit onClick={() => openInvite()}>sit with someone … →</QuietExit>
      )}
      <QuietExit onClick={onComplete}>that's enough for now … →</QuietExit>
    </div>
  )
}

export function WriteIn({ onSubmit, placeholder = 'or write your own…' }) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value.trim()) onSubmit(value.trim())
      }}
    >
      <input
        className="writein"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
