import { useNavigate } from 'react-router-dom';
import { Shell } from '../components/Shell';
import { Grain } from '../components/Grain';
import { BackPill, Eyebrow } from '../components/ui';
import { useStore } from '../state/store';

// 5a — Settings: flat, three sections — Connections, Home (layout), Account.
const CONNECTED = ['Slack', 'Google'];
const CONNECTABLE = ['Asana', 'Sunsama', 'AI Notes'];

export function Settings() {
  const nav = useNavigate();
  const { s, set } = useStore();

  const seg = (name: string, opt: 'Everything' | 'Flagged only') => (
    <button
      onClick={() => set((st) => ({ connections: { ...st.connections, [name]: opt } }))}
      style={{ borderRadius: 999, border: 'none', padding: '5px 11px', fontSize: 12, fontWeight: s.connections[name] === opt ? 600 : 500, background: s.connections[name] === opt ? '#221A12' : 'transparent', color: s.connections[name] === opt ? '#FAF3E7' : 'rgba(34,26,18,.55)' }}
    >{opt}</button>
  );

  return (
    <Shell bg="#FAF3E7">
      <Grain />
      <BackPill label="← Back" onClick={() => nav('/profile')} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 20px 20px', overflowY: 'auto' }}>
        <h1 style={{ margin: '4px 0 22px', fontWeight: 700, letterSpacing: '-.02em', fontSize: 27 }}>Settings</h1>

        <Eyebrow>Connections</Eyebrow>
        <p style={{ margin: '3px 0 8px', fontSize: 12.5, color: 'rgba(34,26,18,.5)' }}>Where your tasks flow in from.</p>
        <div style={{ background: 'rgba(34,26,18,.05)', borderRadius: 10, padding: '9px 12px', fontSize: 12, color: 'rgba(34,26,18,.6)', marginBottom: 10 }}>Connections are rolling out — [placeholder] for early access.</div>
        <div style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: 16, marginBottom: 24 }}>
          {CONNECTED.map((name, i) => (
            <div key={name} style={{ padding: '13px 15px', borderBottom: i < CONNECTED.length + CONNECTABLE.length - 1 ? '1px solid rgba(34,26,18,.07)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(34,26,18,.08)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, color: 'rgba(34,26,18,.55)' }}>{name.slice(0, 2)}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 500, fontSize: 15 }}>{name}</div><div style={{ fontSize: 12, color: 'rgba(34,26,18,.5)' }}>connected as jen@co.com</div></div>
                <button style={{ background: 'none', border: 'none', fontSize: 12.5, color: 'rgba(34,26,18,.45)' }}>Disconnect</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 41, marginTop: 8 }}>
                <span style={{ fontSize: 12.5, color: 'rgba(34,26,18,.6)' }}>What flows in:</span>
                <div style={{ display: 'flex', background: 'rgba(34,26,18,.06)', borderRadius: 999, padding: 2 }}>{seg(name, 'Everything')}{seg(name, 'Flagged only')}</div>
              </div>
            </div>
          ))}
          {CONNECTABLE.map((name, i) => (
            <div key={name} style={{ padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 11, borderBottom: i < CONNECTABLE.length - 1 ? '1px solid rgba(34,26,18,.07)' : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(34,26,18,.08)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12, color: 'rgba(34,26,18,.55)' }}>{name.slice(0, 2)}</div>
              <div style={{ flex: 1, fontWeight: 500, fontSize: 15 }}>{name}</div>
              <button style={{ border: '1.5px solid #14594A', color: '#14594A', background: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 13, fontWeight: 600 }}>Connect</button>
            </div>
          ))}
        </div>

        <Eyebrow>Home</Eyebrow>
        <p style={{ margin: '3px 0 8px', fontSize: 12.5, color: 'rgba(34,26,18,.5)' }}>Keep one outfit, or let Home re-deal each morning.</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {([['My pick', true], ['Fresh each morning', false]] as const).map(([label, pinned]) => (
            <button key={label} onClick={() => set({ pinnedLayout: pinned })} style={{ flex: 1, textAlign: 'left', borderRadius: 14, padding: '13px 14px', border: s.pinnedLayout === pinned ? '1.5px solid #221A12' : '1px solid rgba(34,26,18,.14)', background: '#FFFDF6' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(34,26,18,.5)' }}>{pinned ? 'Same doors, pinned.' : 'The daily shuffle.'}</div>
            </button>
          ))}
        </div>

        <Eyebrow>Account</Eyebrow>
        <div style={{ background: '#FFFDF6', border: '1px solid rgba(34,26,18,.1)', borderRadius: 16, marginTop: 8 }}>
          <div style={{ padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 11, borderBottom: '1px solid rgba(34,26,18,.07)' }}>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 500, fontSize: 15 }}>Founder OS — active</div><div style={{ fontSize: 12, color: 'rgba(34,26,18,.5)' }}>software + kit + accountability</div></div>
            <button style={{ background: 'none', border: 'none', color: '#14594A', fontWeight: 600, fontSize: 13 }}>Manage</button>
          </div>
          <div style={{ padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 11, borderBottom: '1px solid rgba(34,26,18,.07)' }}>
            <div style={{ flex: 1, fontWeight: 500, fontSize: 15 }}>•••• 4242</div>
            <button style={{ background: 'none', border: 'none', color: 'rgba(34,26,18,.55)', fontSize: 13 }}>Update</button>
          </div>
          <div style={{ padding: '13px 15px', color: 'rgba(34,26,18,.45)', fontSize: 14 }}>Sign out</div>
        </div>
      </div>
    </Shell>
  );
}
