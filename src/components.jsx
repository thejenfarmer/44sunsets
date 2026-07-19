import React from 'react'

export function Head({ eyebrow, headline, sub, eyebrowStyle, children }) {
  return (
    <div className="head">
      <div className="eyebrow" style={eyebrowStyle}>
        {eyebrow}
      </div>
      {headline && <div className="headline">{headline}</div>}
      {sub && <div className="subline">{sub}</div>}
      {children}
    </div>
  )
}

export function Avatar({ size = 32, glow = false, style }) {
  return (
    <div
      className={`avatar${glow ? ' avatar--glow' : ''}`}
      style={{ width: size, height: size, font: `600 ${Math.round(size * 0.4)}px/1 'Poppins',sans-serif`, ...style }}
    >
      J
    </div>
  )
}

// The Stack pile (landing grammar): 210px column, 20px blocks, the new block
// mid-landing on top (~500ms settle, translateY(-14px) rotate(-2deg)).
export function Pile({ stack, landing }) {
  const base = (landing ? stack.filter((b) => b.id !== landing.id) : stack).slice(-4)
  return (
    <div className="pile">
      {landing && <div className={`pile-block pile-block--landing mat--${landing.material}`} style={{ width: `${landing.width}%` }} />}
      {[...base].reverse().map((b) => (
        <div key={b.id} className={`pile-block mat--${b.material}`} style={{ width: `${b.width}%` }} />
      ))}
    </div>
  )
}

// Shared Stack-landing room: eyebrow → pile at center → one headline → quiet exit.
export function Landing({ eyebrow, eyebrowStyle, bgClass = 'bg-dawn-deep', grain = 'grain', dark, headline, stack, landing, under, exit = 'Back home →', onExit }) {
  return (
    <div
      className={`screen ${bgClass} ${grain}`}
      style={dark ? { background: '#221A12', color: '#FAF3E7', padding: '64px 20px 42px' } : { padding: '64px 20px 42px' }}
    >
      <Head eyebrow={eyebrow} eyebrowStyle={eyebrowStyle} />
      <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', gap: 34, padding: '8px 4px', textAlign: 'center' }}>
        <Pile stack={stack} landing={landing} />
        <div className="landing-line">{headline}</div>
        {under}
      </div>
      <button className={`quiet${dark ? ' quiet--cream' : ''}`} style={{ padding: '12px 0' }} onClick={onExit}>
        {exit}
      </button>
    </div>
  )
}
