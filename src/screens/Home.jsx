import React from 'react'
import { Avatar } from '../components.jsx'
import { dateHeadline, daySegments, starsForToday, weekday } from '../state.js'

// Home — the daily wardrobe (canvas t14 + updated handoff). FOUR doors:
// Deep Work / Knockout Round / Side Quests, plus a 4th slot — The Impossible
// Thing (dark slab) when no focus call is scheduled, the Scheduled session
// card when one is. A completed door comes forward wearing its done state;
// otherwise default order with the 4th slot at the back.

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

const NAMES = { deep: 'Deep Work', knockout: 'Knockout Round', quests: 'Side Quests', impossible: 'The Impossible Thing' }
const SCREENS = { deep: 'deep', knockout: 'knockout', quests: 'quests', impossible: 'impossible', session: 'session' }
const TILTS = [-1.2, 0.9, -0.7, 0.8]

// Completed doors come forward (most recent first); the rest keep default order.
function orderedDoors(completedDoors, fourth) {
  const defaults = ['deep', 'knockout', 'quests', fourth]
  const done = completedDoors.filter((d) => defaults.includes(d))
  return [...done, ...defaults.filter((d) => !done.includes(d))]
}

function DayBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '14px 26px 0', position: 'relative' }}>
      {daySegments().map((state, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderRadius: 999,
            height: state === 'spent' ? 6 : 16,
            background: state === 'spent' ? 'rgba(34,26,18,.15)' : state === 'active' ? '#F0B49C' : '#FFFDF6',
            border: state === 'ahead' ? '1.5px solid rgba(34,26,18,.15)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

// Done state (no reference frame; pinned spec): the card keeps its own
// material at ~55% opacity and its tilt; the → circle becomes a filled ✓
// circle in the rgba(250,243,231,.16) style; one quiet sub-line under the
// title. No line-through, no green, no badge.
const DONE_OPACITY = 0.55

function DoneMark() {
  return (
    <span className="door-arrow" style={{ background: 'rgba(250,243,231,.16)', font: "600 16px/1 'Poppins',sans-serif" }}>
      ✓
    </span>
  )
}

function DoneSub({ dark }) {
  return (
    <span style={{ display: 'block', font: "500 13px/1 'Poppins',sans-serif", color: dark ? 'rgba(250,243,231,.6)' : 'rgba(34,26,18,.55)', marginTop: 5 }}>
      Done today.
    </span>
  )
}

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

export default function Home({ outfit, skyMode, scheduledCall, completedDoors, go }) {
  const fourth = scheduledCall ? 'session' : 'impossible'
  const doors = orderedDoors(completedDoors, fourth)
  const isDone = (d) => completedDoors.includes(d)
  const props = { doors, isDone, scheduledCall, go }
  if (skyMode === 'golden') return <GoldenHome {...props} />
  if (skyMode === 'night') {
    if (outfit.night === 'starfield') return <StarfieldHome {...props} />
    if (outfit.night === 'nightribbons') return <NightRibbonsHome {...props} />
    return <MoonlitHome {...props} />
  }
  if (outfit.day === 'ribbons') return <RibbonsHome {...props} />
  if (outfit.day === 'marquee') return <MarqueeHome {...props} />
  return <TiltedHome {...props} />
}

// 14d — tilted material doors, names only, dawn wash + sun glow, day-shape bar.
function TiltedHome({ doors, isDone, scheduledCall, go }) {
  const renderDoor = (key, i) => {
    const tilt = TILTS[i % TILTS.length]
    const done = isDone(key)
    if (key === 'session') {
      return (
        <button key={key} className="door" style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', transform: `rotate(${tilt}deg)`, boxShadow: '0 14px 26px -16px rgba(34,26,18,.35)' }} onClick={() => go('session')}>
          <Avatar size={44} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <span style={{ font: "700 18px/1.2 'Poppins',sans-serif", letterSpacing: '-.01em' }}>Focus call with Jen</span>
            <span style={{ font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>{scheduledCall.time}</span>
          </span>
          <span className="door-arrow" style={{ background: 'rgba(34,26,18,.07)', color: 'rgba(34,26,18,.6)' }}>→</span>
        </button>
      )
    }
    if (key === 'impossible') {
      return (
        <button key={key} className="door" style={{ background: 'linear-gradient(150deg,#2F7FA0,#155A4E)', color: '#FAF3E7', borderRadius: 28, transform: `rotate(${tilt}deg)`, boxShadow: '0 14px 30px -12px rgba(23,77,99,.9)', opacity: done ? DONE_OPACITY : 1 }} onClick={() => go('impossible')}>
          <span style={{ flex: 1 }}>
            <span className="door-name" style={{ flex: 'none' }}>{NAMES.impossible}</span>
            {done && <DoneSub dark />}
          </span>
          {done ? <DoneMark /> : <span className="door-arrow" style={{ background: 'rgba(250,243,231,.16)' }}>→</span>}
        </button>
      )
    }
    const dark = key === 'knockout'
    return (
      <button
        key={key}
        className={`door${dark ? ' grain grain--band' : ''}`}
        style={{
          background: DOOR_GRADS[key],
          transform: `rotate(${tilt}deg)`,
          boxShadow: { deep: '0 14px 26px -14px rgba(244,166,155,.9)', knockout: '0 14px 26px -14px rgba(46,155,130,.8)', quests: '0 14px 26px -14px rgba(47,127,160,.8)' }[key],
          color: dark ? '#FAF3E7' : undefined,
          overflow: dark ? 'hidden' : undefined,
          opacity: done ? DONE_OPACITY : 1,
        }}
        onClick={() => go(SCREENS[key])}
      >
        <span style={{ flex: 1, position: 'relative' }}>
          <span className="door-name" style={{ flex: 'none' }}>{NAMES[key]}</span>
          {done && <DoneSub dark={dark} />}
        </span>
        {done ? <DoneMark /> : <span className="door-arrow" style={{ background: dark ? 'rgba(250,243,231,.22)' : 'rgba(255,253,246,.55)' }}>→</span>}
      </button>
    )
  }

  return (
    <div className="screen grain" style={{ background: 'linear-gradient(180deg,#FBE3CE 0%,#FAF3E7 52%)', padding: '74px 20px 40px', gap: 16, overflow: 'hidden' }}>
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
        <DayBar />
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 13, position: 'relative' }}>{doors.map(renderDoor)}</div>
      <button className="quiet" style={{ font: "500 13px/1 'Poppins',sans-serif", minHeight: 34 }} onClick={() => go('net')}>
        the Net's holding a few things →
      </button>
    </div>
  )
}

// 14h — ribbons: full-bleed nameless bands, unequal heights = the day's shape.
function RibbonsHome({ doors, isDone, scheduledCall, go }) {
  const BANDS = {
    deep: { flex: 2, grad: 'linear-gradient(165deg,#FBE3CE 0%,#F8B9A6 72%,#F6C95C 120%)', size: 40, color: '#221A12' },
    knockout: { flex: 1.1, grad: 'linear-gradient(165deg,#7CA75F -20%,#2E9B82 45%,#2F7FA0 105%)', size: 25, color: '#FAF3E7' },
    quests: { flex: 0.75, grad: 'linear-gradient(165deg,#2F7FA0,#8FC7E0 55%,#F6C95C 115%)', size: 19, color: '#FFFDF6' },
  }
  return (
    <div className="screen grain" style={{ padding: 0, background: '#FAF3E7', overflow: 'hidden' }}>
      {doors.map((key, i) => {
        const first = i === 0
        const done = isDone(key)
        if (key === 'session' || key === 'impossible') {
          const slab = key === 'impossible'
          return (
            <button
              key={key}
              style={{
                flex: 0.85,
                background: slab ? 'linear-gradient(150deg,#2F7FA0,#155A4E)' : 'linear-gradient(165deg,#FFFDF6 0%,#FAF3E7 100%)',
                color: slab ? '#FAF3E7' : undefined,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: first ? '74px 26px 24px' : '20px 26px 24px',
                borderTop: first ? 'none' : slab ? '2px solid rgba(143,199,224,.35)' : '2px solid rgba(34,26,18,.1)',
                opacity: done ? DONE_OPACITY : 1,
              }}
              onClick={() => go(SCREENS[key])}
            >
              {slab ? (
                <span style={{ font: "700 17px/1.15 'Poppins',sans-serif", flex: 1, textAlign: 'left' }}>
                  The Impossible Thing {done ? '' : '→'}
                  {done && <DoneSub dark />}
                </span>
              ) : (
                <>
                  <Avatar size={38} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, textAlign: 'left' }}>
                    <span style={{ font: "700 17px/1.15 'Poppins',sans-serif" }}>Focus call with Jen →</span>
                    <span style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.5)' }}>{scheduledCall.time}</span>
                  </span>
                </>
              )}
            </button>
          )
        }
        const b = BANDS[key]
        return (
          <button
            key={key}
            className="col"
            style={{
              flex: b.flex,
              background: b.grad,
              position: 'relative',
              justifyContent: first ? 'flex-end' : 'center',
              padding: first ? '74px 26px 34px' : '24px 26px',
              color: b.color,
              borderTop: first ? 'none' : '2px solid rgba(255,253,246,.5)',
              opacity: done ? DONE_OPACITY : 1,
            }}
            onClick={() => go(SCREENS[key])}
          >
            {first && (
              <div style={{ position: 'absolute', top: 64, left: 26, right: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ font: "600 12.5px/1 'Poppins',sans-serif", color: key === 'deep' ? 'rgba(34,26,18,.55)' : 'rgba(250,243,231,.7)' }}>
                  {dateHeadline().replace(/\.$/, '')}
                </div>
                <span
                  role="button"
                  style={{ width: 30, height: 30, borderRadius: '50%', background: '#FFFDF6', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12px/1 'Poppins',sans-serif", color: '#221A12' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    go('settings')
                  }}
                >
                  J
                </span>
              </div>
            )}
            <div style={{ font: `700 ${first ? 40 : b.size}px/1.05 'Poppins',sans-serif`, letterSpacing: '-.02em', textAlign: 'left' }}>
              {NAMES[key]} {done ? '' : '→'}
              {done && <DoneSub dark={key !== 'deep'} />}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// 14f — marquee: the headliner fills the canvas; others peek in as edge tabs.
function MarqueeHome({ isDone, scheduledCall, go }) {
  return (
    <div className="screen grain" style={{ background: '#FAF3E7', padding: '74px 20px 40px', gap: 16, overflow: 'hidden' }}>
      <TopRow go={go} />
      <div style={{ textAlign: 'center', position: 'relative', paddingTop: 2, zIndex: 4 }}>
        <div style={{ font: "700 32px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>{dateHeadline()}</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.6)', marginTop: 6 }}>One door wide open. Three ajar.</div>
      </div>
      <div className="spacer" style={{ position: 'relative' }}>
        <button
          className="col"
          style={{
            position: 'absolute',
            inset: '14px 6px 14px 6px',
            background: 'linear-gradient(160deg,#FBE3CE 0%,#F8B9A6 55%,#F6C95C 115%)',
            borderRadius: 34,
            transform: 'rotate(-1deg)',
            boxShadow: '0 24px 44px -18px rgba(244,166,155,.95)',
            justifyContent: 'flex-end',
            gap: 12,
            padding: 28,
            zIndex: 2,
            opacity: isDone('deep') ? DONE_OPACITY : 1,
          }}
          onClick={() => go('deep')}
        >
          <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'radial-gradient(circle,#F6C95C 45%,rgba(246,201,92,0) 75%)', position: 'absolute', top: 26, right: 26 }} />
          <span style={{ font: "700 42px/1.05 'Poppins',sans-serif", letterSpacing: '-.025em' }}>
            Deep
            <br />
            Work
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 46, height: 46, borderRadius: '50%', background: isDone('deep') ? 'rgba(250,243,231,.16)' : 'rgba(255,253,246,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 19px/1 'Poppins',sans-serif" }}>
              {isDone('deep') ? '✓' : '→'}
            </span>
            <span style={{ font: "500 13px/1 'Poppins',sans-serif", color: 'rgba(34,26,18,.55)' }}>{isDone('deep') ? 'Done today.' : 'step in'}</span>
          </span>
        </button>
        <button
          style={{ position: 'absolute', right: -34, top: '20%', width: 76, height: 132, background: 'linear-gradient(150deg,#7CA75F,#2E9B82 52%,#2F7FA0)', borderRadius: 20, transform: 'rotate(-3deg)', boxShadow: '0 12px 22px -10px rgba(46,155,130,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, opacity: isDone('knockout') ? DONE_OPACITY : 1 }}
          onClick={() => go('knockout')}
        >
          <span style={{ font: "700 12.5px/1 'Poppins',sans-serif", letterSpacing: '.12em', color: '#FAF3E7', transform: 'rotate(90deg)', whiteSpace: 'nowrap' }}>
            {isDone('knockout') ? '✓ KNOCKOUT' : 'KNOCKOUT →'}
          </span>
        </button>
        <button
          style={{ position: 'absolute', left: -34, top: '52%', width: 76, height: 122, background: 'linear-gradient(150deg,#2F7FA0,#8FC7E0 55%,#F6C95C)', borderRadius: 20, transform: 'rotate(3deg)', boxShadow: '0 12px 22px -10px rgba(47,127,160,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, opacity: isDone('quests') ? DONE_OPACITY : 1 }}
          onClick={() => go('quests')}
        >
          <span style={{ font: "700 12.5px/1 'Poppins',sans-serif", letterSpacing: '.12em', color: '#221A12', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
            {isDone('quests') ? '✓ SIDE QUESTS' : '← SIDE QUESTS'}
          </span>
        </button>
        {scheduledCall ? (
          <button
            style={{ position: 'absolute', right: -24, bottom: '6%', width: 112, height: 64, background: '#FFFDF6', border: '1px solid rgba(34,26,18,.12)', borderRadius: 18, transform: 'rotate(-2deg)', boxShadow: '0 10px 20px -10px rgba(34,26,18,.4)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', zIndex: 3 }}
            onClick={() => go('session')}
          >
            <Avatar size={28} />
            <span style={{ font: "600 12px/1.25 'Poppins',sans-serif", color: 'rgba(34,26,18,.75)', textAlign: 'left' }}>
              Jen
              <br />
              <span style={{ fontWeight: 500, color: 'rgba(34,26,18,.5)' }}>{scheduledCall.time}</span>
            </span>
          </button>
        ) : (
          <button
            style={{ position: 'absolute', right: -24, bottom: '6%', width: 112, height: 64, background: 'linear-gradient(150deg,#2F7FA0,#155A4E)', borderRadius: 18, transform: 'rotate(-2deg)', boxShadow: '0 14px 30px -12px rgba(23,77,99,.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', zIndex: 3, opacity: isDone('impossible') ? DONE_OPACITY : 1 }}
            onClick={() => go('impossible')}
          >
            <span style={{ font: "600 11px/1.35 'Poppins',sans-serif", color: '#FAF3E7', textAlign: 'left' }}>
              {isDone('impossible') ? '✓ ' : ''}The Impossible
              <br />
              Thing {isDone('impossible') ? '' : '→'}
            </span>
          </button>
        )}
      </div>
      <button className="quiet" style={{ font: "500 13px/1 'Poppins',sans-serif", zIndex: 4 }} onClick={() => go('net')}>
        the Net's holding a few things →
      </button>
    </div>
  )
}

// 14n — golden hour: the whole screen is the sunset gradient; doors go frosted.
function GoldenHome({ doors, isDone, go }) {
  const GLASS = {
    deep: ['rgba(255,253,246,.16)', 'rgba(255,253,246,.35)'],
    knockout: ['rgba(21,90,78,.55)', 'rgba(143,199,224,.35)'],
    quests: ['rgba(23,77,99,.6)', 'rgba(143,199,224,.3)'],
    impossible: ['rgba(27,58,74,.6)', 'rgba(143,199,224,.3)'],
    session: ['rgba(255,253,246,.28)', 'rgba(255,253,246,.4)'],
  }
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#F4A69B 0%,#F6C95C 18%,#2F7FA0 52%,#174D63 100%)', color: '#FAF3E7', padding: '74px 20px 40px', gap: 18, overflow: 'hidden' }}>
      <TopRow go={go} />
      <div style={{ textAlign: 'center', paddingTop: 2 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em', color: '#221A12' }}>{weekday()}, golden hour.</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(34,26,18,.65)', marginTop: 6 }}>One more good thing before dark.</div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'flex-end', gap: 13, paddingTop: 60 }}>
        {doors.slice(0, 3).map((key, i) => {
          const [bg, border] = GLASS[key] || GLASS.deep
          const done = isDone(key)
          return (
            <button
              key={key}
              className="door"
              style={{ background: bg, border: `1px solid ${border}`, backdropFilter: 'blur(6px)', transform: `rotate(${[-1, 0.8, -0.6][i]}deg)`, minHeight: 100, color: '#FAF3E7', opacity: done ? DONE_OPACITY : 1 }}
              onClick={() => go(SCREENS[key] || 'deep')}
            >
              <span style={{ flex: 1 }}>
                <span className="door-name" style={{ flex: 'none' }}>{key === 'session' ? 'Focus call with Jen' : NAMES[key]}</span>
                {done && <DoneSub dark />}
              </span>
              <span className="door-arrow" style={{ background: done ? 'rgba(250,243,231,.16)' : 'rgba(250,243,231,.18)' }}>{done ? '✓' : '→'}</span>
            </button>
          )
        })}
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.6)', font: "500 13px/1 'Poppins',sans-serif" }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}

// 14l — moonlit stack: tilted doors re-mixed in sea materials, names only.
function MoonlitHome({ doors, isDone, go }) {
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
        {doors
          .filter((d) => NIGHT_GRADS[d])
          .map((key, i) => {
            const done = isDone(key)
            return (
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
                  opacity: done ? DONE_OPACITY : 1,
                }}
                onClick={() => go(SCREENS[key])}
              >
                <span style={{ flex: 1 }}>
                  <span className="door-name" style={{ flex: 'none' }}>{NAMES[key]}</span>
                  {done && <DoneSub dark />}
                </span>
                <span className="door-arrow" style={{ background: 'rgba(250,243,231,.16)' }}>{done ? '✓' : '→'}</span>
              </button>
            )
          })}
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.5)', font: "500 13px/1 'Poppins',sans-serif" }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}

// 14m — night ribbons: near-black sky band with micro stars; at night the
// scheduled human is a promise, not a prompt.
function NightRibbonsHome({ doors, isDone, scheduledCall, go }) {
  const BANDS = {
    deep: { flex: 1.6, grad: 'linear-gradient(180deg,#221A12 0%,#174D63 70%,#2F7FA0 120%)', size: 38 },
    knockout: { flex: 1, grad: 'linear-gradient(165deg,#2F7FA0 -20%,#155A4E 55%,#2E9B82 130%)', size: 25 },
    quests: { flex: 0.75, grad: 'linear-gradient(165deg,#174D63,#2F7FA0 60%,#7CA75F 150%)', size: 19 },
  }
  return (
    <div className="screen grain" style={{ padding: 0, background: '#221A12', color: '#FAF3E7', overflow: 'hidden' }}>
      {doors.map((key, i) => {
        const first = i === 0
        const done = isDone(key)
        if (key === 'session' || key === 'impossible') {
          const slab = key === 'impossible'
          return (
            <button
              key={key}
              style={{ flex: 0.85, background: slab ? 'linear-gradient(150deg,#174D63,#1B3A4A)' : 'linear-gradient(165deg,#1B3A4A 0%,#221A12 100%)', display: 'flex', alignItems: 'center', gap: 12, padding: first ? '74px 26px 24px' : '20px 26px 34px', borderTop: first ? 'none' : slab ? '2px solid rgba(143,199,224,.35)' : '2px solid rgba(250,243,231,.15)', opacity: done ? 0.85 : 1 }}
              onClick={() => go(SCREENS[key])}
            >
              {slab ? (
                <span style={{ font: "700 17px/1.15 'Poppins',sans-serif", flex: 1, textAlign: 'left' }}>
                  {done ? '✓ ' : ''}The Impossible Thing →
                </span>
              ) : (
                <>
                  <Avatar size={38} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, textAlign: 'left' }}>
                    <span style={{ font: "700 17px/1.15 'Poppins',sans-serif" }}>Focus call with Jen →</span>
                    <span style={{ font: "500 12.5px/1 'Poppins',sans-serif", color: 'rgba(250,243,231,.5)' }}>tomorrow, 9:00</span>
                  </span>
                </>
              )}
            </button>
          )
        }
        const b = BANDS[key]
        return (
          <button
            key={key}
            className="col"
            style={{
              flex: b.flex,
              background: b.grad,
              position: 'relative',
              justifyContent: first ? 'flex-end' : 'center',
              padding: first ? '74px 26px 34px' : '24px 26px',
              borderTop: first ? 'none' : '2px solid rgba(143,199,224,.4)',
              opacity: done ? 0.88 : 1,
            }}
            onClick={() => go(SCREENS[key])}
          >
            {first && (
              <>
                <div style={{ position: 'absolute', top: 64, left: 26, right: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ font: "600 12.5px/1 'Poppins',sans-serif", color: 'rgba(250,243,231,.55)' }}>{weekday()} night</div>
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      go('settings')
                    }}
                  >
                    <Avatar size={30} />
                  </span>
                </div>
                <div style={{ position: 'absolute', top: 126, right: 44, width: 8, height: 8, borderRadius: '50%', background: 'rgba(250,243,231,.7)' }} />
                <div style={{ position: 'absolute', top: 96, left: 60, width: 5, height: 5, borderRadius: '50%', background: 'rgba(250,243,231,.55)' }} />
                <div style={{ position: 'absolute', top: 150, left: 120, width: 4, height: 4, borderRadius: '50%', background: 'rgba(250,243,231,.4)' }} />
              </>
            )}
            <div style={{ font: `700 ${first ? 38 : b.size}px/1.05 'Poppins',sans-serif`, letterSpacing: '-.02em', textAlign: 'left' }}>
              {done ? '✓ ' : ''}
              {NAMES[key]} →
            </div>
          </button>
        )
      })}
    </div>
  )
}

// 14o — starfield: micro stars everywhere, doors as clean translucent glass.
function StarfieldHome({ doors, isDone, go }) {
  const GLASS = {
    deep: ['rgba(47,127,160,.22)', 'rgba(143,199,224,.35)'],
    knockout: ['rgba(21,90,78,.3)', 'rgba(124,167,95,.4)'],
    quests: ['rgba(23,77,99,.3)', 'rgba(143,199,224,.3)'],
  }
  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#221A12 0%,#174D63 62%,#1B3A4A 100%)', color: '#FAF3E7', padding: '74px 20px 40px', gap: 18, overflow: 'hidden' }}>
      <Stars />
      <TopRow night go={go} />
      <div style={{ textAlign: 'center', position: 'relative', paddingTop: 4, zIndex: 2 }}>
        <div style={{ font: "700 34px/1.15 'Poppins',sans-serif", letterSpacing: '-.015em' }}>{weekday()} night.</div>
        <div style={{ font: "500 14px/1.45 'Poppins',sans-serif", color: 'rgba(250,243,231,.6)', marginTop: 6 }}>Clear skies. Everything can wait.</div>
      </div>
      <div className="spacer col" style={{ justifyContent: 'center', gap: 13, position: 'relative', zIndex: 2 }}>
        {doors
          .filter((d) => GLASS[d])
          .map((key, i) => {
            const [bg, border] = GLASS[key]
            const done = isDone(key)
            return (
              <button
                key={key}
                className="door"
                style={{ background: bg, border: `1px solid ${border}`, backdropFilter: 'blur(4px)', transform: `rotate(${[-1, 0.8, -0.6][i]}deg)`, color: '#FAF3E7', opacity: done ? DONE_OPACITY : 1 }}
                onClick={() => go(SCREENS[key])}
              >
                <span className="door-name">
                  {NAMES[key]} {done ? '' : '→'}
                  {done && <DoneSub dark />}
                </span>
              </button>
            )
          })}
      </div>
      <button className="quiet" style={{ color: 'rgba(250,243,231,.5)', font: "500 13px/1 'Poppins',sans-serif", zIndex: 2 }} onClick={() => go('stack')}>
        close the day →
      </button>
    </div>
  )
}
