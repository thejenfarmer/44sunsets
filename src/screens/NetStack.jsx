import React, { useState } from 'react'
import { Head } from '../components.jsx'

// The Net (2f) — items are loose pills inside a dashed boundary; undated,
// unnumbered, nothing here can be late. Tap opens the two feeling chips
// (tagging alone routes); hold to let one go. No delete word, no confirm.

const DOT = {
  pulls: 'linear-gradient(105deg,#2F7FA0,#F6C95C)',
  dread: 'linear-gradient(105deg,#7CA75F,#2E9B82,#2F7FA0)',
}

export function Net({ netItems, setNetItems, goHome }) {
  const [openItem, setOpenItem] = useState(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')

  const release = (item) => setNetItems(netItems.filter((n) => n !== item))
  const tag = () => setOpenItem(null) // routing is invisible — the tag alone routes it

  return (
    <div className="screen grain">
      <Head eyebrow="The Net" eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }} headline="Caught so your head doesn't have to hold them." sub="Tap one to open it. Hold one to let it go." />
      <div className="spacer col" style={{ justifyContent: 'center', paddingTop: 20 }}>
        <div className="net-boundary" style={{ minHeight: 300 }}>
          {netItems.map((item) =>
            openItem === item ? (
              <div key={item} style={{ width: '100%', background: '#FFFDF6', border: '1.5px solid rgba(34,26,18,.3)', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ font: "600 15px/1.4 'Poppins',sans-serif" }}>{item}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button className="chip" onClick={tag}>
                    <span className="chip-dot" style={{ background: '#221A12' }} />
                    Pulls me
                  </button>
                  <button className="chip" onClick={tag}>
                    <span className="chip-dot" style={{ background: DOT.dread }} />
                    Dreading it
                  </button>
                </div>
              </div>
            ) : (
              <button
                key={item}
                className="net-item"
                onClick={() => setOpenItem(item)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  release(item)
                }}
              >
                {item}
              </button>
            ),
          )}
          {netItems.length === 0 && <div className="subline" style={{ margin: 'auto' }}>The Net is empty. Heads stay light.</div>}
        </div>
      </div>
      <div className="col" style={{ gap: 10, paddingTop: 18 }}>
        {adding ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (draft.trim()) setNetItems([...netItems, draft.trim()])
              setDraft('')
              setAdding(false)
            }}
          >
            <input className="writein" autoFocus value={draft} placeholder="One line is enough…" onChange={(e) => setDraft(e.target.value)} />
          </form>
        ) : (
          <button className="pill" onClick={() => setAdding(true)}>
            + Catch a thought
          </button>
        )}
        <button className="quiet" onClick={goHome}>
          Back home →
        </button>
      </div>
    </div>
  )
}

// The Stack (2g) — sediment strata in the three materials, bottom-up, never
// come down. Tabs: Day / Week / Month / Year. No counts anywhere.

export function Stack({ stack, goHome }) {
  const [tab, setTab] = useState('Week')
  return (
    <div className="screen grain">
      <Head eyebrow="The Stack" eyebrowStyle={{ color: 'rgba(34,26,18,.45)' }} />
      <div className="tabs" style={{ marginTop: 16 }}>
        {['Day', 'Week', 'Month', 'Year'].map((t) => (
          <button key={t} className={`tab${t === tab ? ' tab--on' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ font: "700 28px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em', textAlign: 'center', paddingTop: 22 }}>
        The {tab.toLowerCase()}, stacking up.
      </div>
      <div className="spacer col" style={{ justifyContent: 'flex-end', alignItems: 'center', paddingTop: 20 }}>
        <div className="col" style={{ width: 230, gap: 6, flexDirection: 'column' }}>
          {[...stack].reverse().map((b) => (
            <div key={b.id} className={`pile-block mat--${b.material}`} style={{ width: `${b.width}%`, alignSelf: 'center', height: tab === 'Year' ? 10 : 20 }} />
          ))}
        </div>
      </div>
      <div className="col" style={{ gap: 8, paddingTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {[
            ['sunset', 'The One Thing'],
            ['bluegold', 'Pulls me'],
            ['band', 'Dreading it'],
          ].map(([mat, label]) => (
            <div key={mat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className={`mat--${mat}`} style={{ width: 12, height: 8, borderRadius: 3 }} />
              <span style={{ font: "500 11.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ font: "400 12px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', textAlign: 'center' }}>landed anyway</div>
        <button className="quiet" onClick={goHome}>
          Back home →
        </button>
      </div>
    </div>
  )
}
