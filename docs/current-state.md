# Current State

## How To Use This Doc

This document describes what is implemented in the current checkout. It is not the target-state plan.

If this document and the code disagree, the code wins. Update this document after implementation milestones change the repo.

## Implemented Now

### Stack

The repo currently uses:

- Next.js App Router
- TypeScript
- Material UI
- `@mui/material-nextjs` App Router cache provider
- MDX content through `next-mdx-remote/rsc`
- `gray-matter` for frontmatter
- static-first route behavior

Package scripts in `package.json`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run format`
- `npm run format:check`

### Routes

Implemented routes:

- `/` from `src/app/page.tsx`
- `/projects` from `src/app/projects/page.tsx`
- `/projects/[slug]` from `src/app/projects/[slug]/page.tsx`
- `/about` from `src/app/about/page.tsx`
- `/resume` from `src/app/resume/page.tsx`
- `/contact` from `src/app/contact/page.tsx`

Not implemented:

- GitHub-backed freshness/activity sections

### Static Behavior

Existing pages are static-first:

- home, about, projects, resume, and contact export `dynamic = "force-static"`
- project detail exports `dynamic = "force-static"` and `dynamicParams = false`
- project detail paths are generated from MDX project slugs

`next.config.ts` supports static export mode through `STATIC_EXPORT=true`.

### Content

Authored content currently lives in:

- `content/about.mdx`
- `content/bio.mdx`
- `content/resume.mdx`
- `content/projects/codex.mdx`
- `content/projects/kittybot.mdx`
- `content/projects/om606-signal-integration.mdx`
- `content/projects/pantheon.mdx`
- `content/projects/vtcn.mdx`

Project content uses frontmatter fields such as:

- `title`
- `slug`
- `summary`
- `featured`
- `status`
- `updated`
- optional `role`
- optional `outcome`
- optional `tech`
- optional `evidence`
- optional `repoOwner`
- optional `repoName`
- optional `repoPath`
- optional `repoPrimary`

Implemented project frontmatter now includes explicit repo mappings and repository evidence links where existing project content already had safe repo URLs. Missing optional metadata degrades gracefully.

Resume frontmatter currently provides contact data and the resume PDF path.

### Content Loading

`src/lib/content.ts` owns:

- reading MDX files
- compiling MDX
- loading about, bio, resume, and project content
- extracting project frontmatter
- sorting projects
- selecting featured projects
- resolving project detail pages by slug

`src/lib/mdx-components.tsx` owns MDX element rendering with MUI components.

`src/components/mdx-content.tsx` wraps rendered MDX in a `.mdx-content` container.

### Theme, Shell, And Components

`src/components/theme-registry.tsx` wraps the app in:

- `AppRouterCacheProvider`
- MUI `ThemeProvider`
- `CssBaseline`

`src/theme/theme.ts` currently defines a dark-first theme with:

- near-black background
- charcoal surfaces
- off-white primary text
- cool gray secondary text
- restrained violet accent
- muted borders
- geometric heading font direction
- 8px radius

`src/app/globals.css` currently defines base reset styles, dark color-scheme behavior, and accessible focus-visible styling.

`src/components/site-shell.tsx` owns the global header, navigation, main container, and footer. The shell now makes Alex Lucero primary and Loose Arrow Labs secondary.

Reusable UI now exists under:

- `src/components/atoms`
- `src/components/molecules`
- `src/components/organisms`
- `src/components/templates`

The homepage uses the reusable section/template structure for hero, what-we-do, selected work, build philosophy, proof, working-now fallback, about preview, and contact CTA sections.

The project index and detail pages use shared project cards, metadata rows, evidence link rendering, project grid, project index template, and project detail header components.

### Branding Assets

The checkout includes untracked branding image samples in `public/images`:

- Loose Arrow Labs brand board
- Loose Arrow Labs logo image

These are available as planning/visual references. They are not yet integrated into the site UI.

### CI

`.github/workflows/lucero-portfolio-ci.yml` runs on pull requests and pushes to `main`.

The CI job runs:

- `npm ci`
- `npm run lint`
- `npm run format:check`
- `npm run build`

### Governance Docs

The repo now includes lightweight execution and planning docs:

- `docs/architecture.md`
- `docs/current-state.md`
- `docs/scope.md`
- `docs/milestones.md`
- `docs/design-system.md`
- `AGENTS.md`
- `CONTRIBUTING.md`

`docs/Atomic Design.md` remains a long-form reference source. `docs/design-system.md` is the repo-specific implementation guide.

## Intentionally Thin

The current site is intentionally simple:

- no CMS
- no database
- no live GitHub data
- no heavy design system tooling or Pattern Lab app
- no API routes
- no dynamic server-side personalization
- no blog engine
- no analytics or tracking layer

These are not bugs by themselves.

## Planned Future State

The approved refactor plan adds:

- optional GitHub-backed freshness and activity data
- GitHub-backed working-now activity
- repo freshness metadata decoration
- final responsive/accessibility review
- README/current-state reconciliation after the v1 stack completes

GitHub freshness is still planned and is not implemented in the current checkout. The site renders from local MDX/config without GitHub data.

## Where To Look

- App routes: `src/app`
- Global shell: `src/components/site-shell.tsx`
- MUI registry: `src/components/theme-registry.tsx`
- Theme: `src/theme/theme.ts`
- Global CSS: `src/app/globals.css`
- UI atoms/molecules/organisms/templates: `src/components`
- Content loading: `src/lib/content.ts`
- MDX rendering: `src/lib/mdx-components.tsx`
- Site config: `src/lib/site.ts`
- MDX content: `content`
- Project content: `content/projects`
- CI: `.github/workflows/lucero-portfolio-ci.yml`
- Static export handling: `next.config.ts` and `src/lib/routing.ts`

## Local Run Notes

Use the repo root.

```bash
npm run dev
npm run lint
npm run format:check
npm run build
```

For static export behavior:

```bash
STATIC_EXPORT=true npm run build
```

On Windows PowerShell:

```powershell
$env:STATIC_EXPORT="true"; npm run build
```
