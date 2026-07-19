import React from 'react'
import { Avatar } from '../components.jsx'
import { dateHeadline, starsForToday, weekday } from '../state.js'

// Home — the daily wardrobe (canvas t14). Door grammar is fixed; the
// arrangement re-deals each day. Day: 14d tilted doors / 14h ribbons.
// Golden hour: 14n. Night: 14l moonlit stack / 14o starfield.

const DOOR_GRADS = {
  deep: 'linear-gradient(150deg,#F8B9A6,#F6C95C)',
  knockout: 'linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)',
  quests: 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)',
}

const NIGHT_GRADS = {
  deep: 'linear-gradient(150deg,#2F7FA0,#155A4E)',
  knockout: 'linear-gradient(150deg,#155A4E,#3D5C33)',
  quests: 'linear-gradient(150deg,#174D63,#2F7FA0 60%,#2E9B82 130%)',
}

const NAMES = { deep: 'Deep Work', knockout: 'Knockout Round', quests: 'Side Quests' }

function TopRow({ night, go }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 4 }}>
      <div className="wordmark" style={night ? { color: 'rgba(250,243,231,.45)', borderColor: 'rgba(250,243,231,.3)' } : undefined}>
        [ name ]
      </div>
      <button onClick={() => go('settings')} aria-label="Settings" style={{ padding: 6, margin: -6 }}>
        <Avatar size={32} />
      </button>
    </div>
  )
}

function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {starsForToday().map((s, i) => (
        <div
          key={i}
          style={{ position: 'absolute', left: s.left, top: s.top, width: s.size, height: s.size, borderRadius: '50%', background: `rgba(250,243,231,${s.opacity})` }}
        />
      ))}
    </div>
  )
}

export default function Home({ outfit, skyMode, go }) {
  if (skyMode === 'golden') return <GoldenHome go={go} />
  if (skyMode === 'night') return outfit.night === 'starfield' ? <StarfieldHome go={go} /> : <MoonlitHome go={go} />
  return outfit.day === 'ribbons' ? <RibbonsHome go={go} /> : <TiltedHome go={go} />
}

