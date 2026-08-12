import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "quotes": ["error", "double", { "avoidEscape": true }],

      "semi": ["error", "always"],

      "prefer-arrow-callback": "error",
      "func-style": ["error", "expression"],
    },
  },
];