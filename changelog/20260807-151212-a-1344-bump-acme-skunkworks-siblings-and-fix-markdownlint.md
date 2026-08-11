---
title: Bump @acme-skunkworks siblings and fix markdownlint 3.x fallout
release_note: ""
created_at: "2026-08-07T15:12:12Z"
merged_at:
branch: a-1344-commitlint-config-bump-acme-skunkworks-devdeps-and-fix-lint
pr:
commit:
author: rob@acmeskunkworks.io
co_authors: []
category: chore
breaking: false
issues:
  - A-1344
stats:
  files_changed:
  loc_added:
  loc_removed:
  commits:
version:
---

## Changed

**Bump sibling `@acme-skunkworks/*` devDeps and adapt to markdownlint-config 3.x ([A-1344](https://linear.app/rheged-studio/issue/A-1344))**

- Raise `@acme-skunkworks/changelog-core` to `^1.1.1`, `@acme-skunkworks/eslint-config` to `^1.1.3`, and `@acme-skunkworks/markdownlint-config` to `^3.0.0` (leave self at 1.0.1)
- Exclude vendored skill trees and fan-out `AGENTS.md` from markdownlint (cli2 config, `lint:md` scripts, CI `markdown-globs`)
- Fix first-party MD040/MD044 findings in `infrastructure/README.md` and `README.md`
