# Lucero Portfolio

Founder-led technical authority site for Alex Lucero, with Loose Arrow Labs as the studio identity for practical software, embedded systems, automation, and physical integration work.

The site is a targeted refactor of an existing portfolio. It is static-first, MDX-driven, TypeScript-based, and styled with Material UI.

## Stack

- Next.js App Router
- TypeScript
- Material UI with the existing ThemeRegistry pattern
- MDX content loaded from local files
- Optional allowlisted GitHub freshness/activity
- Static export support through `STATIC_EXPORT=true`

## Commands

Run from the repo root:

```bash
npm run dev
npm run lint
npm run format:check
npm run build
npm run validate:github-fallback
npm run validate:private-repos
```

Format files with:

```bash
npm run format
```

Check static export behavior with:

```bash
STATIC_EXPORT=true npm run build
```

On Windows PowerShell:

```powershell
$env:STATIC_EXPORT="true"; npm run build
```

## Routes

- `/` - founder-led authority homepage
- `/projects` - project proof/evidence index
- `/projects/[slug]` - MDX project detail pages
- `/about` - founder-led about page
- `/resume` - resume content and PDF link
- `/contact` - contact links from resume/site config

## Content Model

Authored content lives in:

- `content/bio.mdx`
- `content/about.mdx`
- `content/resume.mdx`
- `content/projects/*.mdx`

`src/lib/content.ts` owns local content loading, MDX compilation, project sorting, featured project selection, and project detail lookup.

Project frontmatter supports:

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

Keep project claims backed by authored context, links, notes, diagrams, screenshots, repos, or validation artifacts where possible.

## GitHub Freshness

GitHub data is optional and allowlisted. It decorates local MDX content but does not replace it.

Relevant files:

- `src/lib/github-config.ts` - allowlisted repository config and project-to-repo mapping
- `src/lib/github.ts` - fetch, normalization, filtering, activity, and freshness helpers
- `docs/github-fallback-validation.md` - fallback validation notes

Fallback expectations:

- API failures return local authored/fallback content.
- Empty allowlists render without blocking the site.
- `STATIC_EXPORT=true` disables live GitHub fetching and keeps static rendering safe.

## UI Structure

Reusable UI lives under:

- `src/components/atoms`
- `src/components/molecules`
- `src/components/organisms`
- `src/components/templates`

The component system follows `docs/design-system.md`: create components only when real pages or sections use them.

## Governance Docs

Read these before changing scope or architecture:

- `AGENTS.md`
- `CONTRIBUTING.md`
- `docs/scope.md`
- `docs/architecture.md`
- `docs/current-state.md`
- `docs/milestones.md`
- `docs/design-system.md`

## Deployment

The default build is the standard Next.js build:

```bash
npm run build
```

Static export mode is supported with:

```bash
STATIC_EXPORT=true npm run build
```

## CI

`.github/workflows/lucero-portfolio-ci.yml` runs on pull requests and pushes to `main`.

The CI job runs:

- `npm ci`
- `npm run lint`
- `npm run format:check`
- `npm run build`

## Private repositories

Some allowlisted repos are private (`canonis`, `memora`, `pantheon`). They are
marked with `repoPrivate: true` in `src/lib/github-config.ts`, and the site
publishes only their last-active date and primary language.

Commit messages, SHAs, authors, commit links, repo descriptions, and topics are
never fetched for a private repo, so nothing about unreleased work can reach the
public site whether or not `GITHUB_TOKEN` is set. A private project renders a
deliberate "Private repo" state rather than silently appearing inactive.

`npm run validate:private-repos` enforces this: it serves commit data for every
repo from a fake GitHub API, builds the site, and fails if any private repo's
content appears in the output. It also asserts a public repo's commit _does_
appear, so the check cannot pass by rendering nothing.
