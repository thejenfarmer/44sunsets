import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './state/store';
import { Onboarding } from './screens/Onboarding';
import { Home } from './screens/Home';
import { Net } from './screens/Net';
import { Sort } from './screens/Sort';
import { DeepWork } from './screens/DeepWork';
import { Knockout } from './screens/Knockout';
import { SideQuests } from './screens/SideQuests';
import { Impossible } from './screens/Impossible';
import { Session } from './screens/Session';
import { Profile } from './screens/Profile';
import { StackScreen } from './screens/StackScreen';
import { Settings } from './screens/Settings';

export function App() {
  const { s } = useStore();
  const loc = useLocation();
  // State is in-memory, so a refresh resets onboardingSeen → any deep route
  // (e.g. /home) bounces back to onboarding. Refresh = start the demo over.
  if (!s.onboardingSeen && loc.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  return (
    <Routes>
      <Route path="/" element={<Navigate to={s.onboardingSeen ? '/home' : '/onboarding'} replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/net" element={<Net />} />
      <Route path="/net/sort" element={<Sort />} />
      <Route path="/deep-work" element={<DeepWork />} />
      <Route path="/knockout" element={<Knockout />} />
      <Route path="/side-quests" element={<SideQuests />} />
      <Route path="/impossible" element={<Impossible />} />
      <Route path="/session" element={<Session />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/stack" element={<StackScreen />} />
      <Route path="/profile/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
