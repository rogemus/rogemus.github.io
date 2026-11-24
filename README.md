# krogowski.dev

Personal website of Kacper Rogowski, built with [Hugo](https://gohugo.io) and deployed to GitHub Pages.

## Requirements

- Hugo `0.170.1`
- Node.js (see `.node-version`) and npm
- [just](https://github.com/casey/just) (optional)

## Getting started

```sh
npm install
hugo server -D
```

## Commands

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `just dev`        | Start the dev server with drafts    |
| `just build`      | Build the site into `public/`       |
| `just fmt`        | Format css, md, ts and yaml (oxfmt) |
| `just lint`       | Lint with oxlint                    |
| `just typecheck`  | Type-check with tsc                 |
| `just new <path>` | Create a new content page           |
| `just clean`      | Remove `public/` and `resources/`   |

## Project structure

- `content/` – pages and posts
- `themes/rogemus/` – theme: layouts, CSS and TypeScript assets
- `.github/workflows/` – `check.yaml` runs on merge to `main`, `release.yaml` deploys on `v*` tags
- `.github/actions/` – shared setup and verify steps

## Icons

Use only [Tabler icons](https://github.com/tabler/tabler-icons) – outline variant, stroke width 2. No filled icons and no other icon sets.

To add an icon:

1. Copy `node_modules/@tabler/icons/icons/outline/<name>.svg` to `themes/rogemus/assets/icons/<name>.svg`.
2. Run `npm run icons:optimize` (svgo; sets `stroke-width="2"`).
3. Render it with `{{ partial "icon" "<name>" }}`, or set `icon = "<name>"` in `hugo.toml`.

## Releasing

Push a version tag to run the checks and deploy to GitHub Pages:

```sh
git tag v1.0.0
git push origin v1.0.0
```

## Git hooks

Husky runs lint-staged on commit and formats staged css, md, ts and yaml files with oxfmt.
