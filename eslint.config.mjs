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
      // ===== 来自『基础编码原则与最佳实践』=====
      // 禁止提交包含调试语句或临时注释代码
      "no-console": "error",
      "no-debugger": "error",
      
      // ===== 来自『P3 Code Review 指南』=====
      // 函数不超过40行
      "max-lines-per-function": ["error", { max: 40, skipBlankLines: true, skipComments: true }],
      
      // 禁止使用 any 类型（强类型检查）
      "@typescript-eslint/no-explicit-any": "error",
      
      // ===== 来自『Frontend Checklist for Websites』=====
      // 禁止使用 document.write
      "no-implied-eval": "error",
      
      // ===== React 性能优化相关 =====
      // 正确使用 React.memo、useCallback
      "react-hooks/exhaustive-deps": "error",
      
      // ===== 其他代码质量规则 =====
      // 单一职责原则相关 - 复杂度控制
      "complexity": ["error", { max: 10 }],
      
      // 禁止内联样式和脚本（通过JSX属性检查）
      "react/no-danger": "error",
      
      // ===== 基础代码质量规则 =====
      // 禁止重复的 case 标签
      "no-duplicate-case": "error",
      
      // 禁止不必要的布尔类型转换
      "no-extra-boolean-cast": "error",
      
      // 禁止未使用的变量（基础版）
      "no-unused-vars": "off", // 关闭基础规则，使用TypeScript版本
      "@typescript-eslint/no-unused-vars": ["error", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }]
    }
  }
];

export default eslintConfig;
