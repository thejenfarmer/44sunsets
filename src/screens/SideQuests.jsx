import React from 'react'
import { Pill, QuietExit } from '../components.jsx'

// Side Quests (canvas 11h — one screen): tap to select in place, no
// navigation. Selected quest wears the blue→yellow material + filled ring.

export default function SideQuests({ quests, selected, setSelected, onDone, goHome }) {
  if (quests.length === 0) {
    return (
      <div className="screen">
        <p className="eyebrow">Side Quests</p>
        <h1 className="headline" style={{ marginTop: 10 }}>
          All quiet here.
        </h1>
        <p className="sub" style={{ marginTop: 8 }}>
          The quests are done for today.
        </p>
        <div className="spacer" />
        <QuietExit onClick={goHome}>back home … →</QuietExit>
      </div>
    )
  }

  return (
    <div className="screen">
      <p className="eyebrow">Side Quests</p>
      <h1 className="headline" style={{ marginTop: 10 }}>
        Three worth doing.
      </h1>
      <div className="spacer" style={{ minHeight: 24 }} />
      <div className="stack-gap-12">
        {quests.map((q) => {
          const on = q === selected
          return (
            <button
              key={q}
              className={`card${on ? ' card--bluegold' : ''}`}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 16,
                fontWeight: on ? 600 : 400,
              }}
              onClick={() => setSelected(q)}
            >
              <span className={`ring${on ? ' ring--filled' : ''}`} />
              {q}
            </button>
          )
        })}
      </div>
      <div className="spacer" />
      <Pill onClick={() => selected && onDone(selected)}>Mark it done</Pill>
      <QuietExit onClick={goHome}>Leave side quests →</QuietExit>
    </div>
  )
}
