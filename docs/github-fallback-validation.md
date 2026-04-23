# GitHub Fallback Validation

## Purpose

The v1 GitHub layer is an optional enhancement. These checks validate that the site still builds when GitHub data is unavailable, intentionally empty, or disabled for static export.

## Scripted Check

Use the repo root.

```bash
npm run validate:github-fallback
```

The script runs three production builds:

- GitHub unavailable fallback with `GITHUB_API_BASE_URL=http://127.0.0.1:9`.
- Empty allowlist fallback with `GITHUB_ALLOWLIST_DISABLED=true`.
- Static export fallback with `STATIC_EXPORT=true`.

## Expected Behavior

- The homepage Working Now section renders local fallback activity when live GitHub activity is unavailable or unsuitable.
- Project pages keep authored MDX `updated` metadata when repo freshness is unavailable.
- Static export mode does not require live GitHub data.
- Build output remains static-first.
