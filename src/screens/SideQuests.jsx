import React, { useState } from 'react'
import { Head, Landing } from '../components.jsx'

// Side Quests (canvas 11h — one screen): tap to select in place, no
// navigation. The selected quest wears the full blue→yellow material + a
// filled ring; the others sit quiet with material strokes and empty rings.
// Completion is 11g's Stack landing with quiet exits only.

const QUEST_GRAD = 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)'
const STROKE_GRAD = 'linear-gradient(105deg,#2F7FA0,#F6C95C)'

export default function SideQuests({ quests, selected, setSelected, onDone, goHome, stack, landing }) {
  const [phase, setPhase] = useState('room') // room | landed

  if (phase === 'landed') {
    return (
      <Landing
        eyebrow="Side Quests"
        eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }}
        bgClass=""
        grain="grain"
        headline="You cleared the good stuff."
        stack={stack}
        landing={landing}
        under={
          quests.length > 0 ? (
            <button className="quiet" style={{ minHeight: 0 }} onClick={() => setPhase('room')}>
              One more? →
            </button>
          ) : null
        }
        exit="Done for now →"
        onExit={goHome}
      />
    )
  }

  return (
    <div className="screen grain" style={{ background: '#FAF3E7' }}>
      <Head eyebrow="Side Quests" eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }} headline="Feel like playing?" sub="The good stuff — no clock in here." />
      <div className="spacer col" style={{ justifyContent: 'center', gap: 13 }}>
        {quests.map((q) => {
          const on = q === selected
          return on ? (
            <button
              key={q}
              style={{ background: QUEST_GRAD, borderRadius: 22, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 14px 30px -16px rgba(47,127,160,.6)', color: '#221A12' }}
              onClick={() => setSelected(q)}
            >
              <span style={{ font: "700 19px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em', flex: 1 }}>{q}</span>
              <span style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', border: '2px solid #221A12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#221A12' }} />
              </span>
            </button>
          ) : (
            <button
              key={q}
              style={{ background: '#FFFDF6', border: '1.5px solid rgba(34,26,18,.14)', borderRadius: 22, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 14 }}
              onClick={() => setSelected(q)}
            >
              <span className="col" style={{ gap: 8, flex: 1 }}>
                <span style={{ width: 26, height: 4, borderRadius: 999, background: STROKE_GRAD }} />
                <span style={{ font: "700 19px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em' }}>{q}</span>
              </span>
              <span style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', border: '1.5px solid rgba(34,26,18,.3)' }} />
            </button>
          )
        })}
        {quests.length === 0 && <div className="subline" style={{ alignSelf: 'center' }}>The good stuff is done for today.</div>}
      </div>
      <div className="col" style={{ gap: 10 }}>
        {quests.length > 0 && (
          <button
            className="pill"
            style={{ font: "600 15px/1 'Poppins',sans-serif", opacity: selected ? 1 : 0.4 }}
            onClick={() => {
              if (!selected) return
              onDone(selected)
              setPhase('landed')
            }}
          >
            Mark it done
          </button>
        )}
        <button className="quiet" onClick={goHome}>
          Leave side quests →
        </button>
      </div>
    </div>
  )
}
