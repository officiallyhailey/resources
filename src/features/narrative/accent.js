/* The accent, as a colour that travels.
   ══════════════════════════════════════════════════════════════════════
   It walks the whole wheel as the reader moves through the deck. That is
   the part worth being careful about: Ember's own rule is that text on the
   accent is always black, and that rule only holds while the accent is warm.
   At blue, black on it measures 2.18 to one.

   So nothing here is a fixed pairing. Three values are solved for the hue
   currently on screen, every frame:

     --accent      the fill, at Ember's saturation and lightness
     --on-accent   black or white, whichever actually passes on that fill
     --accent-ink  the same hue, lightened or darkened until it clears 4.5
                   against the surface it is read on

   Which means the cycle can go anywhere on the wheel and every one of those
   contrasts still holds. The alternative was to keep the accent in a warm
   band where one fixed pairing works, and that is a smaller idea.
   ══════════════════════════════════════════════════════════════════════ */

const SAT = 0.98; // Ember's accent saturation, kept across the wheel
const LIGHT = 0.46; // and its lightness, which is what makes it a fill

const srgb = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) =>
  0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);

export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// hsl to rgb, 0-255
export function hsl(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}

/* The fill's text colour is whichever of black or white actually passes on it.
   Black wins across the warm half of the wheel and white across the cool half,
   and neither wins everywhere, which is the whole reason this is computed. */
export function onAccent(fill) {
  const black = contrast(fill, [0, 0, 0]);
  const white = contrast(fill, [249, 249, 249]);
  return black >= white ? '#000000' : '#f9f9f9';
}

/* The accent used as TEXT has to clear 4.5 against the surface it sits on,
   which the fill lightness does not for every hue. Walk the lightness away
   from the surface until it does, and give up rather than loop forever. */
export function accentInk(h, surface, target = 4.5) {
  const up = luminance(surface) < 0.5; // dark surface, so lighten toward it
  for (let step = 0; step <= 50; step += 1) {
    const l = up ? LIGHT + step * 0.01 : LIGHT - step * 0.01;
    if (l <= 0.04 || l >= 0.96) break;
    const c = hsl(h, SAT, l);
    if (contrast(c, surface) >= target) return c;
  }
  return up ? [249, 249, 249] : [19, 20, 23];
}

/* At a handful of hues neither black nor white clears 4.5 on a fill at Ember's
   lightness: the best available is 4.47, because the fill sits exactly where
   both are equally mediocre. Nudging the lightness a few points either way
   fixes it, so the fill is solved as well - the nearest lightness to Ember's
   at which the better of black and white passes. The shift is small enough to
   be invisible and it removes the only nineteen hues that would have failed. */
export function fillFor(h, target = 4.5) {
  for (let step = 0; step <= 24; step += 1) {
    for (const dir of step === 0 ? [0] : [-1, 1]) {
      const l = LIGHT + dir * step * 0.01;
      if (l <= 0.1 || l >= 0.9) continue;
      const c = hsl(h, SAT, l);
      if (Math.max(contrast(c, [0, 0, 0]), contrast(c, [249, 249, 249])) >= target) return c;
    }
  }
  return hsl(h, SAT, LIGHT);
}

const rgb = (c) => `rgb(${c[0]} ${c[1]} ${c[2]})`;

/* Write the three solved values onto the element. Called every frame while the
   hue is moving, so a colour half way between two sections is as legible as
   the two it is travelling between. */
export function paintAccent(el, h, surface) {
  const fill = fillFor(((h % 360) + 360) % 360);
  el.style.setProperty('--accent', rgb(fill));
  el.style.setProperty('--on-accent', onAccent(fill));
  el.style.setProperty('--accent-ink', rgb(accentInk(h, surface)));
}
