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
      "build/**/*",
      "src/stories/**/*"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs["flat/recommended"],
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        }
      ],
      "@typescript-eslint/no-enum": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-new-wrappers": "error",
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "complexity": ["error", { max: 10 }],
      "import/no-cycle": "error",
      "max-lines-per-function": ["error", { max: 60, skipBlankLines: true, skipComments: true }],
      "no-console": "error",
      "no-debugger": "error",
      "no-duplicate-case": "error",
      "no-extra-boolean-cast": "error",
      "no-implied-eval": "error",
      "no-restricted-globals": ["error", {
        "name": "document",
        "message": "Use React refs instead of direct DOM manipulation"
      }],
      "no-unused-vars": "off", 
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-no-bind": "error",
      "react/jsx-no-leaked-render": "error",
      "react/no-danger": "error"
    }
  }
];

export default eslintConfig;