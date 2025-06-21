module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
  plugins: [],
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    "no-console": "off",
  },
  overrides: [
    {
      // Without this, `npx eslint .` doesn't run on jsx files.
      files: ["*.js", "*.jsx"],
    },
  ],
};
