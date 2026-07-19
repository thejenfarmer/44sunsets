import React, { useState } from 'react'
import { Pill } from '../components.jsx'

// Invite composer (canvas 9b) — a sheet, never a page. Rises over the dimmed
// current room. Slot picker 10/20/30 (20 pre-selected), the pre-written
// message updates live, destination tiles, "Send the invite". Sheets drop on action.

const SLOTS = [10, 20, 30]
const DESTINATIONS = ['Slack', 'Teams', 'Contacts', 'SMS']

export default function InviteSheet({ onSend, onDismiss }) {
  const [minutes, setMinutes] = useState(20)
  const [channel, setChannel] = useState('Slack')

  const message = `Sit with me for ${minutes} minutes — [link]`

  return (
    <div className="sheet-scrim" onClick={onDismiss}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow">Sit with someone</p>

        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          {SLOTS.map((m) => (
            <button
              key={m}
              className={`chip${m === minutes ? ' chip--on' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
              onClick={() => setMinutes(m)}
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="card" style={{ marginTop: 16, padding: '18px 20px', boxShadow: 'none', border: '1.5px solid rgba(34,26,18,.12)' }}>
          <p style={{ fontSize: 15 }}>{message}</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {DESTINATIONS.map((d) => (
            <button
              key={d}
              className={`chip${d === channel ? ' chip--on' : ''}`}
              style={{ flex: 1, textAlign: 'center', padding: '10px 4px', fontSize: 13 }}
              onClick={() => setChannel(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <Pill onClick={() => onSend({ slotMinutes: minutes, message, channel })}>Send the invite</Pill>
        </div>
        <button className="quiet-exit" onClick={onDismiss} style={{ marginTop: 4 }}>
          not right now … →
        </button>
      </div>
    </div>
  )
}
