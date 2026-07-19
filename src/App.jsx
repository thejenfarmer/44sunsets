import React, { useRef, useState } from 'react'
import Home from './screens/Home.jsx'
import DeepFocus from './screens/DeepFocus.jsx'
import Impossible from './screens/Impossible.jsx'
import Knockout from './screens/Knockout.jsx'
import SideQuests from './screens/SideQuests.jsx'
import Session from './screens/Session.jsx'
import Settings from './screens/Settings.jsx'
import InviteSheet from './screens/InviteSheet.jsx'
import { Net, Stack } from './screens/NetStack.jsx'
import { Pill, StackLanding } from './components.jsx'
import { DEMO, loadPersisted, outfitForToday, persist, skyModeNow, stackBlock, PINNED_OUTFIT_INDEX } from './state.js'

export default function App() {
  const saved = useRef(loadPersisted()).current

  const [screen, setScreen] = useState('home')
  const [stack, setStack] = useState(saved.stack || [])
  const [netItems, setNetItems] = useState(saved.netItems || DEMO.netItems)
  const [quests, setQuests] = useState(saved.quests || DEMO.sideQuests)
  const [selectedQuest, setSelectedQuest] = useState((saved.quests || DEMO.sideQuests)[0] || null)
  const [pinnedLayout, setPinnedLayoutState] = useState(saved.pinnedLayout ?? false)
  const [focusItem, setFocusItem] = useState(DEMO.focusItem)

  // Landing state: what just dropped onto the Stack, and what the room says.
  const [landing, setLanding] = useState(null)
  const [chainStep, setChainStep] = useState(null)

  // Invite + mocked presence (Jen arrives on a timer after the invite goes out)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [presence, setPresence] = useState({ companion: null, label: null, live: false })
  const afterSendRef = useRef(null)

  const skyMode = skyModeNow()
  const outfit = outfitForToday(pinnedLayout ? PINNED_OUTFIT_INDEX : null)

  const goHome = () => {
    setLanding(null)
    setChainStep(null)
    setScreen('home')
  }

  const setPinnedLayout = (pin) => {
    setPinnedLayoutState(pin)
    persist({ pinnedLayout: pin })
  }

  const land = (label, material, message, opts = {}) => {
    const block = stackBlock(label, material)
    const nextStack = [...stack, block]
    setStack(nextStack)
    persist({ stack: nextStack })
    setLanding({ message, landingId: block.id, ...opts })
    setScreen('landing')
  }

  const openInvite = (afterSend) => {
    afterSendRef.current = afterSend || null
    setInviteOpen(true)
  }

  const sendInvite = (invite) => {
    setInviteOpen(false) // sheets drop on action
    // Mock: Jen accepts and sits down a few moments later.
    setTimeout(() => {
      setPresence({ companion: DEMO.jen.name, label: DEMO.jen.oneLiner, live: true })
    }, 6000)
    if (afterSendRef.current) {
      const cb = afterSendRef.current
      afterSendRef.current = null
      cb(invite)
    }
  }

  const addNetItem = (text) => {
    const next = [{ text, when: 'just now' }, ...netItems]
    setNetItems(next)
    persist({ netItems: next })
  }

  const questDone = (quest) => {
    const remaining = quests.filter((q) => q !== quest)
    setQuests(remaining)
    persist({ quests: remaining })
    setSelectedQuest(remaining[0] || null)
    land(quest, 'bluegold', 'Things are stacking up.', {
      extra:
        remaining.length > 0 ? (
          <button className="quiet-exit" onClick={() => setScreen('quests')} style={{ marginTop: 16 }}>
            back to side quests … →
          </button>
        ) : null,
    })
  }

  const pieceDone = (pieceText, pieceIndex) => {
    const nextIndex = pieceIndex + 1
    const hasNext = nextIndex < DEMO.pieces.length
    land(pieceText, 'slab', 'Things are stacking up.', {
      subline: hasNext ? 'The next piece is ready when you are.' : 'That was the last piece.',
      extra: hasNext ? (
        <div style={{ marginTop: 20 }}>
          <Pill
            onClick={() => {
              setChainStep({ pieceIndex: nextIndex })
              setLanding(null)
              setScreen('impossible')
            }}
          >
            Yes, let's start this.
          </Pill>
        </div>
      ) : null,
      exitLabel: hasNext ? 'Not today →' : undefined,
    })
  }

  let body
  if (screen === 'home') {
    body = <Home outfit={outfit} skyMode={skyMode} netItems={netItems} go={setScreen} />
  } else if (screen === 'deep') {
    body = (
      <DeepFocus
        focusItem={focusItem}
        setFocusItem={setFocusItem}
        presence={presence}
        openInvite={openInvite}
        goHome={goHome}
        onComplete={() => land(focusItem, 'sunset', 'Things are stacking up.')}
      />
    )
  } else if (screen === 'impossible') {
    body = <Impossible chainStep={chainStep} onPieceDone={pieceDone} goHome={goHome} />
  } else if (screen === 'knockout') {
    body = (
      <Knockout
        openInvite={openInvite}
        goHome={goHome}
        onWin={() => land('Knockout Round', 'band', 'Things are stacking up.')}
      />
    )
  } else if (screen === 'quests') {
    body = (
      <SideQuests
        quests={quests}
        selected={selectedQuest}
        setSelected={setSelectedQuest}
        onDone={questDone}
        goHome={goHome}
      />
    )
  } else if (screen === 'session') {
    body = (
      <Session
        focusItem={focusItem}
        goHome={goHome}
        onComplete={() =>
          land(focusItem, 'sunset', 'Things are stacking up.', {
            subline: "Jen's still at her desk.",
          })
        }
      />
    )
  } else if (screen === 'settings') {
    body = <Settings pinnedLayout={pinnedLayout} setPinnedLayout={setPinnedLayout} goHome={goHome} />
  } else if (screen === 'net') {
    body = <Net netItems={netItems} addNetItem={addNetItem} goHome={goHome} />
  } else if (screen === 'stack') {
    body = <Stack stack={stack} goHome={goHome} />
  } else if (screen === 'landing' && landing) {
    body = (
      <StackLanding
        message={landing.message}
        subline={landing.subline}
        blocks={stack}
        landingId={landing.landingId}
        extra={landing.extra}
        exitLabel={landing.exitLabel}
        onHome={goHome}
      />
    )
  } else {
    body = <Home outfit={outfit} skyMode={skyMode} netItems={netItems} go={setScreen} />
  }

  return (
    <div className="frame">
      <div className="app">
        {body}
        {inviteOpen && <InviteSheet onSend={sendInvite} onDismiss={() => setInviteOpen(false)} />}
      </div>
    </div>
  )
}
