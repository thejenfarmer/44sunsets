import React, { useEffect, useState } from 'react'
import { Pill, QuietExit } from '../components.jsx'
import { DEMO } from '../state.js'

// Knockout Round (canvas 11c → 11d → 11e):
// entry before the bell → mid-round (roasted-dark room, 4 draining pill
// blocks, checklist, zero saturated elements) → the win → Stack landing (App).

const BLOCKS = 4
const SECONDS_PER_BLOCK = 8 // demo-accelerated; the real round is 20 minutes

export default function Knockout({ onWin, goHome, openInvite }) {
  const [phase, setPhase] = useState('pre') // pre | mid | won
  const [elapsed, setElapsed] = useState(0)
  const [checks, setChecks] = useState(DEMO.knockoutChecklist.map((text) => ({ text, done: false })))

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
      <div className="screen screen--band">
        <p className="eyebrow">Knockout Round</p>
        <div className="spacer" />
        <h1 className="headline" style={{ fontSize: 32 }}>
          Twenty small minutes.
          <br />
          Four little things.
        </h1>
        <p className="sub" style={{ marginTop: 12 }}>
          When the bell rings, the round is over — whatever got done, got done.
        </p>
        <div className="spacer" />
        <Pill light onClick={() => setPhase('mid')}>
          Ring the bell →
        </Pill>
        <QuietExit onClick={goHome}>back home … →</QuietExit>
      </div>
    )
  }

  if (phase === 'won') {
    return (
      <div className="screen screen--band">
        <div className="spacer" />
        <h1 className="headline" style={{ fontSize: 30 }}>
          20 minutes done. That's the win — full stop.
        </h1>
        <div className="spacer" />
        <Pill light onClick={onWin}>
          Put it on the Stack
        </Pill>
      </div>
    )
  }

  // Mid-round — deepened band, zero saturated elements, no digits.
  const activeBlock = Math.floor(elapsed / SECONDS_PER_BLOCK)
  const toggle = (i) =>
    setChecks((cs) => cs.map((c, j) => (j === i ? { ...c, done: !c.done } : c)))

  return (
    <div className="screen screen--dark">
      <p className="eyebrow">Knockout Round</p>
      <div className="stack-gap-8" style={{ marginTop: 20 }}>
        {Array.from({ length: BLOCKS }, (_, i) => {
          const secondsIntoBlock = Math.min(
            SECONDS_PER_BLOCK,
            Math.max(0, elapsed - i * SECONDS_PER_BLOCK),
          )
          const remaining = 1 - secondsIntoBlock / SECONDS_PER_BLOCK
          return (
            <div key={i} className={`ko-block${i === activeBlock ? ' ko-block--breathing' : ''}`}>
              <div className="ko-block__fill" style={{ transform: `scaleX(${remaining})` }} />
            </div>
          )
        })}
      </div>
      <div className="stack-gap-8" style={{ marginTop: 26 }}>
        {checks.map((c, i) => (
          <button key={c.text} className="check-row" onClick={() => toggle(i)}>
            <span className={`checkbox${c.done ? ' checkbox--done' : ''}`}>{c.done ? '✓' : ''}</span>
            <span className={c.done ? 'row-done' : ''}>{c.text}</span>
          </button>
        ))}
      </div>
      <div className="spacer" />
      <QuietExit onClick={() => openInvite()}>a hard one? ask someone to sit with you … →</QuietExit>
      <QuietExit onClick={() => setPhase('won')}>call the round … →</QuietExit>
    </div>
  )
}
