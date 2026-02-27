# Lucero Portfolio

Production-style personal portfolio built with Next.js App Router, TypeScript, Material UI, and MDX content files.

## Stack

- Next.js (App Router)
- TypeScript
- Material UI
- MDX content loaded from `/content` and `/content/projects`

## Commands

From repo root:

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
```

## Content Structure

- `content/bio.mdx`: Home page bio + current focus
- `content/resume.mdx`: Resume page content
- `content/projects/*.mdx`: Project detail pages with frontmatter

Required project sections in each file:

- `Overview`
- `Why it matters`
- `Architecture`
- `Tech`
- `Current status`
- `Next steps`
- `Evidence (links)`
- `Engineering Notes` with validation/testing/debugging details

## Add a Project

1. Create a new file in `content/projects/<slug>.mdx`.
2. Add frontmatter fields:
   - `title`
   - `slug`
   - `summary`
   - `featured` (`true` or `false`)
   - `status`
   - `updated` (ISO date)
3. Fill all required content sections.
4. Add screenshots/diagrams under `public/images/` and link them in the MDX file.

## Resume PDF

- Replace `public/resume/Alex_Lucero_Resume.pdf` with your real PDF.
- The Resume page links directly to that file.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Set the project root to repository root.
4. Build command: `npm run build`
5. Output directory: default Next.js output

## Optional Static Export for GitHub Pages

This project supports static export mode through an environment variable:

```bash
STATIC_EXPORT=true npm run build
```

This sets Next.js `output: "export"` and enables trailing slashes.

## CI

- Workflow file (repo root): `.github/workflows/lucero-portfolio-ci.yml`
- Runs `npm ci`, `npm run lint`, and `npm run build` on PRs and pushes to `main`.
