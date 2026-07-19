import React, { useRef, useState } from 'react'
import { todayKey } from '../state.js'

// The Net (2f, final frame) — a holding place, not a list: items drift inside
// a dashed boundary at loose alignments, pill-soft, undated, unnumbered.
// Tap one to open it (two feeling chips inline; tagging alone routes it).
// Hold one to let it go — no delete word, no confirm, no undo toast.

const DOT = {
  ink: '#221A12',
  dread: 'linear-gradient(105deg,#7CA75F,#2E9B82,#2F7FA0)',
}

const ALIGNS = ['flex-start', 'flex-end', 'flex-start', 'center', 'flex-start', 'flex-end']

export function Net({ netItems, setNetItems, goHome }) {
  const [openItem, setOpenItem] = useState(null)
  const [holding, setHolding] = useState(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const holdRef = useRef(null)

  const release = (item) => setNetItems(netItems.filter((n) => n !== item))
  const tag = () => setOpenItem(null) // routing is invisible — the tag alone routes it

  const startHold = (item) => {
    setHolding(item)
    holdRef.current = setTimeout(() => {
      release(item)
      setHolding(null)
      if (openItem === item) setOpenItem(null)
    }, 1400)
  }
  const cancelHold = () => {
    clearTimeout(holdRef.current)
    setHolding(null)
  }

  const miniChip = (label, dot, onPick) => (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid rgba(34,26,18,.18)', borderRadius: 999, padding: '6px 10px', font: "500 11px/1 'Poppins',sans-serif", minHeight: 28 }}
      onClick={onPick}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flex: 'none' }} />
      {label}
    </button>
  )

  return (
    <div className="screen grain" style={{ padding: '64px 24px 40px' }}>
      <div className="eyebrow" style={{ color: 'rgba(34,26,18,.45)' }}>
        The Net
      </div>
      <div style={{ font: "700 24px/1.25 'Poppins',sans-serif", letterSpacing: '-.01em', paddingTop: 8, maxWidth: 300 }}>
        Caught so your head doesn't have to hold them.
      </div>
      <div style={{ font: "400 13px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)', paddingTop: 6 }}>
        Tap one to open it. Hold one to let it go.
      </div>
      <div
        className="spacer col"
        style={{ border: '1px dashed rgba(34,26,18,.25)', borderRadius: 24, padding: '22px 14px', gap: 14, marginTop: 16, alignItems: 'stretch', overflowY: 'auto' }}
      >
        {netItems.map((item, i) =>
          openItem === item ? (
            <div
              key={item}
              className="col"
              style={{ alignSelf: ALIGNS[i % ALIGNS.length], maxWidth: '88%', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.16)', borderRadius: 18, padding: '12px 16px', gap: 9, boxShadow: '0 8px 18px -12px rgba(34,26,18,.4)' }}
            >
              <div style={{ font: "600 13.5px/1.35 'Poppins',sans-serif" }}>{item}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {miniChip('Pulls me', DOT.ink, tag)}
                {miniChip('Dreading it', DOT.dread, tag)}
              </div>
            </div>
          ) : (
            <div key={item} className="col" style={{ alignSelf: ALIGNS[i % ALIGNS.length], maxWidth: '88%', gap: 5 }}>
              <button
                style={{
                  background: '#FFFDF6',
                  border: '1px solid rgba(34,26,18,.12)',
                  borderRadius: 999,
                  padding: '12px 17px',
                  font: "500 13px/1.3 'Poppins',sans-serif",
                  minHeight: 42,
                  boxShadow: holding === item ? '0 10px 20px -10px rgba(34,26,18,.45)' : 'none',
                  transform: holding === item ? 'translateY(-3px)' : 'none',
                  opacity: holding === item ? 0.85 : 1,
                  transition: 'transform 200ms ease, opacity 1200ms ease',
                }}
                onClick={() => setOpenItem(item)}
                onPointerDown={() => startHold(item)}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
              >
                {item}
              </button>
              {holding === item && (
                <div style={{ font: "400 11px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.4)', paddingLeft: 8 }}>Keep holding to let it go…</div>
              )}
            </div>
          ),
        )}
        {netItems.length === 0 && (
          <div className="subline" style={{ margin: 'auto', textAlign: 'center' }}>
            Nothing in the Net. Heads stay light.
          </div>
        )}
      </div>
      <div className="col" style={{ gap: 6, paddingTop: 16 }}>
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
        <button className="quiet" style={{ minHeight: 38 }} onClick={goHome}>
          Back home →
        </button>
      </div>
    </div>
  )
}

// The Stack (2g/3a) — one pile, four zoom levels. Strata accumulate
// bottom-up, widths varied, colors = source material; only block count and
// thickness change per tab. Week contains Day's blocks, Month contains
// Week's, Year contains Month's — the same items re-compressed. No numbers,
// no axes, no targets at any zoom. After dark the room follows the sky.

function hashId(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return Math.abs(h)
}

function jitterFor(id, div = 2) {
  return ((hashId(id) % 25) - 12) / div // div 2 → ±6%, div 4 → ±3%
}

// Deterministic older strata that extend the pile below the week.
const FILLER_MATS = ['sunset', 'bluegold', 'sunset', 'band', 'sunset', 'bluegold', 'band', 'sunset']

function filler(tag, count) {
  return Array.from({ length: count }, (_, i) => {
    const h = hashId(`${tag}-${i}`)
    return { id: `${tag}-${i}`, material: FILLER_MATS[h % FILLER_MATS.length], width: 58 + (h % 33) }
  })
}

// Day: today's landings only, thickest. Week: the built 2g reference.
// Month: re-compressed, ~half the frame. Year: 3a's thin book-spines.
const ZOOMS = {
  Day: { h: 34, gap: 8, r: 999, jitterDiv: 2 },
  Week: { h: 26, gap: 6, r: 999, jitterDiv: 2 },
  Month: { h: 14, gap: 4, r: 6, jitterDiv: 2 },
  Year: { h: 9, gap: 3, r: 3, jitterDiv: 4 },
}

export function Stack({ stack, night, goHome }) {
  const [tab, setTab] = useState('Week')

  // Top of the pile is the newest landing; fillers are older, so they sit below.
  const week = [...stack].reverse()
  const month = [...week, ...filler('month', 14)]
  const blocksByTab = {
    Day: [...stack.filter((b) => b.day === todayKey())].reverse(),
    Week: week,
    Month: month,
    Year: [...month, ...filler('year', 20)],
  }
  const zoom = ZOOMS[tab]
  const blocks = blocksByTab[tab]
  return (
    <div
      className="screen grain"
      style={{
        padding: '64px 24px 40px',
        ...(night ? { background: 'linear-gradient(180deg,#1B3A4A 0%,#221A12 100%)', color: '#FAF3E7' } : {}),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div className="eyebrow" style={{ color: night ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.45)' }}>
          The Stack
        </div>
        <div style={{ display: 'flex', background: night ? 'rgba(250,243,231,.12)' : '#FFFDF6', border: night ? '1px solid rgba(250,243,231,.15)' : '1px solid rgba(34,26,18,.12)', borderRadius: 999, padding: 3, gap: 2 }}>
          {['Day', 'Week', 'Month', 'Year'].map((t) => {
            const on = t === tab
            return (
              <button
                key={t}
                style={{
                  borderRadius: 999,
                  minHeight: 28,
                  padding: '0 11px',
                  font: "600 11px/1 'Poppins',sans-serif",
                  background: on ? '#221A12' : 'none',
                  color: on ? '#FAF3E7' : night ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.55)',
                }}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>
      <div style={{ font: "700 24px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em', paddingTop: 14 }}>
        {tab === 'Day' ? 'Today' : `The ${tab.toLowerCase()}`}, stacking up.
      </div>
      <div className="spacer col" style={{ justifyContent: 'flex-end', paddingTop: 20, overflow: 'hidden' }}>
        <div className="col" style={{ gap: zoom.gap, alignItems: 'center' }}>
          {blocks.map((b) => (
            <div
              key={b.id}
              className={`mat--${b.material}`}
              style={{
                width: `${Math.round(b.width * 0.72)}%`,
                height: zoom.h,
                borderRadius: zoom.r,
                transform: `translateX(${jitterFor(b.id, zoom.jitterDiv)}%)`,
                boxShadow: night ? 'none' : '0 3px 8px -4px rgba(34,26,18,.25)',
              }}
            />
          ))}
          {blocks.length === 0 && (
            <div style={{ font: "400 13px/1.4 'Poppins',sans-serif", color: night ? 'rgba(250,243,231,.5)' : 'rgba(34,26,18,.45)', paddingBottom: 20 }}>
              Nothing yet — the day is young.
            </div>
          )}
        </div>
      </div>
      <div className="col" style={{ gap: 10, paddingTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[
            ['linear-gradient(105deg,#F8B9A6,#F6C95C)', 'The One Thing'],
            ['linear-gradient(105deg,#2F7FA0,#F6C95C)', 'Pulls me'],
            ['linear-gradient(105deg,#7CA75F,#2E9B82,#2F7FA0)', 'Dreading it'],
          ].map(([bg, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: bg, flex: 'none' }} />
              <span style={{ font: "500 11px/1 'Poppins',sans-serif", color: night ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.55)' }}>{label}</span>
            </div>
          ))}
        </div>
        <button className={`quiet${night ? ' quiet--cream' : ''}`} style={{ minHeight: 38 }} onClick={goHome}>
          Back home →
        </button>
      </div>
    </div>
  )
}
