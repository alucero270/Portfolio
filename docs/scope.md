# Scope

## Purpose

This document defines the v1 boundary for refactoring the portfolio into a founder-led technical authority site for Alex Lucero and Loose Arrow Labs.

The project is a targeted refactor. It is not a rebuild.

## In Scope For v1

- Preserve the current Next.js App Router application.
- Preserve TypeScript.
- Preserve Material UI and the existing MUI ThemeRegistry pattern.
- Preserve MDX as the main authored content source.
- Preserve static-first behavior.
- Add a founder-led brand hierarchy:
  - Alex Lucero as the primary trust anchor.
  - Loose Arrow Labs as the studio and builder identity.
- Convert the visual foundation to a dark-first technical theme.
- Apply a practical Atomic Design component hierarchy.
- Refactor the homepage into an authority surface with:
  - hero
  - what we do
  - selected work
  - how I work / build philosophy
  - proof of work / engineering evidence
  - what I am working on
  - about preview
  - contact CTA
- Add `/about`.
- Improve project index and project detail pages as proof/case-study surfaces.
- Extend project metadata with explicit optional repo fields:
  - `repoOwner`
  - `repoName`
  - `repoPath`
  - `repoPrimary`
- Add optional GitHub-backed freshness for selected repos.
- Add optional GitHub-backed activity for a small homepage "What I am Working On" section.
- Keep GitHub activity allowlisted, filtered, and low-noise.
- Add lightweight governance docs for autonomous implementation.

## Out Of Scope For v1

- Rebuilding the app from scratch.
- Replacing Material UI.
- Adding Tailwind, shadcn, Bootstrap, Chakra, or another UI framework.
- Adding a headless CMS.
- Adding a database.
- Adding GitHub webhooks.
- Adding a custom backend service.
- Adding a blog platform.
- Adding an AI chat widget.
- Adding generic contribution heatmaps, streak badges, or GitHub vanity widgets.
- Creating fake testimonials, fake client logos, or inflated company language.
- Making Loose Arrow Labs read like a detached agency.
- Adding stock-agency visuals or generic startup imagery.
- Restructuring routes beyond adding `/about` unless a later explicit decision approves it.
- Removing static export support without an explicit decision.

## Assumptions

- MDX/local content is sufficient for authored narrative in v1.
- GitHub public API access is enough for the first freshness layer.
- GitHub data may be unavailable or rate-limited and must not be required for rendering.
- Project evidence will improve incrementally as screenshots, diagrams, ADRs, and repo links become available.
- Brand image samples in `public/images` are reference material until intentionally integrated.
- The refactor will be implemented through small issue-sized changes.

## Constraints

- Keep the current stack.
- Keep the current project structure where practical.
- Keep pages static-first by default.
- Keep the implementation understandable to future autonomous agents.
- Keep docs concise enough to maintain.
- Prefer simple local data structures over new infrastructure.
- Prefer curated proof over automated noise.
- Do not claim authority that the content cannot support.

## Non-Goals

- The site is not a SaaS landing page.
- The site is not an agency brochure.
- The site is not a CMS project.
- The site is not a GitHub dashboard.
- The site is not a public design-system product.
- The site is not a playground for AI gimmicks.
- The site is not a rewrite opportunity.

## Scope Rule

A change belongs in v1 only if it improves authority, clarity, credibility, or maintainability while preserving the existing stack and static-first architecture.

Reject or defer a change when it:

- replaces authored content with live data
- turns proof into vanity metrics
- adds backend complexity before value is proven
- makes Loose Arrow Labs more important than Alex Lucero
- introduces a new framework or CMS
- changes routes beyond the approved `/about` addition
- requires broad unrelated rewrites
- cannot be validated in one reviewable issue

When in doubt, choose the smaller change that keeps the site working and leaves a clear follow-up.
