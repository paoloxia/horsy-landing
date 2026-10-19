# DESIGN.md · horsy.run

Read before touching any UI. Fix this file first when something looks wrong. Direction and rationale: `design/direction.md`. Critic rounds: `design/critic-log.md`.

## Direction
- Anchor: 1950s racecourse form guide + tote board, printed on newsprint. The receipt is the betting slip.
- Feeling: honest, mechanical, a bit of swagger.
- Signature moment: the pinned race (fail at the verify gate, knight-jump one rung up).

## Tokens
```css
:root{
  --ink:#16140F; --ink2:#3A362E; --ink3:#5A5448;      /* text on paper */
  --paper:#F4F1EA; --paper2:#FBF9F4; --sand:#E4DDCD; --line:#D8D2C4;
  --cream:#E9E3D6;                                      /* text on ink */
  --silk:#D9541E; --silk-hi:#F07A3E;                    /* accent: CTA, fail/step-up state, one key word */
  --ok:#2F7D4A; --red:#B8321A;
  --serif:"Instrument Serif",Georgia,serif;
  --sans:"Schibsted Grotesk",system-ui,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,monospace;
}
```

## Type
| Role | Font | Size | Notes |
|---|---|---|---|
| Hero | Instrument Serif | clamp(4.4rem,11.5vw,10.5rem)/.9 | -0.035em, one italic word |
| H2 | Instrument Serif | clamp(2.3rem,5vw,4rem)/1.02 | italic accent word only where it carries meaning |
| Race number | JetBrains Mono 500 | .78rem, tabular | replaces uppercase eyebrows: `Race 03 · How it works` |
| Body | Schibsted Grotesk 400 | 17-18px/1.6 | max 64ch, left-aligned beyond 2 lines |
| Figures | JetBrains Mono | tabular-nums | costs, models, pass/fail |

## Layout
- Container 1120px, 20px gutters. Sections alternate paper / ink. No two consecutive sections share a skeleton.
- Containers only for real objects: terminal window, race board, receipt, config file. Lists of claims sit on hairline rules, not in cards.
- Mobile re-composes: hero copy left-aligned, one CTA full width, race board above beats.

## Components
- Buttons: radius 999px kept (brand), one primary (silk) per viewport, secondary is a text link with an arrow.
- Rules: 1px `--line` on paper, `#2E2A23` on ink. Numbered lists use mono numerals.

## Audit section (primary CTA)
- Hero leads with `npx @horsy/cli audit`; the npm package is not published yet, so the repo-clone fallback sits under it in small text. Drop the fallback only when the package is live.
- Section sits on `--sand` (between paper and ink). The sample report is a printed sheet (`--paper2`, double top rule, mono). Tote board = one ink object with three figures, not cards.
- Report text is verbatim from `horsy audit --demo` (synthetic data), labeled "Sample report on synthetic demo sessions". Never paste real usage numbers or local paths. Re-run the number check when the CLI output changes.

## Motion
- Entrance: hero mask rise 1.1s cubic-bezier(.16,1,.3,1).
- Scroll: race pinned story; receipt prints once in view.
- Hover: color/underline only. No lifts, no magnetic pull.
- Reduced motion: everything static and readable.

## Never
- Inter or any default sans. Uppercase letter-spaced eyebrows in silk.
- Floating glass pill nav over light content (glass only over the hero footage).
- Icon/checkmark benefit bullets, 3-equal-cards rows, hover-lift cards.
- Marquee tickers, magnetic buttons, fade-up on every block.
- Unmeasured numbers presented as measured: label illustrative content.
- Em dashes in copy.
- See ~/.claude/skills/polished-site/TELLS.md
