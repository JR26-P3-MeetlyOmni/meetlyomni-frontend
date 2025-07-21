// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      ".storybook/**/*",
      "coverage/**/*",
      "dist/**/*",
      "build/**/*"
      
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "max-lines-per-function": ["error", { max: 40, skipBlankLines: true, skipComments: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "no-implied-eval": "error",
      "react-hooks/exhaustive-deps": "error",
      "complexity": ["error", { max: 10 }],
      "react/no-danger": "error",
      "no-duplicate-case": "error",
      "no-extra-boolean-cast": "error",
      "no-unused-vars": "off", 
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }]
    }
  }
];

export default eslintConfig;
