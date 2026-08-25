# Working conventions

How this site gets changed, and the rules that are not obvious from the code.

`README.md` covers the technical traps: scoped styles, the `404.html` redirect, why case
studies stay mounted. This covers how to work here, and the design and copy rules that
have already been decided.

## The push is a release

`main` auto-deploys to anavahdesigns.com. There is no staging step, so a push is a
publish to a live portfolio that gets sent to people.

**Commit freely, but wait to be asked before pushing.** Run the gate first:

```bash
npm run build && npm run lint
```

Then load `/resources` directly in a fresh tab. It is the one path that behaves
differently in production, because it depends on the `404.html` redirect.

Several changes here have needed a second pass after being seen on a real phone. That
review is exactly what pushing early skips, and it matters most for anything only
observable on a device: touch, hover, and the reveal animations.

## Layout code has to be swappable

Design gets iterated on a lot, so changing a layout should be close to drag and drop
rather than a rewrite:

- **Content** lives in a data object, separate from markup
- **Order** lives in a plain array
- **Each visual treatment** sits behind a named renderer in a registry

Reordering or replacing a layout should mean editing an array or adding one renderer,
never editing markup across several files. `mockups/narrative-home.html` is the worked
example: `CONTENT` for copy and data, `ACT_ONE` and `PAGE_ORDER` for sequence, `LAYOUTS`
and `SECTIONS` for the renderers. Copy carries its own emphasis with `*word*` markers so
a renderer never has to parse meaning out of markup.

## Copy: never write a claim that is not already established

If a field wants a reason and nothing states one, **leave it empty**. An empty field is
visibly missing. An inferred one reads exactly like a fact, and afterwards nobody can
tell which is which.

Flagging a guess for review is not a substitute: the guess still has to be caught, and
the whole cost of the error lands on the person reviewing it.

This bit once already. Copy for a client's "Built With" section claimed the Shopify
storefront handled gifting, inferred from "gift cards" appearing in a teaser. It was
wrong, on a public portfolio, about a real client's business.

## Design rules already settled

**No accent-rail callouts.** Never style a callout, note, quote or aside as a light box
with a coloured left border. It reads as a signature of generated design, which
undermines work whose whole job is to prove it was built by hand.

**No stranded rows.** A row holding one item is a layout bug. Four items on a
three-column grid leaves the fourth alone beside two empty cells, which reads as
something failing to load. The usual cause is `grid-template-columns` with `auto-fit`,
which gives each item its own cell and cannot rebalance. CSS multi-column lets content
flow and fill the space it has.

## Where the work is tracked

Portfolio-section work is tracked as tasks in the DevDeck "Portfolio" project, not here.

## Design references

Layout templates and design mocks live outside this repo, in the DevBricks library.
Start from a saved piece rather than a blank file where one fits.
