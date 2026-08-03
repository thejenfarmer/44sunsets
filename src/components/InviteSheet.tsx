import { useState } from 'react';
import { Sheet } from './Sheet';
import { DarkPill, Eyebrow } from './ui';
import { buzz } from '../lib/haptics';

// 9b — invite composer, a sheet (never a page). Slot 10/20/30 (20 pre-selected),
// message updates live, destination tiles, one tap sends.
const TILES = ['Slack', 'Teams', 'Contacts', 'SMS'];

export function InviteSheet({ onDismiss, onSent }: { onDismiss: () => void; onSent: () => void }) {
  const [mins, setMins] = useState(20);
  const [sent, setSent] = useState(false);
  return (
    <Sheet onDismiss={onDismiss}>
      <Eyebrow>Invite someone to sit with you</Eyebrow>
      <div style={{ display: 'flex', gap: 8, margin: '12px 0 14px' }}>
        {[10, 20, 30].map((m) => (
          <button key={m} onClick={() => setMins(m)} style={{ flex: 1, borderRadius: 12, padding: '12px 0', fontWeight: 600, fontSize: 14, border: mins === m ? '1.5px solid #221A12' : '1px solid rgba(34,26,18,.18)', background: mins === m ? '#221A12' : '#FAF3E7', color: mins === m ? '#FAF3E7' : 'rgba(34,26,18,.6)' }}>
            {m} min
          </button>
        ))}
      </div>
      <div style={{ background: '#FAF3E7', border: '1px solid rgba(34,26,18,.12)', borderRadius: 12, padding: '12px 14px', fontSize: 13.5, color: 'rgba(34,26,18,.7)', marginBottom: 14 }}>
        Sit with me for {mins} minutes — [link]
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {TILES.map((t) => (
          <div key={t} style={{ flex: 1, textAlign: 'center', borderRadius: 12, border: '1px solid rgba(34,26,18,.12)', background: '#FFFDF6', padding: '12px 0', fontSize: 11.5, color: 'rgba(34,26,18,.6)' }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(34,26,18,.08)', margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{t[0]}</div>
            {t}
          </div>
        ))}
      </div>
      <DarkPill onClick={() => { buzz(20); setSent(true); setTimeout(onSent, 700); }}>{sent ? 'Sent ✓' : 'Send the invite'}</DarkPill>
    </Sheet>
  );
}
