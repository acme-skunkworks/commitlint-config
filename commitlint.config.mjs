// Dogfood the local built ruleset. Consumers of the published package use
// `extends: ["@acme-studio/commitlint-config"]` instead — this package
// cannot cleanly depend on its own published name.
export default {
  extends: ["./dist/index.js"],
};
