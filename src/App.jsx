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
import { DEMO, loadPersisted, outfitForToday, outfitOverride, persist, seedStack, skyModeNow, stackBlock } from './state.js'

export default function App() {
  const saved = useRef(loadPersisted()).current

  const [screen, setScreen] = useState('home')
  const [stack, setStack] = useState(saved.stack || seedStack())
  const [netItems, setNetItemsState] = useState(saved.netItems || DEMO.netItems)
  const [quests, setQuests] = useState(saved.quests || DEMO.sideQuests)
  const [selectedQuest, setSelectedQuest] = useState((saved.quests || DEMO.sideQuests)[0] || null)
  const [pinnedLayout, setPinnedLayoutState] = useState(saved.pinnedLayout ?? false)
  const [focusItem, setFocusItem] = useState(DEMO.focusItem)
  const [landing, setLanding] = useState(null)

  // Invite + mocked presence: Jen accepts and sits down a few moments later.
  const [inviteOpen, setInviteOpen] = useState(false)
  const [presence, setPresence] = useState({ invited: false, live: false, label: DEMO.jen.oneLiner })
  const afterSendRef = useRef(null)

  const skyMode = skyModeNow()
  const outfit = { ...outfitForToday(pinnedLayout), ...outfitOverride() }

  const goHome = () => {
    setLanding(null)
    setScreen('home')
  }

  const go = (s) => setScreen(s)

  const setPinnedLayout = (pin) => {
    setPinnedLayoutState(pin)
    persist({ pinnedLayout: pin })
  }

  const setNetItems = (items) => {
    setNetItemsState(items)
    persist({ netItems: items })
  }

  // A completion drops a material block onto the Stack (~500ms settle).
  const land = (material) => {
    const block = stackBlock(material, stack.length)
    const nextStack = [...stack, block]
    setStack(nextStack)
    persist({ stack: nextStack })
    setLanding(block)
  }

  const openInvite = (afterSend) => {
    afterSendRef.current = afterSend || null
    setInviteOpen(true)
  }

  const sendInvite = () => {
    setInviteOpen(false) // the sheet drops on action
    setPresence((p) => ({ ...p, invited: true }))
    setTimeout(() => setPresence((p) => ({ ...p, live: true })), 6000)
    if (afterSendRef.current) {
      const cb = afterSendRef.current
      afterSendRef.current = null
      cb()
    }
  }

  const questDone = (quest) => {
    const remaining = quests.filter((q) => q !== quest)
    setQuests(remaining)
    persist({ quests: remaining })
    setSelectedQuest(remaining[0] || null)
    land('bluegold')
  }

  let body
  if (screen === 'deep') {
    body = (
      <DeepFocus
        focusItem={focusItem}
        setFocusItem={setFocusItem}
        presence={presence}
        openInvite={openInvite}
        goHome={goHome}
        onDone={() => land('sunset')}
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'impossible') {
    body = <Impossible onPieceDone={() => land('slab')} goHome={goHome} stack={stack} landing={landing} />
  } else if (screen === 'knockout') {
    body = <Knockout onWin={() => land('band')} goHome={goHome} openInvite={openInvite} stack={stack} landing={landing} />
  } else if (screen === 'quests') {
    body = (
      <SideQuests
        quests={quests}
        selected={selectedQuest}
        setSelected={setSelectedQuest}
        onDone={questDone}
        goHome={goHome}
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'session') {
    body = <Session onDone={() => land('sunset')} goHome={goHome} stack={stack} landing={landing} />
  } else if (screen === 'settings') {
    body = <Settings pinnedLayout={pinnedLayout} setPinnedLayout={setPinnedLayout} goHome={goHome} />
  } else if (screen === 'net') {
    body = <Net netItems={netItems} setNetItems={setNetItems} goHome={goHome} />
  } else if (screen === 'stack') {
    body = <Stack stack={stack} night={skyMode === 'night'} goHome={goHome} />
  } else {
    body = <Home outfit={outfit} skyMode={skyMode} go={go} />
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
