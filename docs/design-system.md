# Design System

## Purpose

This repo uses Atomic Design as a practical planning method for a small website component system. The goal is reusable, consistent interface structure without adding Pattern Lab or extra tooling.

`docs/Atomic Design.md` is a reference source. This file is the repo-specific implementation guide.

## Design Direction

The site should feel:

- dark-first
- minimal
- technical
- high contrast
- hands-on
- credible
- founder-led

Avoid:

- startup fluff
- stock-agency visuals
- loud gradients
- decorative blobs
- fake company scale
- generic SaaS styling

## Brand Hierarchy

- Alex Lucero is the primary trust anchor.
- Loose Arrow Labs is the studio and builder identity.
- The UI should never make Loose Arrow Labs feel like a detached agency.

## Atomic Hierarchy

### Atoms

Atoms are the smallest reusable UI decisions:

- `BrandMark`
- `SectionEyebrow`
- `SectionHeading`
- `StatusChip`
- `TechTag`
- `ExternalLink`
- `EvidenceIcon`
- `MonoLabel`

### Molecules

Molecules combine atoms into repeated interface patterns:

- `NavLinks`
- `CTAGroup`
- `ProjectMetaRow`
- `EvidenceLinkList`
- `RepoFreshnessBadge`
- `ActivityItem`
- `PrincipleCard`
- `ContactLinkList`

### Organisms

Organisms are full site sections or structural blocks:

- `SiteHeader`
- `SiteFooter`
- `AuthorityHero`
- `WhatWeDoSection`
- `SelectedWorkSection`
- `BuildPhilosophySection`
- `EngineeringEvidenceSection`
- `WorkingNowCard`
- `AboutPreviewSection`
- `ContactCTASection`
- `ProjectGrid`
- `ProjectDetailHeader`

### Templates

Templates own repeated page layout structure:

- `HomeTemplate`
- `ContentPageTemplate`
- `ProjectIndexTemplate`
- `ProjectDetailTemplate`

### Pages

App Router page files should load data, define metadata, and compose templates. They should not accumulate one-off section implementations.

## Token Rules

Use MUI theme tokens as the source of visual truth.

Target tokens:

- background: near-black
- surface: dark charcoal
- elevated surface: slightly lighter charcoal
- text primary: off-white or white
- text secondary: cool gray
- accent: brand violet
- border: muted dark border

Violet is an accent, not a dominant background.

## Typography Rules

- Use modern geometric heading style.
- Use clean readable body text.
- Use monospace only for code, labels, repo names, technical metadata, and compact proof details.
- Do not use viewport-width font scaling.
- Keep headings proportional to their container.

## Spacing Rules

- Use MUI spacing based on the 8px scale.
- Keep section rhythm generous but not marketing-heavy.
- Keep cards dense enough to scan.
- Do not put cards inside cards.

## Surface Rules

- Page sections should usually be unframed.
- Cards are for repeated items, functional panels, and project/evidence summaries.
- Use borders and contrast before shadows.
- Keep card radius at 8px or less unless a future theme decision changes it.

## Accent Rules

Use violet for:

- active navigation state
- section accents
- primary calls to action
- selected metadata highlights
- focus rings

Do not flood the UI with violet.

## Logo Usage Rules

- Use the Loose Arrow Labs mark as a supporting brand signal.
- Do not let the mark replace Alex Lucero as the main identity.
- Use approved dark-background variants where possible.
- Do not stretch, rotate, recolor, or add effects to the logo.

## Content Pattern Rules

- Prefer proof over claims.
- Prefer concrete technical language over hype.
- Prefer project evidence, diagrams, repos, ADRs, screenshots, and validation notes over decorative visuals.
- Do not use generic team stock photos.

## Component Creation Rule

Create a component only when it supports a real repeated pattern or clarifies a meaningful boundary.

Do not create generic atoms, molecules, or organisms just to fill the hierarchy.
