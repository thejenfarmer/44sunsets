import React from 'react'
import { QuietExit, StackColumn } from '../components.jsx'
import { WriteIn } from './DeepFocus.jsx'

// The Net — things caught, not scheduled. No counts anywhere.

export function Net({ netItems, addNetItem, goHome }) {
  return (
    <div className="screen">
      <p className="eyebrow">The Net</p>
      <h1 className="headline" style={{ marginTop: 10 }}>
        Caught, not scheduled.
      </h1>
      <p className="sub" style={{ marginTop: 8 }}>
        Stray thoughts land here so they stop circling.
      </p>
      <div className="spacer" style={{ minHeight: 24 }} />
      <div className="stack-gap-12">
        {netItems.map((item) => (
          <div key={item.text} className="card" style={{ padding: '16px 18px' }}>
            <span style={{ fontSize: 15 }}>{item.text}</span>
            <span className="block__when" style={{ color: 'var(--ink-faint)' }}>
              {item.when}
            </span>
          </div>
        ))}
        <WriteIn onSubmit={addNetItem} placeholder="toss something in…" />
      </div>
      <div className="spacer" />
      <QuietExit onClick={goHome}>back home … →</QuietExit>
    </div>
  )
}

// The Stack — everything that landed today, as material blocks.

export function Stack({ stack, goHome }) {
  return (
    <div className="screen">
      <p className="eyebrow">The Stack</p>
      <h1 className="headline" style={{ marginTop: 10 }}>
        {stack.length > 0 ? 'What landed today.' : 'Nothing yet — the day is young.'}
      </h1>
      <div className="spacer" style={{ minHeight: 24 }} />
      <StackColumn blocks={stack} />
      <div className="spacer" />
      <QuietExit onClick={goHome}>back home … →</QuietExit>
    </div>
  )
}
