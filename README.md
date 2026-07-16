# @acme-skunkworks/commitlint-config

Shared [commitlint](https://commitlint.js.org) configuration for ACME Skunkworks packages.

It **single-sources** the estate's allowed [Conventional Commit](https://www.conventionalcommits.org) types into one published package, consumed by both layers of the commit gate so the ruleset can never drift between them:

- the reusable CI workflow (`reusable-validate-commits.yml`) that validates a PR's `base..head` commit range, and
- the local husky `pre-push` hook that runs the same range check before a push ever reaches CI.

It extends [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional) and retains all of its defaults — only the list of allowed commit types is pinned to the estate's set.

## Install

```sh
pnpm add -D @acme-skunkworks/commitlint-config @commitlint/cli
```

`@commitlint/config-conventional` is a runtime dependency of this package, so installing this config pulls it in automatically — you do not need to add it yourself.

## Usage

Point your commitlint config at this package:

```js
// commitlint.config.js
export default {
  extends: ["@acme-skunkworks/commitlint-config"],
};
```

Then validate a commit-message range — exactly what the CI workflow and the pre-push hook do:

```sh
# lint every commit on the branch that isn't on the base
pnpm exec commitlint --from "origin/main" --to "HEAD"
```

## Allowed commit types

The `type-enum` rule is set explicitly and is aligned to the estate's release-please bump rules:

| Type       | Release bump | Notes                                  |
| ---------- | ------------ | -------------------------------------- |
| `feat`     | minor        | A new feature                          |
| `fix`      | patch        | A bug fix                              |
| `perf`     | patch        | A performance improvement              |
| `revert`   | patch        | Reverts a previous commit              |
| `chore`    | none         | Tooling / housekeeping                 |
| `docs`     | none         | Documentation only                     |
| `ci`       | none         | CI configuration and pipelines         |
| `build`    | none         | Build system or external dependencies  |
| `refactor` | none         | Neither fixes a bug nor adds a feature |
| `test`     | none         | Adding or correcting tests             |
| `style`    | none         | Formatting; no code-behaviour change   |

A `!` marker or a `BREAKING CHANGE:` footer promotes any type to a **major** bump.

Everything else is inherited from `@commitlint/config-conventional` unchanged, including:

- a non-empty commit type and subject,
- the header max-length limit, and
- `defaultIgnores` — merge (`Merge …`), revert (`Revert …`), `fixup!` and `squash!` messages are skipped automatically, so this config never needs to blanket-ignore them by author identity.

## Versioning: float on latest

Consumers **float** on this package's latest published version rather than pinning it — mirroring how the estate consumes its shared GitHub workflows (`@v1`). A ruleset change therefore rolls out estate-wide on each consumer's next install, with no per-repo bump PR.

The trade-off is deliberate: because a change here takes effect everywhere on next install, ruleset edits must be made carefully. The package is Dependabot-versioned like the estate's other shared packages, so consumers that do want a lockfile record still get update PRs.

## Development

```sh
pnpm install
pnpm build   # tsc → dist/ (the published artifact)
pnpm test    # vitest — behavioural tests over the resolved ruleset
pnpm tsc     # type-check
pnpm lint    # eslint
```

The ruleset itself is `src/index.ts`; `src/index.test.ts` exercises the *effective* config by resolving `extends` through `@commitlint/load` and linting sample messages with `@commitlint/lint`.

## Licence

MIT
