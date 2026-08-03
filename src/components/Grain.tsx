import { GRAIN_LIGHT, GRAIN_DARK, GRAIN_DARK_STRONG } from '../lib/grain';

// Static texture overlay. pointer-events:none, never animated (§3).
export function Grain({ variant = 'light' }: { variant?: 'light' | 'dark' | 'darkStrong' }) {
  const img = variant === 'dark' ? GRAIN_DARK : variant === 'darkStrong' ? GRAIN_DARK_STRONG : GRAIN_LIGHT;
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, backgroundImage: img, pointerEvents: 'none' }}
    />
  );
}
