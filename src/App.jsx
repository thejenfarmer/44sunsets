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
import { DEMO, callOverride, loadPersisted, outfitForToday, outfitOverride, persist, scheduledCallDefault, seedStack, skyModeNow, stackBlock, todayKey } from './state.js'

export default function App() {
  const saved = useRef(loadPersisted()).current
  // Day-scoped demo state: quests, the Net, the call, and completed doors
  // re-deal each morning. The Stack accumulates across days by design.
  const day = saved.demoDay === todayKey() ? saved : {}
  const save = (partial) => persist({ ...partial, demoDay: todayKey() })

  const [screen, setScreen] = useState('home')
  const [stack, setStack] = useState(saved.stack || seedStack())
  const [netItems, setNetItemsState] = useState(day.netItems || DEMO.netItems)
  const [quests, setQuests] = useState(day.quests || DEMO.sideQuests)
  const [selectedQuest, setSelectedQuest] = useState((day.quests || DEMO.sideQuests)[0] || null)
  const [pinnedLayout, setPinnedLayoutState] = useState(saved.pinnedLayout ?? false)
  const [focusItem, setFocusItem] = useState(DEMO.focusItem)
  const [landing, setLanding] = useState(null)

  // Home's 4th door: the Scheduled session while the 2:00 call is upcoming,
  // The Impossible Thing once it's past (or done). ?call=none|on overrides.
  const [scheduledCall, setScheduledCallState] = useState(() => {
    const ov = callOverride()
    if (ov === 'none') return null
    if (ov === 'on') return { time: '2:00' }
    return day.scheduledCallDone ? null : scheduledCallDefault()
  })
  const setScheduledCall = (call) => {
    setScheduledCallState(call)
    save({ scheduledCallDone: call === null })
  }

  // Completed doors come forward on Home wearing their done state; resets daily.
  const [completedDoors, setCompletedDoors] = useState(day.completedDoors || [])
  const markDoor = (door) => {
    setCompletedDoors((prev) => {
      const next = [door, ...prev.filter((d) => d !== door)]
      save({ completedDoors: next })
      return next
    })
  }

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
    save({ netItems: items })
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
    save({ quests: remaining })
    setSelectedQuest(remaining[0] || null)
    land('bluegold')
    if (remaining.length === 0) markDoor('quests')
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
        onDone={() => {
          land('sunset')
          markDoor('deep')
        }}
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'impossible') {
    body = (
      <Impossible
        onPieceDone={() => {
          land('slab')
          markDoor('impossible')
        }}
        goHome={goHome}
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'knockout') {
    body = (
      <Knockout
        onWin={() => {
          land('band')
          markDoor('knockout')
        }}
        goHome={goHome}
        openInvite={openInvite}
        stack={stack}
        landing={landing}
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
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'session') {
    body = (
      <Session
        onDone={() => {
          land('sunset')
          setScheduledCall(null) // the call is done — the slab takes the 4th slot
        }}
        goHome={goHome}
        stack={stack}
        landing={landing}
      />
    )
  } else if (screen === 'settings') {
    body = <Settings pinnedLayout={pinnedLayout} setPinnedLayout={setPinnedLayout} goHome={goHome} />
  } else if (screen === 'net') {
    body = <Net netItems={netItems} setNetItems={setNetItems} goHome={goHome} />
  } else if (screen === 'stack') {
    body = <Stack stack={stack} night={skyMode === 'night'} goHome={goHome} />
  } else {
    body = <Home outfit={outfit} skyMode={skyMode} scheduledCall={scheduledCall} completedDoors={completedDoors} go={go} />
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
