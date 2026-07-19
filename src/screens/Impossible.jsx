import React, { useState } from 'react'
import { Head, Landing } from '../components.jsx'
import { DEMO } from '../state.js'
import { WriteIn } from './DeepFocus.jsx'

// The impossible thing (canvas 16b): ① pick the monster → ①b switch →
// ② sign off on the break → ③ tag each piece (never blocks) → ④ the smallest
// piece → ⑤ it lands on the Stack → ⑥ the chain (next piece, or leave).

const DOT = {
  pulls: 'linear-gradient(105deg,#2F7FA0,#F6C95C)',
  dread: 'linear-gradient(105deg,#7CA75F,#2E9B82,#2F7FA0)',
  ink: '#221A12',
}

export default function Impossible({ onPieceDone, goHome, stack, landing }) {
  const [step, setStep] = useState('pick')
  const [thing, setThing] = useState(DEMO.impossibleThing)
  const [pieces, setPieces] = useState(DEMO.pieces.map((text) => ({ text, tag: null })))
  const [pieceIndex, setPieceIndex] = useState(DEMO.pieces.length - 1)
  const [doneCount, setDoneCount] = useState(0)

  const piece = pieces[pieceIndex]

  if (step === 'pick') {
    return (
      <div className="screen bg-impossible grain">
        <Head eyebrow="The Impossible Thing" headline="What feels impossible?" sub="We'll break it into pieces you can pick up." />
        <div className="spacer col" style={{ alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div className="hero-card hero-card--slab">
            <div className="hero-eyebrow">SITTING HEAVIEST</div>
            <div className="hero-title">{thing}</div>
          </div>
          <button className="switch-pill" onClick={() => setStep('switch')}>
            ⇄&nbsp; Something else
          </button>
        </div>
        <div className="col" style={{ gap: 10 }}>
          <button className="pill" style={{ font: "600 15px/1 'Poppins',sans-serif" }} onClick={() => setStep('signoff')}>
            ⚒&nbsp; Break this one
          </button>
          <button className="quiet" onClick={goHome}>
            Not today →
          </button>
        </div>
      </div>
    )
  }

  if (step === 'switch') {
    const pick = (t) => {
      setThing(t)
      setStep('pick')
    }
    return (
      <div className="screen bg-impossible grain">
        <Head eyebrow="The Impossible Thing" headline="Pick something else." sub="The other things that have been circling." />
        <div className="spacer col" style={{ justifyContent: 'center', gap: 12 }}>
          {DEMO.impossibleAlternates.map((alt) => (
            <button key={alt} className="option-card" onClick={() => pick(alt)}>
              {alt}
            </button>
          ))}
          <WriteIn placeholder="Write in what's on your mind." onSubmit={pick} />
        </div>
        <button className="quiet" style={{ fontSize: 14 }} onClick={() => setStep('pick')}>
          {thing === DEMO.impossibleThing ? '← back to the insurance' : '← back to it'}
        </button>
      </div>
    )
  }

  if (step === 'signoff') {
    // The break: dark slab on top, pieces descending, each visibly narrower,
    // the smallest outlined and labeled START HERE.
    const widths = [100, 88, 76, 64]
    return (
      <div className="screen bg-impossible grain">
        <Head eyebrow="The Impossible Thing" headline="Here's one way to break it." sub={<span>Making it smaller <i>is</i> the work.</span>} />
        <div className="spacer col" style={{ justifyContent: 'center', gap: 10, paddingTop: 18 }}>
          <div style={{ background: '#221A12', color: '#FAF3E7', borderRadius: 18, padding: '18px 20px', font: "700 18px/1.35 'Poppins',sans-serif", letterSpacing: '-.01em', boxShadow: '0 12px 26px -14px rgba(34,26,18,.6)' }}>
            {thing}
          </div>
          <div style={{ textAlign: 'center', font: "500 12px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.4)', padding: '2px 0' }}>⚒ breaks into ↓</div>
          {pieces.map((p, i) =>
            i < pieces.length - 1 ? (
              <div key={p.text} style={{ width: `${widths[i]}%`, background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 14, padding: '13px 16px', font: "500 14px/1.4 'Poppins',sans-serif", boxShadow: '0 6px 14px -12px rgba(34,26,18,.4)' }}>
                {p.text}
              </div>
            ) : (
              <div key={p.text} style={{ width: `${widths[i]}%`, background: '#FFFDF6', border: '1.5px solid rgba(34,26,18,.35)', borderRadius: 14, padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 8px 18px -12px rgba(34,26,18,.5)' }}>
                <div style={{ font: "600 14px/1.4 'Poppins',sans-serif" }}>{p.text}</div>
                <div style={{ font: "600 10.5px/1 'Poppins',sans-serif", letterSpacing: '.12em', color: 'rgba(34,26,18,.45)' }}>START HERE — SMALLEST</div>
              </div>
            ),
          )}
          <div style={{ font: "400 12.5px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', textAlign: 'center', paddingTop: 6 }}>Tap any step to rewrite it.</div>
        </div>
        <div className="col" style={{ gap: 10, paddingTop: 14 }}>
          <button className="pill" onClick={() => setStep('tag')}>
            Yes, break it apart
          </button>
          <button className="quiet" onClick={() => setStep('switch')}>
            Pick something else to break apart instead →
          </button>
        </div>
      </div>
    )
  }

  if (step === 'tag') {
    // ③ Tag each piece — tagged steps dim with their material dot; the first
    // step is exempt (dashed — it stays here). Tagging never blocks.
    const untaggedIdx = pieces.findIndex((p, i) => i < pieces.length - 1 && p.tag === null)
    const activeIdx = untaggedIdx === -1 ? -1 : Math.max(untaggedIdx, 0)
    const tagAndAdvance = (tag) => {
      const next = pieces.map((p, i) => (i === activeIdx ? { ...p, tag } : p))
      setPieces(next)
      if (!next.some((p, i) => i < next.length - 1 && p.tag === null)) setStep('piece')
    }
    return (
      <div className="screen bg-impossible grain">
        <Head eyebrow="The Impossible Thing" headline="How does each piece feel?" sub="Tag it, and it leaves the bench." />
        <div style={{ font: "500 13px/1.35 'Poppins',sans-serif", textAlign: 'center', padding: '16px 20px 8px', color: 'rgba(34,26,18,.4)', textDecoration: 'line-through rgba(34,26,18,.3)' }}>
          {thing}
        </div>
        <div className="spacer col" style={{ justifyContent: 'center', gap: 10 }}>
          {pieces.map((p, i) => {
            const isFirstStep = i === pieces.length - 1
            if (isFirstStep) {
              return (
                <div key={p.text} style={{ background: '#FFFDF6', border: '1px dashed rgba(34,26,18,.25)', borderRadius: 14, padding: '13px 16px', display: 'flex', flexDirection: 'column', gap: 3, opacity: 0.8 }}>
                  <div style={{ font: "500 14px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.7)' }}>{p.text}</div>
                  <div style={{ font: "500 10.5px/1 'Poppins',sans-serif", letterSpacing: '.12em', color: 'rgba(34,26,18,.4)' }}>STAYS HERE — YOUR FIRST STEP</div>
                </div>
              )
            }
            if (i === activeIdx) {
              return (
                <div key={p.text} style={{ background: '#FFFDF6', border: '1.5px solid rgba(34,26,18,.3)', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 10px 22px -14px rgba(34,26,18,.5)' }}>
                  <div style={{ font: "600 15px/1.4 'Poppins',sans-serif" }}>{p.text}</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <button className="chip" onClick={() => tagAndAdvance('pulls')}>
                      <span className="chip-dot" style={{ background: DOT.ink }} />
                      Pulls me
                    </button>
                    <button className="chip" onClick={() => tagAndAdvance('dread')}>
                      <span className="chip-dot" style={{ background: DOT.dread }} />
                      Dreading it
                    </button>
                    <button style={{ flex: 1, textAlign: 'right', font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', minHeight: 44 }} onClick={() => tagAndAdvance('skipped')}>
                      skip →
                    </button>
                  </div>
                </div>
              )
            }
            return (
              <div key={p.text} style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.10)', borderRadius: 14, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10, opacity: p.tag ? 0.55 : 0.75 }}>
                {p.tag && p.tag !== 'skipped' && <span style={{ flex: 'none', width: 10, height: 10, borderRadius: '50%', background: p.tag === 'pulls' ? DOT.pulls : DOT.dread }} />}
                <div style={{ flex: 1, font: "500 14px/1.4 'Poppins',sans-serif" }}>{p.text}</div>
              </div>
            )
          })}
        </div>
        <button className="quiet" style={{ paddingTop: 16 }} onClick={() => setStep('piece')}>
          Skip the rest — done for now →
        </button>
      </div>
    )
  }

  if (step === 'landed') {
    return (
      <Landing
        eyebrow="The Impossible Thing"
        bgClass="bg-impossible"
        headline="The piece is on the Stack."
        stack={stack}
        landing={landing}
        exit={pieceIndex >= 0 ? 'on to the next piece, or leave →' : 'Back home →'}
        onExit={() => (pieceIndex >= 0 ? setStep('chain') : goHome())}
      />
    )
  }

  if (step === 'chain') {
    // ⑥ One question: bring in the next piece, or leave. Remaining keep tags.
    const nextPiece = pieces[pieceIndex]
    return (
      <div className="screen bg-impossible grain">
        <Head eyebrow="The Impossible Thing" headline="One piece down." sub="The monster just got smaller." />
        <div className="spacer col" style={{ justifyContent: 'center', gap: 14 }}>
          <div style={{ textAlign: 'center', font: "500 14px/1.4 'Poppins',sans-serif", color: 'rgba(34,26,18,.45)', textDecoration: 'line-through rgba(34,26,18,.35)' }}>
            {pieces[pieceIndex + 1] ? pieces[pieceIndex + 1].text : ''}
          </div>
          <div style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 24, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center', boxShadow: '0 12px 26px -16px rgba(34,26,18,.45)' }}>
            <div style={{ font: "600 10.5px/1 'Poppins',sans-serif", letterSpacing: '.14em', color: 'rgba(34,26,18,.45)' }}>NEXT PIECE</div>
            <div style={{ font: "700 22px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em' }}>{nextPiece.text}</div>
          </div>
        </div>
        <div className="col" style={{ gap: 12 }}>
          <button className="pill" onClick={() => setStep('piece')}>
            Yes, let's start this.
          </button>
          <button className="quiet" onClick={goHome}>
            Not today →
          </button>
        </div>
      </div>
    )
  }

  // ④ The door ends on the smallest piece (and each chained next piece).
  return (
    <div className="screen bg-impossible grain" style={{ paddingBottom: 44 }}>
      <Head
        eyebrow="The Impossible Thing"
        headline={doneCount === 0 ? "Here's the first move" : 'The next piece'}
        sub={doneCount === 0 ? 'Small enough to do before you leave.' : 'Same size as the last one felt.'}
      />
      <div className="spacer col" style={{ justifyContent: 'center', gap: 18 }}>
        <div style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 24, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center', boxShadow: '0 12px 26px -16px rgba(34,26,18,.45)' }}>
          <div style={{ font: "700 25px/1.3 'Poppins',sans-serif", letterSpacing: '-.01em' }}>{piece.text}</div>
          <button
            className="pill"
            onClick={() => {
              onPieceDone()
              setDoneCount(doneCount + 1)
              setPieceIndex(pieceIndex - 1)
              setStep('landed')
            }}
          >
            Mark it complete
          </button>
          <button className="quiet" style={{ minHeight: 0 }} onClick={goHome}>
            Not yet →
          </button>
        </div>
      </div>
    </div>
  )
}
