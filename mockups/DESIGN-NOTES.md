# Narrative homepage · design record

The approved design lives in `mockups/narrative-home.html`. This note carries the
decisions and the hard-won details that are expensive to rediscover, so the port
into the React app does not have to re-derive them.

- `narrative-home.html` — the working file. Uses `/img/...` paths, so it only
  renders correctly when **served** (`npm run dev`, then
  `http://localhost:5173/mockups/narrative-home.html`).
- `narrative-home-portable.html` — same page with all 22 images embedded as data
  URIs. Opens correctly by double-clicking from anywhere. Regenerate it after any
  change; do not edit it by hand.
- `narrative-home-coverflow.html` (in `~/Developer/mockups`) — the superseded
  design, kept for the DevBricks library.

## Shape of the thing

The page is a **deck of full-viewport panels**, not a scrolling document.
`html, body { height:100%; overflow:hidden }`, and each section is
`position:absolute; inset:0`. Exactly one panel is `.active`.

Order: `intro → work* → about → experience → skills → contact`
(`* mobile and tablet only`, see below).

Stage one (`#intro`) holds three beats sharing one screen, advanced by click:

1. `Welcome to Anavah Designs...` / `Let me show you around`
2. The value statement, `*have*` and `*want*` accented
3. `I'm Hals`, profile card centred, six projects ringed behind it

## Navigation

Forward is **gated**: the arrow, or ArrowDown / PageDown / Space. Nothing else.
Backward is **free**: the back chevron, ArrowUp / PageUp, or simply scrolling up.

There is **one gate**, mounted on `<body>`. It must not live inside a panel: a
transformed ancestor becomes the containing block for `position:fixed`
children, so a per-panel gate drifts with its own panel mid-transition.

A panel taller than the screen scrolls **inside itself**. Content you cannot
reach is not a gate, it is a bug.

## The ring behind the profile card (desktop)

Taken off Hailey's reference drawing, which measures as two straight fans, not a
curve. Every rule below is from that drawing:

- each card steps sideways by **exactly half a card width**
- the innermost card's centre sits **on the profile card's edge**
- vertical steps are uniform, first offset ≈ **3.05×** one step
- depth runs inward: nearest card darkest and in front, furthest lightest

```js
const ARC = { perBranch: 3, stepX: 0.5, dropRatio: 3.05,
              depth: [{sat:1,br:1},{sat:.82,br:.985},{sat:.62,br:.97}] };
```

The reference canvas is square; a widescreen has far less height than width, so
the **vertical spread is scaled to fit** while every horizontal rule is exact.

Resting cards sit at `z-index: 4`, under the profile card at `5`. Hovering lifts
one to `60`, in front of it. The `.arc` element must carry **no z-index** of its
own, or it becomes a stacking context and traps them behind.

Once a project is picked, `.arc` gets `.picked` and the hover lift stands down:
the focus card in the middle is the subject.

## Mobile and tablet (≤900px)

- the ring is dropped entirely; so is the focus card that belongs to it
- the work gets its own panel, the **Up and running** coverflow
- the intro is: profile card on top, `I'm Hals`, the tools line, arrow
- the gate flows below the cards rather than over them

`NARROW_ONLY = new Set(['work'])` drives this. Resizing across the breakpoint
rebuilds the deck and moves off any panel that has just been dropped.

## Five bugs worth not reintroducing

1. **Typing must wait for its block to land.** A beat enters with
   `translateY(46px)`. Typing that starts immediately makes the text appear to
   jump upward as characters arrive. `settled()` awaits the transition first.
2. **The rising toolkit had a seam.** With a flex `gap`, a track of two copies
   is `2n·h + (2n−1)·g` tall, so `translateY(-50%)` lands half a gap short and
   jumps every loop. The gap is folded into each item's margin instead.
3. **Characters fade, they do not flip.** `visibility` snapped each glyph on
   hard. `opacity` with a short transition reads as one smooth wipe, and keeps
   the whole line available to screen readers.
4. **`100vw` is not the viewport.** It includes the scrollbar. Full-bleed comes
   from being a full-width child, not from `100vw`.
5. **`justify-items:center` sizes a grid item to its content**, which let the
   mobile card rail grow to the width of all its cards and hang off both sides
   instead of scrolling.

## Content

All copy and data are in the `CONTENT` object, mirroring `src/content/*`.
Anavah Publishing was **dropped** from the portfolio at Hailey's request, so
there are six projects, three per branch.

## Ported

This is now the live homepage. `src/features/narrative/` holds it and
`src/styles/narrative.css` is this sheet, scoped behind a `.narr` class that
`NarrativeHome` puts on `<html>` and `<body>` while it is mounted - `/resources`
is still the old design and still has to scroll.

The mockup stays as the reference. If the two ever disagree, the mockup is what
was approved.

Four things the port changed, all of them holes the mockup had:

1. **Going back used to lose the arrow.** A section only played once, and the
   gate came up at the end of that play - so returning to a section left no
   way forward but the keyboard. Arriving at a section already played now
   raises its gate straight away without replaying it.
2. **Returning to the opening panel** had the same problem, plus a stale label.
3. **The toolkit stayed flown away.** `.launch` was never taken off, so going
   back to it showed an empty field. It is cleared on arrival now.
4. **The breakdown's scope rows link.** The client sites and `/resources` were
   otherwise unreachable from the whole site.

Still true, and worth deciding on during testing: **the contact panel has no
gate**, because there is nothing after it and a dead arrow is worse than none.
The back chevron lives on the gate, so the only ways back off contact are
scrolling up and the up arrow key.
