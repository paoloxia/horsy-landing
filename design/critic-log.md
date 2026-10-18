# Critic log · horsy.run

Blind critic = fresh sonnet subagent, screenshots only, brief in ~/.claude/skills/polished-site/CRITIC.md.

| Round | Overall | Lowest dims | Applied after it |
|---|---|---|---|
| r0 baseline | 7.0 | layout 6, content 6, polish 6, mobile 6 | Inter → Schibsted Grotesk; eyebrows cut; italic accent limited; modes stepper; guarantees numbered list; solid nav; ticker, magnetic, hover lifts, fade-ups removed; demo poster = finished receipt; receipt prints once; race 360→260vh; hero says "Claude Code" |
| r1 | 7.4 | polish 6 | last eyebrows gone; mode pills gone; problem as rows; Teams section folded into final CTA line; horse starts clear of lane label; demo plays once and rests on receipt frame |
| r2 | 7.4 | layout 6, polish 6 | cost tag follows the horse; FAQ 9→6 (first open); one paper surface; dark-text contrast up; roadmap tile + duplicate claim removed; bigger race board |
| r3 | 7.4 | polish 6 | modes as rows; accent only hero/done/cheapest; plain data labels; lede contrast |
| r4 | 7.6 | polish 6.5 | nav hides on scroll down; scroll-margin; mobile hero single CTA; reduced-motion hero bug fixed (sub was invisible) |

Stopped: 3 rounds with the same top issues (plateau rule). Rejected advice: 2-col hero, dropping horse footage, glass nav, cropping the terminal video (needs a re-render in ../motion/terminal-demo).

## Reflect
- Biggest movers: removing tells (eyebrows, cards, glass, ticker) and fixing "empty proof" (poster/receipt states). Fine-tuning after r1 moved the score little.
- The critic caps content at ~7 on a pre-launch page with illustrative proof only. Real screenshots/receipts from a real session are the next lever, not CSS.
- Scroll-pinned sections and videos get judged on random frames: give every animated object a meaningful resting state.
- Recurring critic asks to keep for a human call: re-render the terminal demo shorter (no empty lower band), crop for mobile legibility.
