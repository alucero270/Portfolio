# Claude Redesign Reference

## Purpose

This document preserves the useful visual and content direction from the Claude design-system zip:

`Loose Arrow Labs Design System.zip`

For the preferred rewritten production copy direction, use
`docs/loose-arrow-labs-copy-direction.md`.

It is reference material, not production truth. Use it to guide implementation, copy exploration, and section structure while preserving the repo rules:

- Alex Lucero remains the primary trust anchor.
- Loose Arrow Labs remains the secondary studio identity.
- Do not ship fake projects, metrics, clients, testimonials, availability claims, email addresses, or calendar details.
- Keep Next.js, TypeScript, Material UI, MDX/local content, and static-first rendering.
- Use current MDX/project/GitHub data when production components need real content.

## Visual Direction To Preserve

- Large two-column authority hero with a proof/signal panel on the right.
- Dark technical grid/vignette backdrop, implemented through MUI/global CSS rather than standalone prototype CSS.
- Dense structural cards with mono metadata, crisp borders, and restrained violet accent use.
- Live/curated data labels that make the source of information visible.
- Signal strip immediately after the hero for concise capability/proof framing.
- Stronger project cards that show rendered UI/system previews where real evidence exists.
- Section numbering or mono metadata where it supports scanability.
- Compact, direct CTAs with clear action labels.

## Prototype Sections Worth Adapting

The standalone prototype renders these sections:

- Hero
- Signal strip
- Recent activity
- Active systems
- Selected work
- Services
- Process
- How I work
- Proof
- Lab / R&D
- Engagement

For production, map them into existing v1 surfaces instead of adding everything wholesale:

- Hero -> `AuthorityHero`
- Signal strip -> Milestone 2/4 visual enhancement, using truthful capability statements
- Recent activity -> existing optional GitHub-backed Working Now behavior
- Active systems -> existing Working Now / Selected Work structures
- Selected work -> existing MDX-backed project cards
- Services -> existing What We Do section, if the copy stays founder-led and non-agency
- Process -> existing Build Philosophy / How I Work section
- Proof -> existing Engineering Evidence / project evidence model
- Lab / R&D -> defer unless a real content route or MDX source is approved
- Engagement -> existing Contact CTA; avoid fake form/calendar behavior

## Candidate Copy Patterns

These phrases are useful patterns to adapt when backed by real content:

- "End-to-end engineering from MVP to launch."
- "Search, dashboards, and product builds."
- "Deterministic, structured, fast iteration."
- "Production-ready: tested, monitored, documented."
- "Fast iteration: weekly demos, shared repo."
- "Operator mindset: I run what I build."
- "The feed is the proof."
- "Systems I am actively building or refining."
- "Each card merges curated narrative with live engineering signal."
- "What I have built, in plain language. Outcomes first."
- "Three focuses. Outcome-led. No agency menu."
- "Predictability beats theater."
- "Structure before build."
- "Deterministic systems."
- "Incremental validation."
- "Clarity over complexity."
- "Run what you build."
- "Show, do not tell."
- "Repos, architecture diagrams, written breakdowns. The real artifacts."

## Prototype Content That Needs Verification Before Shipping

Do not ship these unless they become true and are backed by real project/content evidence:

- Fake project names such as Lumen Search, Opslane, or Stride.
- Fake repo names such as `lumen-search` or `opslane-ui`.
- Fake metrics such as active repo counts, commit counts, live system counts, reply times, cache hit rates, stars, forks, or query benchmarks.
- Fake availability windows.
- Fake client categories or claims about logistics startups, ops teams, revenue, or users.
- Fake contact email, form behavior, calendar slots, or encrypted/no-newsletter claims.
- Fake tool integrations such as Notion, Slack, Drive, Temporal, Stripe, Supabase, or pgvector unless tied to real authored project evidence.

## Content Porting Rule

When porting content from the prototype, keep the structure and energy, but replace claims with truthful MDX-backed content. If a phrase implies a fact, either source it from current repo content or rewrite it as a capability/working preference.
