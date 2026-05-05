# Milestones

## Purpose

Milestones define the execution order for the founder-led portfolio refactor. Each milestone must leave the repository working and reviewable.

The real v1 refactor is Milestones 1 through 7. Later ideas should not be pulled into v1 unless explicitly approved.

## Roadmap Bands

- Foundation: Milestones 1 and 2
- System and structure: Milestones 3 and 4
- Proof and freshness: Milestones 5 and 6
- Release readiness: Milestone 7

## Milestone 1 - Planning And Governance Foundation

### Goal

Create repo-specific planning and execution docs that keep future implementation aligned.

### Includes

- `docs/architecture.md`
- `docs/current-state.md`
- `docs/scope.md`
- `docs/milestones.md`
- `docs/design-system.md`
- `AGENTS.md`
- `CONTRIBUTING.md`

### Outcome

Future implementation work has explicit boundaries, current-state facts, milestone order, and autonomous execution rules.

### Acceptance Criteria

- Docs describe the current repo accurately.
- Docs separate implemented behavior from target state.
- Docs preserve Next.js, TypeScript, Material UI, MDX, and static-first constraints.
- Docs define stop conditions and issue sizing rules.
- No website implementation changes are included.

### Risks Reduced

- Rebuild drift.
- Framework creep.
- Blind copying from unrelated docs.
- Oversized autonomous changes.

## Milestone 2 - Brand And Theme Foundation

### Goal

Establish the dark-first Loose Arrow Labs visual foundation while keeping Alex Lucero primary.

### Includes

- MUI theme palette update.
- Typography update.
- Global CSS base update.
- Header/footer brand hierarchy update.
- Metadata update.
- Port the Claude visual prototype direction into the existing MUI system:
  grid/vignette backdrop, denser technical cards, live-signal treatment, restrained violet accents,
  and stronger hero composition without replacing the Next.js/MUI architecture.
- Preserve the Claude prototype content patterns in `docs/claude-redesign-reference.md`, use
  `docs/loose-arrow-labs-copy-direction.md` for the preferred rewritten direction, and adapt only
  verified, truthful copy into production surfaces.

### Outcome

The existing routes render with the target visual direction and correct brand hierarchy.

### Acceptance Criteria

- MUI remains the styling system.
- The site uses near-black background, charcoal surfaces, off-white text, cool gray secondary text, muted borders, and restrained violet accents.
- Claude prototype visuals are adapted through MUI theme/components rather than copied as standalone React/CSS.
- Claude prototype copy is preserved as reference material and screened before production use.
- Alex Lucero remains the primary trust anchor.
- Loose Arrow Labs is visible as studio identity.
- Existing routes continue to render.

### Risks Reduced

- Generic portfolio appearance.
- Startup-agency feel.
- Uncontrolled accent color usage.

## Milestone 3 - Practical Atomic Component System

### Goal

Introduce reusable UI structure based on actual site needs.

### Includes

- Atoms for brand marks, section labels, chips, tags, links, and status indicators.
- Molecules for project cards, evidence links, CTA groups, metadata rows, and activity items.
- Organisms for shell pieces, homepage sections, project grids, and working-now card.
- Templates for repeated page layouts.

### Outcome

Pages can be refactored through shared patterns instead of one-off page code.

### Acceptance Criteria

- New components are used by real pages or organisms.
- No unused component inventory is created.
- No new UI framework or Pattern Lab tooling is added.
- Route files stay focused on data loading, metadata, and composition.

### Risks Reduced

- Page duplication.
- Design drift.
- Over-abstracted component churn.

## Milestone 4 - Authority Homepage

### Goal

Refactor the homepage from a simple portfolio page into a founder-led technical authority surface.

### Includes

- Hero.
- What We Do.
- Selected Work.
- How I Work / Build Philosophy.
- Proof of Work / Engineering Evidence.
- Static fallback for What I Am Working On.
- About Preview.
- Contact CTA.

### Outcome

The homepage clearly communicates practical systems thinking, AI integration capability, project structuring ability, proof of execution, and active work.

### Acceptance Criteria

- Alex Lucero is the primary hero trust anchor.
- Loose Arrow Labs is secondary.
- Copy is calm, technical, direct, and non-hype.
- Featured work comes from local project content.
- The page renders without GitHub data.

### Risks Reduced

- Weak positioning.
- Generic portfolio language.
- Branding overpowering authority.

## Milestone 5 - Project System And Evidence Upgrade

### Goal

Turn project pages into credible case-study and proof surfaces.

### Includes

- Extended project frontmatter.
- Explicit repo mapping fields.
- Project index card redesign.
- Project detail header.
- Evidence link rendering.
- Better support for screenshots, diagrams, ADRs, milestones, and validation notes.

### Outcome

Projects show not only what exists, but why it matters, what Alex did, how it was structured, and what evidence supports it.

### Acceptance Criteria

- Existing MDX projects still render.
- Missing optional metadata degrades gracefully.
- Project-to-repo mapping uses `repoOwner`, `repoName`, optional `repoPath`, and optional `repoPrimary`.
- Project narratives remain authored in MDX.
- Proof claims are backed by links, diagrams, screenshots, or written evidence where available.

### Risks Reduced

- Unsupported authority claims.
- Noisy project pages.
- Breaking MDX compatibility.

## Milestone 6 - GitHub Freshness Layer

### Goal

Add low-complexity GitHub-backed freshness and activity for selected repositories.

### Includes

- Allowlisted repository config.
- GitHub fetch and normalization module.
- Latest activity for homepage.
- Repo freshness metadata for project cards/details.
- Graceful fallback when GitHub data is unavailable.

### Outcome

The site can show selected active work without becoming a GitHub vanity dashboard.

### Acceptance Criteria

- GitHub data is optional enhancement only.
- Allowlisted repos are the only fetched repos.
- Homepage activity is filtered and limited.
- Project freshness decorates MDX content but does not replace it.
- Static export mode disables live sections or renders local fallback text.
- No database, webhooks, or snapshot pipeline is introduced in v1.

### Risks Reduced

- Runtime fragility.
- Noisy activity feeds.
- Overengineered data plumbing.

## Milestone 7 - Release Readiness And Documentation Update

### Goal

Validate the refactor and update docs to match implementation.

### Includes

- Responsive review.
- Accessibility basics.
- Metadata pass.
- README update.
- `docs/current-state.md` update.
- Validation command pass.

### Outcome

The v1 refactor is coherent, buildable, documented, and ready for review.

### Acceptance Criteria

- `npm run lint` passes.
- `npm run format:check` passes.
- `npm run build` passes.
- Static export behavior is checked or explicitly documented.
- Current-state docs match code.
- No v1 non-goals were introduced.

### Risks Reduced

- Documentation drift.
- Visual regressions.
- Build failures.
- Scope creep hidden in final polish.

## Execution Guidance

- Implement milestones in order.
- Split each milestone into one-issue reviewable changes.
- Do not begin a later milestone if an earlier milestone has unresolved architecture or validation failures.
- A milestone is not complete until the repo still builds and the relevant docs are updated.
