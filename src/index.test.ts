import config from ".";
import lint from "@commitlint/lint";
import load from "@commitlint/load";
import { describe, expect, it } from "vitest";

/**
 * The estate's allowed Conventional-Commit types — kept in lock-step with the
 * `type-enum` override in `./index.ts`. Duplicated here deliberately so the test
 * is an independent spec of the intended list, not a tautology over the source.
 */
const ALLOWED_TYPES = [
  "feat",
  "fix",
  "perf",
  "revert",
  "chore",
  "docs",
  "ci",
  "build",
  "refactor",
  "test",
  "style",
] as const;

// Resolve the config the way commitlint itself does: `load` walks `extends`,
// merging `@commitlint/config-conventional`'s defaults under our `type-enum`
// override, so the tests exercise the *effective* ruleset a consumer gets.
// The default conventional-commits parser handles `type: subject` correctly for
// every assertion below, so no `parserOpts` override is needed.
const { defaultIgnores, ignores, rules } = await load(config);

function lintMessage(message: string) {
  return lint(message, rules, {
    defaultIgnores,
    ignores,
  });
}

describe("@acme-studio/commitlint-config", () => {
  it("extends @commitlint/config-conventional", () => {
    expect(config.extends).toContain("@commitlint/config-conventional");
  });

  it("pins type-enum to the estate's allowed types", () => {
    expect(config.rules?.["type-enum"]).toEqual([
      2,
      "always",
      [...ALLOWED_TYPES],
    ]);
  });

  it.each(ALLOWED_TYPES)("accepts a `%s` commit", async (type) => {
    const { valid } = await lintMessage(`${type}: describe the change`);
    expect(valid).toBe(true);
  });

  it("rejects a type outside the allowed set", async () => {
    const { errors, valid } = await lintMessage("wip: half-done work");
    expect(valid).toBe(false);
    expect(errors.map((error) => error.name)).toContain("type-enum");
  });

  it("retains the config-conventional default rejecting an empty subject", async () => {
    const { errors, valid } = await lintMessage("feat:");
    expect(valid).toBe(false);
    expect(errors.map((error) => error.name)).toContain("subject-empty");
  });

  it("ignores merge, revert, fixup and squash commits via defaultIgnores", async () => {
    for (const message of [
      "Merge branch 'main' into feature",
      'Revert "feat: something"',
      "fixup! feat: something",
      "squash! feat: something",
    ]) {
      const { valid } = await lintMessage(message);
      expect(valid).toBe(true);
    }
  });
});
