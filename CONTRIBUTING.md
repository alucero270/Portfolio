# Contributing

## Core Principles

This repo is a focused refactor of an existing portfolio site into a founder-led technical authority site.

Contributions should:

- preserve the existing Next.js, TypeScript, Material UI, and MDX stack
- keep the site static-first
- keep Alex Lucero as the primary trust anchor
- use Loose Arrow Labs as the studio identity, not a fake agency wrapper
- prefer proof and clarity over visual gimmicks
- keep changes reviewable and scoped

## Contribution Workflow

1. Start from an issue or explicit task.
2. Read the relevant docs:
   - `docs/scope.md`
   - `docs/architecture.md`
   - `docs/current-state.md`
   - `docs/milestones.md`
   - `AGENTS.md`
3. Create a branch:

```text
feature/<issue-number>-<short-name>
```

4. Inspect the current code before editing.
5. Make one focused change.
6. Run the smallest meaningful validation.
7. Open a draft PR unless the maintainer asks for a ready PR.

## Commit Message Rules

Use clear, scoped commit messages.

Preferred format:

```text
<type>(<scope>): <short summary>
```

Examples:

```text
docs(scope): define v1 refactor boundary
style(theme): add dark brand foundation
feat(projects): add evidence metadata fields
refactor(home): compose authority sections
```

Avoid vague messages such as:

```text
updates
fix stuff
portfolio changes
```

## PR Requirements

Each PR should include:

- summary of the change
- files or areas touched
- validation run
- screenshots for visual changes
- known follow-ups
- any scope or architecture concern

PRs should not include unrelated cleanup.

## Testing And Validation

Default validation:

```bash
npm run lint
npm run format:check
npm run build
```

Docs-only changes may use:

```bash
npm run format:check
```

Visual changes should include local browser review and screenshots when practical.

GitHub data changes must prove graceful fallback behavior.

Static export-sensitive changes should check:

```bash
STATIC_EXPORT=true npm run build
```

On Windows PowerShell:

```powershell
$env:STATIC_EXPORT="true"; npm run build
```

## Module And Boundary Expectations

- App route files own routing, metadata, and page composition.
- MDX files own authored narrative.
- `src/lib/content.ts` owns local content loading.
- Future GitHub data code should live in a dedicated library module.
- Theme decisions belong in `src/theme/theme.ts` or a small supporting token file.
- Reusable UI should be extracted only when it supports actual repeated patterns.
- Component structure should follow `docs/design-system.md`.

## What Not To Do

- Do not rebuild the site from scratch.
- Do not replace Material UI.
- Do not add Tailwind, shadcn, or another UI framework.
- Do not add a CMS by default.
- Do not add a database, webhook system, or backend service in v1.
- Do not add generic GitHub heatmaps, streaks, or vanity widgets.
- Do not add an AI chat widget.
- Do not fabricate clients, testimonials, metrics, or proof.
- Do not make Loose Arrow Labs more important than Alex Lucero.
- Do not use generic stock-agency visuals.
- Do not broaden a PR beyond its issue.

## Decision Making Rule

When there is a conflict, choose the path that best preserves:

1. truthfulness and credibility
2. static-first architecture
3. MDX-authored content
4. Material UI consistency
5. small reviewable changes

If the decision would change architecture, scope, routing, or data ownership, document it before implementing it.

## Final Rule

Leave the site working, truthful, and easier to maintain than you found it.
