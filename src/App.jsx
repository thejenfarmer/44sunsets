import React, { useRef, useState } from 'react'
import Home from './screens/Home.jsx'
import DeepFocus from './screens/DeepFocus.jsx'
import Impossible from './screens/Impossible.jsx'
import Knockout from './screens/Knockout.jsx'
import SideQuests from './screens/SideQuests.jsx'
import Session from './screens/Session.jsx'
import Settings from './screens/Settings.jsx'
import InviteSheet from './screens/InviteSheet.jsx'
import Onboarding from './screens/Onboarding.jsx'
import { Net, Stack } from './screens/NetStack.jsx'
import { DEMO, callOverride, clearPersisted, outfitForToday, outfitOverride, scheduledCallDefault, seedStack, skyModeNow, stackBlock } from './state.js'

// The demo lives entirely in memory — a refresh deals the day fresh.
clearPersisted()

export default function App() {
  // Onboarding runs before Home on every fresh load (nothing persisted);
  // once "Step inside →" drops the rails, it's only reachable by refresh.
  const [onboarded, setOnboarded] = useState(false)
  const [screen, setScreen] = useState('home')
  const [stack, setStack] = useState(seedStack)
  const [netItems, setNetItems] = useState(DEMO.netItems)
  const [quests, setQuests] = useState(DEMO.sideQuests)
  const [selectedQuest, setSelectedQuest] = useState(DEMO.sideQuests[0])
  const [pinnedLayout, setPinnedLayout] = useState(false)
  const [focusItem, setFocusItem] = useState(DEMO.focusItem)
  const [landing, setLanding] = useState(null)

  // Five cards, always: the 2:00 call never swaps a card out. ?call=none
  // hides Jen's card for demos only.
  const scheduledCall = callOverride() === 'none' ? null : scheduledCallDefault()

  // Completed doors come forward on Home wearing their done state.
  const [completedDoors, setCompletedDoors] = useState([])
  const markDoor = (door) => {
    setCompletedDoors((prev) => [door, ...prev.filter((d) => d !== door)])
  }

  // Invite + mocked presence: Jen accepts and sits down a few moments later.
  const [inviteOpen, setInviteOpen] = useState(false)
  const [presence, setPresence] = useState({ invited: false, live: false, label: DEMO.jen.oneLiner })
  const afterSendRef = useRef(null)

  const skyMode = skyModeNow()

  // Demo affordance: tapping the date headline cycles through the wardrobe's
  // outfits for the current sky (day: tilted → marquee → ribbons; night:
  // moonlit → night ribbons → starfield).
  const [outfitShift, setOutfitShift] = useState(0)
  const cycleOutfit = () => setOutfitShift((s) => s + 1)
  const DAY_LOOKS = ['tilted', 'marquee', 'ribbons']
  const NIGHT_LOOKS = ['moonlit', 'nightribbons', 'starfield']
  const dealt = { ...outfitForToday(pinnedLayout), ...outfitOverride() }
  const outfit = {
    day: DAY_LOOKS[(DAY_LOOKS.indexOf(dealt.day) + outfitShift) % 3],
    night: NIGHT_LOOKS[(NIGHT_LOOKS.indexOf(dealt.night) + outfitShift) % 3],
  }

  const goHome = () => {
    setLanding(null)
    setScreen('home')
  }

  const go = (s) => setScreen(s)

  // A completion drops a material block onto the Stack (~500ms settle).
  const land = (material) => {
    const block = stackBlock(material, stack.length)
    setStack([...stack, block])
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
    setSelectedQuest(remaining[0] || null)
    land('bluegold')
    if (remaining.length === 0) markDoor('quests')
  }

  let body
  if (!onboarded) {
    body = <Onboarding onDone={() => setOnboarded(true)} />
  } else if (screen === 'deep') {
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
          markDoor('session')
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
    body = (
      <Home outfit={outfit} skyMode={skyMode} scheduledCall={scheduledCall} completedDoors={completedDoors} go={go} cycleOutfit={cycleOutfit} />
    )
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
