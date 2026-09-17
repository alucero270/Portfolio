# Autonomous Execution Rules

## Business Operating Context

Read `Context.md` at the repo root before any session involving content, positioning, or project priorities. It defines the Loose Arrow Labs operating model, engineering philosophy, current project priorities, and how agents should operate.

## What This Repo Is

This repo is a Next.js App Router portfolio site being refactored into a founder-led technical authority site for Alex Lucero, with Loose Arrow Labs as the studio and builder identity.

The site is static-first, MDX-driven, TypeScript-based, and styled with Material UI.

## What This Repo Is Not

This repo is not:

- a rebuild project
- a CMS project
- a SaaS landing page
- an agency brochure
- a GitHub vanity dashboard
- a place to introduce new UI frameworks
- a place to fabricate authority signals
- a product backend

## Locked Architecture Rules

- Keep Next.js App Router.
- Keep TypeScript.
- Keep Material UI.
- Keep the existing MUI ThemeRegistry pattern unless a focused issue changes it safely.
- Keep MDX/local content as the main authored content source.
- Keep static-first rendering as the default.
- Preserve static export support unless an explicit issue changes that decision.
- Add only `/about` as the planned new route in v1.
- Keep GitHub data optional and allowlisted.
- Use explicit project repo fields: `repoOwner`, `repoName`, optional `repoPath`, optional `repoPrimary`.

## Brand Rules

- Alex Lucero is the primary trust anchor.
- Loose Arrow Labs is the secondary studio layer.
- Do not make the site read like a fake company or detached agency.
- Do not use generic startup or stock-agency language.
- Do not invent proof, clients, testimonials, metrics, or authority claims.

## Execution Rules

- One issue equals one reviewable change.
- Stay inside the issue scope.
- Read the current code before editing.
- If docs and code conflict, code wins and docs should be updated in the issue if relevant.
- Prefer existing patterns over new abstractions.
- Add abstractions only when they reduce real duplication or clarify a real boundary.
- Do not make unrelated cleanup changes.
- Do not implement future milestone work early.
- Do not turn planning docs into production code changes unless the issue asks for it.

## Issue Sizing Rules

An issue is correctly sized when:

- the change can be reviewed in one PR
- the affected files have a clear boundary
- validation is obvious
- follow-up work can be described separately

Split the issue when it mixes unrelated concerns such as:

- theme and GitHub data
- content rewrite and component refactor
- route addition and project metadata migration
- governance docs and visual implementation

## Branch Naming

Use:

```text
feature/<issue-number>-<short-name>
```

Examples:

```text
feature/12-dark-theme-foundation
feature/18-about-page
feature/24-github-working-now
```

If no issue number exists, stop and ask for the issue number unless the user explicitly authorizes a temporary branch name.

## Validation Expectations

Use the smallest meaningful validation for the change.

Default validation:

```bash
npm run lint
npm run format:check
npm run build
```

For docs-only changes, `npm run format:check` is usually enough if no code changed.

For GitHub data changes, also validate fallback behavior when GitHub data is unavailable.

For visual changes, include screenshots or a clear visual summary in the PR.

## Workflow Modes

### Default Workflow

Default mode is one issue at a time.

1. Read the issue and relevant docs.
2. Inspect current repo state.
3. Make the smallest complete change.
4. Run the smallest meaningful validation.
5. Open an honest draft PR.
6. Stop.

### Unattended Milestone Mode

Unattended milestone mode is only allowed when explicitly requested.

In this mode:

- execute issues in milestone order
- keep each issue as a separate reviewable change when possible
- stop on failed validation
- stop on missing material context
- stop if a later issue depends on an unreviewed risky decision
- update `docs/current-state.md` after meaningful implementation changes

Do not silently continue through architectural ambiguity.

## Failure And Stop Conditions

Stop and ask for guidance when:

- the requested change violates `docs/scope.md`
- implementation would require replacing Material UI
- implementation would require replacing MDX/local content
- implementation would require a CMS, database, webhook, or backend service in v1
- static export support would break
- GitHub data requires unavailable credentials
- repo state conflicts with the issue assumptions
- evidence is missing for a claim the site would make
- the change grows beyond one reviewable issue
- validation fails for reasons outside the issue scope

## Priority Order

When priorities conflict, use this order:

1. Keep the site truthful and credible.
2. Preserve locked architecture rules.
3. Preserve static-first behavior.
4. Keep Alex Lucero primary and Loose Arrow Labs secondary.
5. Keep changes issue-sized and reviewable.
6. Prefer simple local content and config over infrastructure.
7. Improve visual polish only after authority and clarity are protected.

## Final Principle

Make the smallest change that improves authority, clarity, credibility, or maintainability while keeping the repo working.
