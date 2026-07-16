---
title: "Author @acme-skunkworks/commitlint-config ruleset"
release_note: "Adds the shared commitlint ruleset that single-sources the estate's allowed Conventional-Commit types, extending @commitlint/config-conventional."
created_at: "2026-07-16T13:34:53Z"
merged_at:
branch: "a-979-author-acme-skunkworkscommitlint-config-ruleset-src"
pr:
commit:
author: "rob@acmeskunkworks.io"
co_authors: []
category: feature
breaking: false
issues: ["A-979"]
stats:
  files_changed:
  loc_added:
  loc_removed:
  commits:
---

## Added

- The real `src/` ruleset for `@acme-skunkworks/commitlint-config`, replacing
  the template placeholder. It extends `@commitlint/config-conventional` and
  retains every default (header max length, non-empty type/subject, and the
  `defaultIgnores` for merge/revert/fixup commits), pinning `type-enum`
  explicitly to the estate's release-aligned types: `feat`, `fix`, `perf`,
  `revert`, `chore`, `docs`, `ci`, `build`, `refactor`, `test`, `style`. The
  list is declared explicitly so an upstream change to config-conventional's
  own default can never silently move the estate's commit gate.
- Colocated behavioural unit tests that resolve the config through
  `@commitlint/load` and lint sample messages with `@commitlint/lint`, proving
  the effective merged ruleset accepts every allowed type, rejects unknown
  types, retains the empty-subject default, and honours `defaultIgnores`.

## Changed

- Rewrote `README.md` from the inherited template bootstrap guide into a
  package README documenting the allowed types, the `extends` consumption model,
  the `base..head` range-check usage the CI gate and pre-push hook rely on, and
  the float-on-latest version model.
- Added `@commitlint/config-conventional` and `@commitlint/types` as runtime
  dependencies (the former is extended, the latter is referenced by the
  published type declarations), and widened the vitest and tools tsconfig globs
  to pick up the colocated `src` test.
