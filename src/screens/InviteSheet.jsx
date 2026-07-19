import React, { useState } from 'react'

// Invite composer (canvas 9b) — a sheet, never a page. Rises over the dimmed
// current room; drops on action. Slot first (10/20/30, 20 pre-selected), the
// message rewrites itself live, destination tiles, one tap sends.

const SLOTS = [10, 20, 30]
const DESTINATIONS = [
  { glyph: '#', label: 'Slack' },
  { glyph: 'T', label: 'Teams' },
  { glyph: '@', label: 'Contacts' },
  { glyph: '✉', label: 'SMS' },
]

export default function InviteSheet({ onSend, onDismiss }) {
  const [minutes, setMinutes] = useState(20)
  const [channel, setChannel] = useState('Slack')

  return (
    <>
      <div className="sheet-scrim" onClick={onDismiss} />
      <div className="sheet">
        <div className="sheet-handle" />
        <div className="eyebrow" style={{ color: 'rgba(34,26,18,.45)' }}>
          Sit with someone
        </div>
        <div style={{ font: "700 24px/1.25 'Poppins',sans-serif", letterSpacing: '-.01em', paddingTop: 6 }}>Ask someone to sit with you.</div>
        <div style={{ font: "400 13.5px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)', maxWidth: 280 }}>
          Pick how long — the message writes itself.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {SLOTS.map((m) => (
            <button key={m} className={`slot-pill${m === minutes ? ' slot-pill--on' : ''}`} onClick={() => setMinutes(m)}>
              {m} min
            </button>
          ))}
        </div>
        <div style={{ border: '1px solid rgba(34,26,18,.14)', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ font: "500 14.5px/1.5 'Poppins',sans-serif" }}>
            Sit with me for {minutes} minutes — <span style={{ color: 'rgba(34,26,18,.45)', textDecoration: 'underline' }}>[link]</span>
          </div>
          <div style={{ font: "400 11.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.4)' }}>Tap to edit</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {DESTINATIONS.map((d) => (
            <button key={d.label} className={`dest-tile${d.label === channel ? ' dest-tile--on' : ''}`} onClick={() => setChannel(d.label)}>
              <span className="dest-glyph">{d.glyph}</span>
              <span style={{ font: "500 11.5px/1 'Poppins',sans-serif" }}>{d.label}</span>
            </button>
          ))}
        </div>
        <button className="pill" style={{ font: "600 16.5px/1 'Poppins',sans-serif" }} onClick={() => onSend({ slotMinutes: minutes, channel })}>
          Send the invite
        </button>
        <button className="quiet" style={{ font: "400 13px/1 'Poppins',sans-serif", minHeight: 0 }} onClick={onDismiss}>
          Schedule it →
        </button>
      </div>
    </>
  )
}
