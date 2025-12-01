// .eslintrc.js at the root of your monorepo
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // integrates prettier with eslint
  ],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["node_modules", "dist", "build"],
};
