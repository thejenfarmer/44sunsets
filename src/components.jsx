import React, { useMemo } from 'react'

export function QuietExit({ children, onClick }) {
  return (
    <button className="quiet-exit" onClick={onClick}>
      {children}
    </button>
  )
}

export function Pill({ children, onClick, light }) {
  return (
    <button className={`pill${light ? ' pill--light' : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

export function Stars({ count = 26 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 45}%`,
        opacity: 0.35 + ((i * 29) % 50) / 100,
      })),
    [count],
  )
  return (
    <div className="stars">
      {stars.map((s, i) => (
        <span key={i} className="star" style={s} />
      ))}
    </div>
  )
}

export function StackColumn({ blocks, landingId }) {
  return (
    <div className="stack-col">
      {blocks.map((b) => (
        <div
          key={b.id}
          className={`block block--${b.material}${b.id === landingId ? ' block--landing' : ''}`}
        >
          {b.label}
          <span className="block__when">{b.when}</span>
        </div>
      ))}
    </div>
  )
}

// Shared "it landed on the Stack" room. Batches land ~350ms apart (handled by
// the caller staggering landingIds is unnecessary for the demo — single drops).
export function StackLanding({ message, subline, blocks, landingId, onHome, extra, exitLabel }) {
  return (
    <div className="screen">
      <p className="eyebrow">The Stack</p>
      <h1 className="headline" style={{ marginTop: 10 }}>
        {message}
      </h1>
      {subline && (
        <p className="sub" style={{ marginTop: 8 }}>
          {subline}
        </p>
      )}
      <div className="spacer" style={{ minHeight: 24 }} />
      <StackColumn blocks={blocks.slice(-6)} landingId={landingId} />
      {extra}
      <div className="spacer" style={{ minHeight: 24 }} />
      <QuietExit onClick={onHome}>{exitLabel || 'back home … →'}</QuietExit>
    </div>
  )
}

export function PresenceDesk({ name, oneLiner, live }) {
  if (!live) return null
  return (
    <div
      className="card"
      style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16 }}
    >
      <div className="presence">{name[0]}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>{name} is at her desk</div>
        <div className="sub" style={{ fontSize: 13, marginTop: 2 }}>
          {oneLiner}
        </div>
      </div>
    </div>
  )
}
