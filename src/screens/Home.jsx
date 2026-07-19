import React from 'react'
import { Stars } from '../components.jsx'
import { dateHeadline, dayFraction } from '../state.js'

const DOOR_META = {
  deep: { name: 'Deep Work', hint: 'The One Thing', material: 'sunset' },
  knockout: { name: 'Knockout Round', hint: 'Twenty small minutes', material: 'band' },
  quests: { name: 'Side Quests', hint: 'Three worth doing', material: 'bluegold' },
}

const DOOR_SCREEN = { deep: 'deep', knockout: 'knockout', quests: 'quests' }

export default function Home({ outfit, skyMode, netItems, go }) {
  const night = skyMode === 'night'
  return (
    <div className={`screen${night ? ' screen--night' : ''}`} style={{ position: 'relative' }}>
      {night && <Stars />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="eyebrow">{night ? 'Tonight' : skyMode === 'golden' ? 'Golden hour' : 'Today'}</p>
          <h1 className="headline" style={{ marginTop: 8 }}>
            {dateHeadline()}
          </h1>
        </div>
        <button
          className="quiet-exit"
          style={{ width: 'auto', minHeight: 44, padding: '0 4px' }}
          onClick={() => go('settings')}
          aria-label="Settings"
        >
          ⚙
        </button>
      </div>

      <div style={{ margin: '18px 2px 0' }}>
        <div className="daybar" style={night ? { opacity: 0.5 } : undefined}>
          <div className="daybar__now" style={{ left: `${dayFraction() * 100}%` }} />
        </div>
      </div>

      <div className="spacer" style={{ minHeight: 20 }} />

      <div className="stack-gap-16">
        {outfit.order.map((key, i) => {
          const meta = DOOR_META[key]
          return (
            <button
              key={key}
              className={`door door--${night ? 'night' : meta.material}`}
              style={{ transform: `rotate(${outfit.tilts[i]}deg)` }}
              onClick={() => go(DOOR_SCREEN[key])}
            >
              <span className="door__name">{meta.name}</span>
              {!night && <span className="door__hint">{meta.hint}</span>}
            </button>
          )
        })}
      </div>

      <div className="spacer" style={{ minHeight: 28 }} />

      <button className="quiet-exit" onClick={() => go('impossible')}>
        something's sitting heavy … →
      </button>
      <button className="quiet-exit" onClick={() => go('net')}>
        {netItems.length > 0 ? 'the Net caught a few things … →' : 'the Net is quiet … →'}
      </button>
      <button className="quiet-exit" onClick={() => go('stack')}>
        the Stack … →
      </button>
      <button className="quiet-exit" onClick={() => go('session')}>
        a sit-down with Jen is on the books … →
      </button>
    </div>
  )
}
