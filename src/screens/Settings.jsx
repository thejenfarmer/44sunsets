import React, { useState } from 'react'

// Settings (5a) — set-once-and-leave; flat, inert. Sections: CONNECTIONS
// ("Where your tasks flow in from.", rollout banner, per-source "What flows
// in" chips), HOME (the layout preference that earns its slot), ACCOUNT.
// Accent budget: green only as text/outline on row actions, off the work path.

const GREEN = '#2E9B82'

function Eyebrow({ children }) {
  return (
    <div style={{ font: "600 11px/1 'Poppins',sans-serif", letterSpacing: '.14em', color: 'rgba(34,26,18,.45)', textTransform: 'uppercase' }}>
      {children}
    </div>
  )
}

function Tile({ children }) {
  return (
    <span style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(34,26,18,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 11px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)', flex: 'none' }}>
      {children}
    </span>
  )
}

function FlowChips({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 42, flexWrap: 'wrap' }}>
      <span style={{ font: "400 12px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>What flows in:</span>
      {['Everything', 'Flagged only'].map((opt) => {
        const on = value === opt
        return (
          <button
            key={opt}
            style={{
              font: "600 11.5px/1 'Poppins',sans-serif",
              borderRadius: 999,
              padding: '8px 13px',
              minHeight: 30,
              background: on ? '#221A12' : 'none',
              color: on ? '#FAF3E7' : 'rgba(34,26,18,.55)',
              border: on ? '1.5px solid #221A12' : '1.5px solid rgba(34,26,18,.2)',
            }}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ConnectedRow({ tile, name, flow, setFlow, helper }) {
  return (
    <div className="col" style={{ gap: 10, padding: '16px 0', borderBottom: '1px solid rgba(34,26,18,.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Tile>{tile}</Tile>
        <span className="col" style={{ gap: 2, flex: 1 }}>
          <span style={{ font: "600 15px/1.2 'Poppins',sans-serif" }}>{name}</span>
          <span style={{ font: "400 12px/1.3 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>connected as jane@co.com</span>
        </span>
        <button style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', minHeight: 44 }}>Disconnect</button>
      </div>
      <FlowChips value={flow} onChange={setFlow} />
      {helper && flow === 'Flagged only' && (
        <div style={{ font: "400 11.5px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', paddingLeft: 42 }}>{helper}</div>
      )}
    </div>
  )
}

function ConnectRow({ tile, name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(34,26,18,.08)' }}>
      <Tile>{tile}</Tile>
      <span style={{ font: "600 15px/1.2 'Poppins',sans-serif", flex: 1 }}>{name}</span>
      <button style={{ font: "600 12.5px/1 'Poppins',sans-serif", color: GREEN, border: `1.5px solid ${GREEN}`, borderRadius: 999, padding: '10px 18px', minHeight: 38 }}>
        Connect
      </button>
    </div>
  )
}

export default function Settings({ pinnedLayout, setPinnedLayout, goHome }) {
  const [slackFlow, setSlackFlow] = useState('Everything')
  const [googleFlow, setGoogleFlow] = useState('Flagged only')

  const layoutCard = (on, title, sub, pick) => (
    <button
      className="col"
      style={{
        flex: 1,
        gap: 3,
        border: on ? '1.5px solid #221A12' : '1.5px solid rgba(34,26,18,.15)',
        borderRadius: 14,
        padding: '13px 14px',
        background: '#FFFDF6',
      }}
      onClick={pick}
    >
      <span style={{ font: "600 13.5px/1.2 'Poppins',sans-serif" }}>{title}</span>
      <span style={{ font: "400 11.5px/1.3 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>{sub}</span>
    </button>
  )

  return (
    <div className="screen grain" style={{ padding: '64px 24px 40px', overflowY: 'auto' }}>
      <div style={{ font: "700 26px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Settings</div>

      <div className="col" style={{ gap: 4, paddingTop: 24 }}>
        <Eyebrow>Connections</Eyebrow>
        <div style={{ font: "400 12.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>Where your tasks flow in from.</div>
      </div>
      <div style={{ background: 'rgba(34,26,18,.05)', borderRadius: 12, padding: '12px 14px', font: "400 12px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)', marginTop: 12 }}>
        Connections are rolling out — [placeholder] for early access.
      </div>
      <div className="col">
        <ConnectedRow tile="Sl" name="Slack" flow={slackFlow} setFlow={setSlackFlow} />
        <ConnectedRow
          tile="G"
          name="Google"
          flow={googleFlow}
          setFlow={setGoogleFlow}
          helper="Flagged only pulls in just what you've starred or prioritized in Google."
        />
        <ConnectRow tile="As" name="Asana" />
        <ConnectRow tile="Su" name="Sunsama" />
        <ConnectRow tile="AI" name="AI Notes" />
      </div>

      <div className="col" style={{ gap: 12, paddingTop: 26 }}>
        <Eyebrow>Home</Eyebrow>
        <div style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: 18, padding: 16 }} className="col">
          <div style={{ font: "600 15px/1.3 'Poppins',sans-serif" }}>Home layout</div>
          <div style={{ font: "400 12.5px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)', paddingTop: 3 }}>
            Keep one outfit, or let Home re-deal each morning.
          </div>
          <div style={{ display: 'flex', gap: 10, paddingTop: 12 }}>
            {layoutCard(pinnedLayout, 'My pick', 'Tilted doors, pinned', () => setPinnedLayout(true))}
            {layoutCard(!pinnedLayout, 'Fresh each morning', 'The daily shuffle', () => setPinnedLayout(false))}
          </div>
        </div>
      </div>

      <div className="col" style={{ gap: 4, paddingTop: 26 }}>
        <Eyebrow>Account</Eyebrow>
        <div className="col">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(34,26,18,.08)' }}>
            <span className="col" style={{ gap: 2 }}>
              <span style={{ font: "600 14.5px/1.2 'Poppins',sans-serif" }}>Founder OS — active</span>
              <span style={{ font: "400 12px/1.3 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>software + kit + accountability</span>
            </span>
            <span style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>Manage</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(34,26,18,.08)' }}>
            <span style={{ font: "500 14.5px/1.2 'Poppins',sans-serif" }}>Card •••• 4242</span>
            <span style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>Update</span>
          </div>
          <div style={{ padding: '14px 0', font: "500 14px/1.2 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)' }}>Sign out</div>
        </div>
      </div>

      <button className="quiet" style={{ paddingTop: 8 }} onClick={goHome}>
        Back home →
      </button>
    </div>
  )
}
