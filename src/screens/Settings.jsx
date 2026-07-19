import React from 'react'
import { QuietExit } from '../components.jsx'

// Settings (canvas 5a) — flat, three sections: Connections, Home, Account.

const CONNECTIONS = [
  { name: 'Slack', state: 'Connected' },
  { name: 'Teams', state: 'Connect' },
  { name: 'Contacts', state: 'Connected' },
]

export default function Settings({ pinnedLayout, setPinnedLayout, goHome }) {
  return (
    <div className="screen">
      <p className="eyebrow">Settings</p>

      <h2 style={{ fontSize: 17, fontWeight: 600, marginTop: 26 }}>Connections</h2>
      <div style={{ marginTop: 6 }}>
        {CONNECTIONS.map((c) => (
          <div key={c.name} className="settings-row">
            <span>{c.name}</span>
            <span className="hint">{c.state}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 17, fontWeight: 600, marginTop: 26 }}>Home</h2>
      <p className="sub" style={{ fontSize: 13, marginTop: 4 }}>
        How the day's layout is dealt.
      </p>
      <div style={{ marginTop: 6 }}>
        <button className="settings-row" onClick={() => setPinnedLayout(true)}>
          <span>My pick</span>
          <span className={`ring${pinnedLayout ? ' ring--filled' : ''}`} />
        </button>
        <button className="settings-row" onClick={() => setPinnedLayout(false)}>
          <span>Fresh each morning</span>
          <span className={`ring${!pinnedLayout ? ' ring--filled' : ''}`} />
        </button>
      </div>

      <h2 style={{ fontSize: 17, fontWeight: 600, marginTop: 26 }}>Account</h2>
      <div style={{ marginTop: 6 }}>
        <div className="settings-row">
          <span>Signed in as</span>
          <span className="hint">you@founder.os</span>
        </div>
        <div className="settings-row">
          <span>Sign out</span>
          <span className="hint">→</span>
        </div>
      </div>

      <div className="spacer" />
      <QuietExit onClick={goHome}>back home … →</QuietExit>
    </div>
  )
}
