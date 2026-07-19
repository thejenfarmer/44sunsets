import React, { useState } from 'react'
import { Pill, QuietExit } from '../components.jsx'
import { DEMO } from '../state.js'
import { WriteIn } from './DeepFocus.jsx'

// The impossible thing (canvas 16b):
// ① pick the monster → ①b switch → ② sign off on the break →
// ③ tag each piece (tagging never blocks) → ④ the smallest piece →
// ⑤ it lands on the Stack (handled by App) → ⑥ the chain.

export default function Impossible({ onPieceDone, goHome, chainStep }) {
  const [step, setStep] = useState(chainStep ? 'piece' : 'pick')
  const [thing, setThing] = useState(DEMO.impossibleThing)
  const [pieces, setPieces] = useState(DEMO.pieces.map((text) => ({ text, tag: 'untagged' })))
  const [tagIndex, setTagIndex] = useState(0)
  const [pieceIndex, setPieceIndex] = useState(chainStep ? chainStep.pieceIndex : 0)

  if (step === 'pick') {
    return (
      <div className="screen">
        <p className="eyebrow">Sitting heaviest</p>
        <div className="spacer" style={{ minHeight: 28 }} />
        <div className="card card--slab" style={{ padding: '36px 26px' }}>
          <h1 className="headline">{thing}</h1>
        </div>
        <button className="quiet-exit" style={{ marginTop: 14 }} onClick={() => setStep('switch')}>
          ⇄ Work on something else
        </button>
        <div className="spacer" />
        <Pill onClick={() => setStep('signoff')}>⚒ Break this one</Pill>
        <QuietExit onClick={goHome}>back home … →</QuietExit>
      </div>
    )
  }

  if (step === 'switch') {
    const pick = (t) => {
      setThing(t)
      setStep('pick')
    }
    return (
      <div className="screen">
        <p className="eyebrow">Sitting heaviest</p>
        <h1 className="headline" style={{ marginTop: 10 }}>
          Work on something else
        </h1>
        <div className="spacer" style={{ minHeight: 24 }} />
        <div className="stack-gap-12">
          {DEMO.impossibleAlternates.map((alt) => (
            <button key={alt} className="card" style={{ width: '100%', fontSize: 16 }} onClick={() => pick(alt)}>
              {alt}
            </button>
          ))}
          <WriteIn onSubmit={pick} />
        </div>
        <div className="spacer" />
        <QuietExit onClick={() => setStep('pick')}>never mind … →</QuietExit>
      </div>
    )
  }

  if (step === 'signoff') {
    return (
      <div className="screen">
        <div className="card card--slab" style={{ padding: '24px 22px' }}>
          <p className="eyebrow">Sitting heaviest</p>
          <h1 className="headline" style={{ marginTop: 8, fontSize: 22 }}>
            {thing}
          </h1>
        </div>
        <div className="stack-gap-8" style={{ marginTop: 18, paddingLeft: 18 }}>
          {pieces.map((p, i) => (
            <div
              key={p.text}
              className="card"
              style={{ padding: '12px 16px', fontSize: 14, opacity: 1 - i * 0.08 }}
            >
              {p.text}
            </div>
          ))}
        </div>
        <div className="spacer" style={{ minHeight: 24 }} />
        <Pill onClick={() => setStep('tag')}>Yes, break it apart</Pill>
        <QuietExit onClick={() => setStep('pick')}>not today … →</QuietExit>
      </div>
    )
  }

  if (step === 'tag') {
    const piece = pieces[tagIndex]
    const tagAndAdvance = (tag) => {
      setPieces((ps) => ps.map((p, i) => (i === tagIndex ? { ...p, tag } : p)))
      if (tagIndex + 1 >= pieces.length) setStep('piece')
      else setTagIndex(tagIndex + 1)
    }
    return (
      <div className="screen">
        <p className="eyebrow">The pieces</p>
        <h1 className="headline" style={{ marginTop: 10, fontSize: 24 }}>
          How does each one feel?
        </h1>
        <div className="spacer" style={{ minHeight: 28 }} />
        <div className="card" style={{ padding: '30px 24px' }}>
          <p style={{ fontSize: 18, fontWeight: 500 }}>{piece.text}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <button className="chip" onClick={() => tagAndAdvance('pulls')}>
              Pulls me
            </button>
            <button className="chip" onClick={() => tagAndAdvance('dread')}>
              Dreading it
            </button>
          </div>
        </div>
        <QuietExit onClick={() => tagAndAdvance('skipped')}>skip →</QuietExit>
        <div className="spacer" />
      </div>
    )
  }

  // ④ the smallest piece (also the chain's next piece)
  const piece = pieces[pieceIndex]
  if (!piece) {
    goHome()
    return null
  }
  return (
    <div className="screen">
      <p className="eyebrow">{pieceIndex === 0 ? 'The smallest piece' : 'The next piece'}</p>
      <div className="spacer" style={{ minHeight: 36 }} />
      <div className="card card--sunset" style={{ padding: '38px 26px' }}>
        <h1 className="headline" style={{ fontSize: 24 }}>
          {piece.text}
        </h1>
      </div>
      <div className="spacer" />
      <Pill onClick={() => onPieceDone(piece.text, pieceIndex)}>Mark it complete</Pill>
      <QuietExit onClick={goHome}>Not today →</QuietExit>
    </div>
  )
}