// 14d — tilted material doors, names only, Jen's cream door, dawn wash + sun glow.
function TiltedHome({ go }) {
  return (
    <div className="screen grain" style={{ background: 'linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 52%)', padding: '74px 20px 40px', gap: 20, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle,#F6C95C 0%,#F4A69B 62%,rgba(244,166,155,0) 72%)',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />
      <TopRow go={go} />
      <div style={{ textAlign: 'center', position: 'relative', paddingTop: 4 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>{dateHeadline()}</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)', marginTop: 6 }}>
          Pick a door. The rest is inside.
        </div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 13, position: 'relative' }}>
        <button className="door" style={{ background: DOOR_GRADS.deep, transform: 'rotate(-1.2deg)', boxShadow: '0 14px 26px -14px rgba(244,166,155,.9)' }} onClick={() => go('deep')}>
          <span className="door-name">Deep Work</span>
          <span className="door-arrow" style={{ background: 'rgba(255,253,246,.55)' }}>→</span>
        </button>
        <button className="door grain grain--band" style={{ background: DOOR_GRADS.knockout, transform: 'rotate(0.9deg)', boxShadow: '0 14px 26px -14px rgba(46,155,130,.8)', color: '#FAF3E7', overflow: 'hidden' }} onClick={() => go('knockout')}>
          <span className="door-name">Knockout Round</span>
          <span className="door-arrow" style={{ background: 'rgba(250,243,231,.22)' }}>→</span>
        </button>
        <button className="door" style={{ background: DOOR_GRADS.quests, transform: 'rotate(-0.7deg)', boxShadow: '0 14px 26px -14px rgba(47,127,160,.8)' }} onClick={() => go('quests')}>
          <span className="door-name">Side Quests</span>
          <span className="door-arrow" style={{ background: 'rgba(255,253,246,.55)' }}>→</span>
        </button>
        <button className="door" style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', transform: 'rotate(0.8deg)', boxShadow: '0 14px 26px -16px rgba(34,26,18,.35)' }} onClick={() => go('session')}>
          <Avatar size={44} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <span style={{ font: "700 18px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Focus call with Jen</span>
            <span style={{ font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>2:00</span>
          </span>
          <span className="door-arrow" style={{ background: 'rgba(34,26,18,.07)', color: 'rgba(34,26,18,.6)' }}>→</span>
        </button>
      </div>
      <button className="quiet" style={{ font: "500 13px/1 'Poppins',sans-serif", minHeight: 34 }} onClick={() => go('impossible')}>
        the impossible thing →
      </button>
      <button className="quiet" style={{ font: "500 13px/1 'Poppins',sans-serif", minHeight: 34 }} onClick={() => go('net')}>
        the Net's holding a few things →
      </button>
    </div>
  )
}

// 14h — ribbons: full-bleed nameless bands, unequal heights = the day's shape.
function RibbonsHome({ go }) {
  return (
    <div className="screen grain" style={{ padding: 0, background: '#FAF3E7', overflow: 'hidden' }}>
      <button
        className="col"
        style={{ flex: 2, background: 'linear-gradient(165deg,#FBE3CE 0%,#F8B9A6 72%,#F6C95C 120%)', position: 'relative', justifyContent: 'flex-end', padding: '74px 26px 34px' }}
        onClick={() => go('deep')}
      >
        <div style={{ position: 'absolute', top: 64, left: 26, right: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ font: "600 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>{dateHeadline().replace(/\.$/, '')}</div>
          <span
            role="button"
            style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFFDF6', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12px/1 'Poppins',sans-serif" }}
            onClick={(e) => {
              e.stopPropagation()
              go('settings')
            }}
          >
            J
          </span>
        </div>
        <div style={{ font: "700 40px/1.05 'Poppins',sans-serif", letterSpacing: '-.025em' }}>Deep Work →</div>
      </button>
      <button
        className="col"
        style={{ flex: 1.1, background: 'linear-gradient(165deg,#7CA75F -20%,#2E9B82 45%,#2F7FA0 105%)', justifyContent: 'center', padding: '24px 26px', color: '#FAF3E7', borderTop: '2px solid rgba(255,253,246,.5)' }}
        onClick={() => go('knockout')}
      >
        <div style={{ font: "700 25px/1.1 'Poppins',sans-serif", letterSpacing: '-.015em' }}>Knockout Round →</div>
      </button>
      <button
        className="col"
        style={{ flex: 0.75, background: 'linear-gradient(165deg,#2F7FA0,#8FC7E0 55%,#F6C95C 115%)', justifyContent: 'center', padding: '20px 26px', color: '#FFFDF6', borderTop: '2px solid rgba(255,253,246,.5)' }}
        onClick={() => go('quests')}
      >
        <div style={{ font: "700 19px/1.1 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Side Quests →</div>
      </button>
      <button
        style={{ flex: 0.85, background: 'linear-gradient(165deg,#FFFDF6 0%,#FAF3E7 100%)', display: 'flex', alignItems: 'center', gap: 12, padding: '20px 26px 34px', borderTop: '2px solid rgba(34,26,18,.1)' }}
        onClick={() => go('session')}
      >
        <Avatar size={38} />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          <span style={{ font: "700 17px/1.15 'Poppins',sans-serif" }}>Focus call with Jen →</span>
          <span style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>2:00</span>
        </span>
      </button>
    </div>
  )
}

// 14n — golden hour: the whole screen is the sunset gradient; doors go frosted.
function GoldenHome({ go }) {
  const glass = (bg, border, tilt) => ({
    background: bg,
    border: `1px solid ${border}`,
    backdropFilter: 'blur(6px)',
    transform: `rotate(${tilt}deg)`,
    minHeight: 100,
    color: '#FAF3E7',
  })
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#F4A69B 0%,#F6C95C 18%,#2F7FA0 52%,#174D63 100%)', color: '#FAF3E7', padding: '74px 20px 40px', gap: 18, overflow: 'hidden' }}>
      <TopRow go={go} />
      <div style={{ textAlign: 'center', paddingTop: 2 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em', color: '#221A12' }}>{weekday()}, golden hour.</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.65)', marginTop: 6 }}>One more good thing before dark.</div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'flex-end', gap: 13, paddingTop: 80 }}>
        <button className="door" style={glass('rgba(255,253,246,.16)', 'rgba(255,253,246,.35)', -1)} onClick={() => go('deep')}>
          <span className="door-name">Deep Work</span>
          <span className="door-arrow" style={{ background: 'rgba(255,253,246,.25)' }}>→</span>
        </button>
        <button className="door" style={glass('rgba(21,90,78,.55)', 'rgba(143,199,224,.35)', 0.8)} onClick={() => go('knockout')}>
          <span className="door-name">Knockout Round</span>
          <span className="door-arrow" style={{ background: 'rgba(250,243,231,.18)' }}>→</span>
        </button>
        <button className="door" style={glass('rgba(23,77,99,.6)', 'rgba(143,199,224,.3)', -0.6)} onClick={() => go('quests')}>
          <span className="door-name">Side Quests</span>
          <span className="door-arrow" style={{ background: 'rgba(250,243,231,.18)' }}>→</span>
        </button>
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.6)', font: "500 13px/1 'Poppins',sans-serif" }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}

// 14l — moonlit stack: tilted doors re-mixed in sea materials, names only.
function MoonlitHome({ go }) {
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#174D63 0%,#1B3A4A 45%,#221A12 110%)', color: '#FAF3E7', padding: '74px 20px 40px', gap: 20, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -90,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(250,243,231,.85) 0%,rgba(143,199,224,.4) 48%,rgba(143,199,224,0) 68%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <TopRow night go={go} />
      <div style={{ textAlign: 'center', position: 'relative', paddingTop: 4 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>{weekday()} night.</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(250,243,231,.6)', marginTop: 6 }}>The ocean's still up if you are.</div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 14, position: 'relative' }}>
        {['deep', 'knockout', 'quests'].map((key, i) => (
          <button
            key={key}
            className="door"
            style={{
              background: NIGHT_GRADS[key],
              borderRadius: 28,
              minHeight: 112,
              transform: `rotate(${[-1.4, 1, -0.7][i]}deg)`,
              boxShadow: '0 14px 30px -12px rgba(23,77,99,.9)',
              color: '#FAF3E7',
            }}
            onClick={() => go(key === 'quests' ? 'quests' : key)}
          >
            <span className="door-name">{NAMES[key]}</span>
            <span className="door-arrow" style={{ background: 'rgba(250,243,231,.16)' }}>→</span>
          </button>
        ))}
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.5)', font: "500 13px/1 'Poppins',sans-serif" }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}

// 14o — starfield: micro stars everywhere, doors as clean translucent glass.
function StarfieldHome({ go }) {
  const glass = (bg, border, tilt) => ({
    background: bg,
    border: `1px solid ${border}`,
    backdropFilter: 'blur(4px)',
    transform: `rotate(${tilt}deg)`,
    color: '#FAF3E7',
  })
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#221A12 0%,#174D63 62%,#1B3A4A 100%)', color: '#FAF3E7', padding: '74px 20px 40px', gap: 18, overflow: 'hidden' }}>
      <Stars />
      <TopRow night go={go} />
      <div style={{ textAlign: 'center', position: 'relative', paddingTop: 4, zIndex: 2 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>{weekday()} night.</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(250,243,231,.6)', marginTop: 6 }}>Clear skies. Everything can wait.</div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 13, position: 'relative', zIndex: 2 }}>
        <button className="door" style={glass('rgba(47,127,160,.22)', 'rgba(143,199,224,.35)', -1)} onClick={() => go('deep')}>
          <span className="door-name">Deep Work →</span>
        </button>
        <button className="door" style={glass('rgba(21,90,78,.3)', 'rgba(124,167,95,.4)', 0.8)} onClick={() => go('knockout')}>
          <span className="door-name">Knockout Round →</span>
        </button>
        <button className="door" style={glass('rgba(23,77,99,.3)', 'rgba(143,199,224,.3)', -0.6)} onClick={() => go('quests')}>
          <span className="door-name">Side Quests →</span>
        </button>
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.5)', font: "500 13px/1 'Poppins',sans-serif", zIndex: 2 }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}
