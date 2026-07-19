import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// A crash anywhere must never leave a silent blank screen.
class Boundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'Poppins, system-ui, sans-serif', color: '#221A12' }}>
          <p style={{ fontWeight: 600 }}>Something broke while rendering.</p>
          <p style={{ marginTop: 8, fontSize: 13, opacity: 0.6 }}>{String(this.state.error)}</p>
          <button
            style={{ marginTop: 16, background: '#221A12', color: '#FAF3E7', border: 'none', borderRadius: 999, padding: '12px 24px', font: 'inherit' }}
            onClick={() => {
              try {
                localStorage.clear()
              } catch {}
              location.href = location.pathname
            }}
          >
            Reset the demo
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <Boundary>
    <App />
  </Boundary>,
)
