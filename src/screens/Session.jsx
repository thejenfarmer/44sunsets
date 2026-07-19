import React, { useState } from 'react'
import { Pill, QuietExit, PresenceDesk } from '../components.jsx'
import { DEMO } from '../state.js'

// Scheduled session (canvas 15a): pre-session sit-down → live open desks
// (Jen's presence glow + her self-written one-liner) → Stack landing (App).

export default function Session({ focusItem, onComplete, goHome }) {
  const [live, setLive] = useState(false)

  if (!live) {
    return (
      <div className="screen">
        <p className="eyebrow">A sit-down</p>
        <div className="spacer" style={{ minHeight: 30 }} />
        <div className="card" style={{ padding: '30px 24px', textAlign: 'center' }}>
          <div className="presence" style={{ margin: '0 auto' }}>
            J
          </div>
          <h1 className="headline" style={{ fontSize: 24, marginTop: 18 }}>
            Jen is settling in.
          </h1>
          <p className="sub" style={{ marginTop: 8 }}>
            Two desks, side by side. Yours is waiting.
          </p>
        </div>
        <div className="spacer" />
        <Pill onClick={() => setLive(true)}>Take your seat</Pill>
        <QuietExit onClick={goHome}>not right now … →</QuietExit>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="eyebrow">Open desks</p>
      <div className="spacer" style={{ minHeight: 30 }} />
      <div className="card card--sunset" style={{ padding: '34px 26px' }}>
        <p className="eyebrow" style={{ color: 'rgba(34,26,18,.5)' }}>
          Your desk
        </p>
        <h1 className="headline" style={{ marginTop: 10, fontSize: 24 }}>
          {focusItem}
        </h1>
      </div>
      <div style={{ marginTop: 14 }}>
        <PresenceDesk name={DEMO.jen.name} oneLiner={DEMO.jen.oneLiner} live />
      </div>
      <div className="spacer" />
      <QuietExit onClick={onComplete}>that's enough for now … →</QuietExit>
    </div>
  )
}
