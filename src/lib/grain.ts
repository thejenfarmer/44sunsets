// Static fractal-noise grain, copied from the design canvas (44 Sunsets.dc.html).
// Never animated. Applied as a background-image overlay on paper/dark surfaces.
const uri = (op: number, size = 120, bf = 0.9) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${bf}' numOctaves='2'/></filter><rect width='${size}' height='${size}' filter='url(%23n)' opacity='${op}'/></svg>")`;

export const GRAIN_LIGHT = uri(0.05);        // every paper surface
export const GRAIN_DARK = uri(0.1, 140, 0.8); // dark rooms (Knockout, Impossible)
export const GRAIN_DARK_STRONG = uri(0.14, 140, 0.8);
