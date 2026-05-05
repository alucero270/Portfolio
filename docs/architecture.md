# Architecture

## Overview

This repository is a static-first founder-led technical authority site for Alex Lucero, with Loose Arrow Labs as the studio and builder identity layered on top. The site is a refactor of the existing portfolio, not a rebuild.

The architecture keeps the current stack:

- Next.js App Router
- TypeScript
- Material UI
- MDX-driven authored content
- Static-first rendering

The site should communicate technical authority through clear positioning, structured project evidence, practical systems thinking, and selected live freshness signals. Authority and proof take priority over brand spectacle.

## Architectural Goals

- Keep Alex Lucero as the primary trust anchor.
- Use Loose Arrow Labs as a visible studio layer without making the site read like a detached agency.
- Preserve MDX as the main authored content system.
- Preserve static-first performance and static export compatibility.
- Use Material UI and the existing theme registry rather than introducing a new UI framework.
- Build a small reusable component system guided by Atomic Design.
- Keep authored narrative separate from GitHub-backed activity and freshness.
- Add GitHub data only as optional enhancement, never as the source of truth.
- Keep the implementation reviewable through issue-sized changes.

## Layer Responsibilities

### App Routes

Route files in `src/app` own routing, metadata, static generation behavior, and high-level page composition.

Implemented routes:

- `/` - homepage authority surface.
- `/projects` - project index.
- `/projects/[slug]` - project detail generated from MDX slugs.
- `/about` - founder-led about page.
- `/resume` - resume and experience page.
- `/contact` - direct contact page.

Route files should not contain large reusable UI patterns or GitHub normalization logic.

### Shell

`src/components/site-shell.tsx` owns the global page frame.

The shell must preserve the brand hierarchy:

- Alex Lucero is the primary name and trust anchor.
- Loose Arrow Labs is the studio identity.
- Navigation remains simple and direct.

### Theme

`src/theme/theme.ts` owns MUI theme configuration, including palette, typography, shape, and component defaults.

The target theme is dark-first:

- near-black page background
- dark charcoal surfaces
- off-white primary text
- cool gray secondary text
- restrained violet accent
- muted dark borders

Theme changes should be made through MUI theme tokens and component overrides first. Global CSS should stay small and only define base document behavior.

### Components

Components should evolve into a practical Atomic Design hierarchy:

- atoms for brand marks, chips, section labels, tags, and links
- molecules for project cards, metadata rows, evidence lists, and CTA groups
- organisms for homepage sections, project grids, shell header/footer, and live activity cards
- templates for repeated page layouts

This hierarchy is a planning method, not a requirement to create unused folders or generic components. A component should exist because at least one page or organism uses it.

### Content Layer

`src/lib/content.ts` owns local content loading and MDX compilation.

Authored content lives in:

- `content/bio.mdx`
- `content/resume.mdx`
- `content/projects/*.mdx`
- `content/about.mdx`

MDX remains the main source for narrative, project explanation, resume content, and founder context.

### GitHub Data Layer

`src/lib/github.ts` fetches selected GitHub data for allowlisted repositories only.

GitHub data is limited to freshness and activity:

- repo last updated or pushed time
- primary language
- topics
- selected latest commits
- commit links

GitHub data must not replace authored content. If GitHub data fails or is disabled, the site must still render correctly using MDX and local fallback copy.

## Content Source Model

Authored content is human-curated and authoritative:

- project narratives
- outcomes
- architecture notes
- evidence descriptions
- resume and experience
- founder/about copy
- homepage positioning

Structured local config may own:

- navigation labels
- CTA labels
- service/what-we-do cards
- build philosophy principles
- brand names and positioning
- GitHub repo allowlist

GitHub-backed data may decorate authored content but must not author claims.

## Project-to-Repo Mapping

Project metadata should use explicit fields instead of one opaque repo string:

- `repoOwner`
- `repoName`
- optional `repoPath`
- optional `repoPrimary`

These fields allow project pages to map to one or more selected repositories without parsing freeform URLs.

`repoPrimary` identifies the main repository when a project has multiple related repos.

## Authored Content vs Live Activity

Authored content answers:

- What is this project?
- Why does it matter?
- What architecture or system thinking is visible?
- What evidence supports the claim?
- What role did Alex have?
- What is the current state?

Live GitHub activity answers:

- What selected work has changed recently?
- Which allowed project repositories show current movement?
- Where can a visitor inspect recent commits?

Live activity must be filtered, small, and useful. It should not become a vanity feed.

## Static-First and Static Export Rules

Static-first is the default.

Static behavior includes:

- `dynamic = "force-static"` on existing pages.
- generated project detail routes from MDX slugs.
- optional static export mode through `STATIC_EXPORT=true`.

GitHub data is an optional enhancement. In static export mode, the site uses graceful fallback behavior:

- disables live GitHub fetching
- renders local fallback text from content/config

Do not add snapshot pipelines, databases, queues, or webhooks in v1 unless explicitly requested later.

## Operational Guarantees

The site must:

- build with `npm run build`
- lint with `npm run lint`
- preserve `npm run format:check`
- render without GitHub API availability
- preserve MDX project detail pages
- preserve static export support unless an explicit decision changes it
- avoid secrets as a requirement for local development
- degrade gracefully when optional metadata is missing

## Extension Points

Implemented v1 extension points:

- `/about` founder route
- extended project frontmatter with explicit optional fields
- small reusable components based on real page needs
- GitHub data module with allowlisted repos and fallback behavior
- project screenshots, diagrams, ADR links, and proof artifacts where available
- lightweight docs that keep implementation aligned

Changes outside these extension points need an explicit architecture decision.

## Non-Goals

- No rebuild from scratch.
- No replacement for Material UI.
- No Tailwind, shadcn, or additional UI framework.
- No headless CMS by default.
- No database or backend service in v1.
- No GitHub webhooks in v1.
- No generic GitHub heatmaps, streak badges, or vanity widgets.
- No fake testimonials, fake company scale, or inflated authority claims.
- No generic stock-agency visual direction.
- No AI chat widget or gimmick feature in v1.
- No route restructuring beyond adding `/about` unless explicitly justified.
