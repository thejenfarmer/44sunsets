import React from 'react'
import { Head } from '../components.jsx'

// Settings (5a) — set-once-and-leave; flat, inert. Sections: Connections
// ("Where your tasks flow in from."), Home (the layout preference from the
// wardrobe shuffle rules), Account. No themes, no notification toggles.

const CONNECTED = ['Slack', 'Google']
const AVAILABLE = ['Asana', 'Sunsama', 'AI Notes']

function SectionTitle({ children, sub }) {
  return (
    <div className="col" style={{ gap: 3, paddingTop: 28 }}>
      <div className="eyebrow" style={{ color: 'rgba(34,26,18,.45)' }}>
        {children}
      </div>
      {sub && <div style={{ font: "400 12.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>{sub}</div>}
    </div>
  )
}

function Row({ left, right, onClick }) {
  return (
    <button className="settings-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 52, width: '100%', font: "500 15px/1.3 'Poppins',sans-serif", borderBottom: '1px solid rgba(34,26,18,.08)' }} onClick={onClick}>
      <span>{left}</span>
      {right}
    </button>
  )
}

export default function Settings({ pinnedLayout, setPinnedLayout, goHome }) {
  const muted = { font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }
  const ring = (on) => (
    <span style={{ width: 22, height: 22, borderRadius: '50%', border: on ? '2px solid #221A12' : '1.5px solid rgba(34,26,18,.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      {on && <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#221A12' }} />}
    </span>
  )
  return (
    <div className="screen grain" style={{ paddingTop: 64 }}>
      <Head eyebrow="Settings" eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }} />

      <SectionTitle sub="Where your tasks flow in from.">Connections</SectionTitle>
      <div className="col">
        {CONNECTED.map((name) => (
          <Row key={name} left={name} right={<span style={muted}>Connected</span>} />
        ))}
        {AVAILABLE.map((name) => (
          <Row key={name} left={name} right={<span style={{ ...muted, border: '1.5px solid rgba(34,26,18,.25)', borderRadius: 999, padding: '9px 16px', color: 'rgba(34,26,18,.6)' }}>Connect</span>} />
        ))}
      </div>

      <SectionTitle sub="How Home dresses each morning.">Home</SectionTitle>
      <div className="col">
        <Row left="My pick" right={ring(pinnedLayout)} onClick={() => setPinnedLayout(true)} />
        <Row left="Fresh each morning" right={ring(!pinnedLayout)} onClick={() => setPinnedLayout(false)} />
      </div>

      <SectionTitle>Account</SectionTitle>
      <div className="col">
        <Row left="Founder OS — active" right={<span style={muted}>Manage</span>} />
        <Row left="Card •••• 4242" right={<span style={muted}>Update</span>} />
        <Row left={<span style={{ color: 'rgba(34,26,18,.5)' }}>Sign out</span>} />
      </div>

      <div className="spacer" />
      <button className="quiet" onClick={goHome}>
        Back home →
      </button>
    </div>
  )
}
