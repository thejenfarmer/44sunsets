// The app never makes a sound. Every alert is one short vibration (§4.7).
export function buzz(ms = 20) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(ms);
  } catch {
    /* unsupported browser — no-op */
  }
}
