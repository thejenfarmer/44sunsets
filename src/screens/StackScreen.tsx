import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, Eyebrow } from '../components/ui';
import { StackBlocks, StackLegend } from '../components/StackBlocks';
import { useStore } from '../state/store';

// The Stack — its first real entrance (23b). Day/Week/Month/Year tabs. No counts/streaks/heat-map.
const TABS = ['Day', 'Week', 'Month', 'Year'] as const;

export function StackScreen() {
  const nav = useNavigate();
  const { s } = useStore();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Week');
  const view = tab === 'Year' ? 'year' : 'week';

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Back" onClick={() => nav('/profile')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Eyebrow>The Stack</Eyebrow>
          <div style={{ display: 'flex', background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: 999, padding: 3 }}>
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ borderRadius: 999, border: 'none', padding: '6px 11px', fontSize: 12, fontWeight: tab === t ? 600 : 400, background: tab === t ? '#221A12' : 'transparent', color: tab === t ? '#FAF3E7' : 'rgba(34,26,18,.55)' }}>{t}</button>
            ))}
          </div>
        </div>
        <h1 style={{ margin: '12px 0 0', fontWeight: 700, letterSpacing: '-.015em', fontSize: 26 }}>
          {view === 'year' ? 'The year, stacking up.' : 'The week, stacking up.'}
        </h1>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingTop: 10 }}>
          <StackBlocks blocks={[...s.stack]} view={view} />
        </div>
        <div style={{ paddingTop: 14 }}><StackLegend /></div>
      </div>
    </Shell>
  );
}
