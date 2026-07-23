---
title: "Add commitlint pre-push range check"
release_note:
created_at: "2026-07-23T13:43:36Z"
merged_at:
branch: "a-982-add-commitlint-pre-push-range-check-to-husky-estate-fan-out"
pr:
commit:
author: "rob@acmeskunkworks.io"
co_authors: []
category: chore
breaking: false
issues: ["A-982"]
stats:
  files_changed:
  loc_added:
  loc_removed:
  commits:
---

## Added

- Best-effort `commitlint --from origin/main --to HEAD` check in `.husky/pre-push`
  ([A-982](https://linear.app/acme-skunkworks/issue/A-982)), alongside the existing yamllint/actionlint steps. Skips with an
  installation hint when `@commitlint/cli` is missing or when `dist/index.js` is absent
  (this repo's config extends the built artefact; run `pnpm build` after clone/clean);
  bypassable with `git push --no-verify`. Complements CI's `reusable-validate-commits`
  gate rather than replacing it.
- Local `commitlint.config.mjs` that extends `./dist/index.js` so this package
  dogfoods its own ruleset (consumers still use `@acme-skunkworks/commitlint-config`).
- `@commitlint/cli` as a devDependency for the local range check.

## Changed

- Documented the pre-push commitlint dogfood path in `CLAUDE.md`.
