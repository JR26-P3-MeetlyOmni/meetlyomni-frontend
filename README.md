# Meetly Omni Frontend

This project is a web application initialized with a modern frontend stack, featuring comprehensive code quality controls through Husky git hooks.

## Tech Stack

| Technology        | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| React.js          | Main framework for building the UI.                             |
| Next.js           | Framework for production-grade React applications (App Router). |
| Redux + Toolkit   | For predictable state management.                               |
| Styled-Components | For component-level CSS-in-JS styling.                          |
| MUI (Material-UI) | A comprehensive UI component library.                           |
| Vitest            | A blazing fast unit test framework.                             |
| Storybook         | For UI component development, testing, and documentation.       |
| Husky             | For managing Git hooks easily.                                  |
| Node.js v20 LTS   | The required runtime environment.                               |

## Code Quality Control

This repository implements comprehensive code quality checks through **Husky git hooks** that automatically run on every `git commit`. The quality standards are based on **JR P3 Onboarding: Dev & DevOps & BA Notion** requirements.

### Quality Check Tools

- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting and import sorting
- **TypeScript**: Type checking and strict mode validation
- **Vitest**: Unit testing with 80% coverage requirement

### Code Quality Rules

The following rules are automatically enforced based on JR P3 Onboarding requirements:

| Tool           | Rule/Recommendation       | Current Configuration Status | Configuration File Location    | Detailed Description                                            | Document Source                  |
| -------------- | ------------------------- | ---------------------------- | ------------------------------ | --------------------------------------------------------------- | -------------------------------- |
| **ESLint**     | 禁止 console.log/debugger | ✅ 已配置                    | `eslint.config.mjs`            | `no-console: error`, `no-debugger: error`                       | 基础编码原则                     |
| **ESLint**     | 单一职责SRP               | ✅ 已配置                    | `eslint.config.mjs`            | `max-lines-per-function: 60` (比要求的40行更严格)               | 基础编码原则                     |
| **ESLint**     | 无循环依赖                | ✅ 已配置                    | `eslint.config.mjs`            | `import/no-cycle: error`                                        | P3指南                           |
| **ESLint**     | 函数≤40行                 | ✅ 已配置                    | `eslint.config.mjs`            | `max-lines-per-function: 60` (更严格)                           | P3指南                           |
| **ESLint**     | 禁止any类型               | ✅ 已配置                    | `eslint.config.mjs`            | `@typescript-eslint/no-explicit-any: error`                     | P3指南, Typescript最佳实践       |
| **ESLint**     | React.memo/useCallback    | ✅ 已配置                    | `eslint.config.mjs`            | `react/jsx-no-bind: error`, `react/jsx-no-leaked-render: error` | P3指南                           |
| **ESLint**     | 禁止document.write        | ✅ 已配置                    | `eslint.config.mjs`            | `no-restricted-globals: error` (禁止 document)                  | Frontend Checklist               |
| **ESLint**     | 减少选择器复杂度          | ❌ 未配置                    | -                              | 需要添加 CSS 相关规则                                           | 渲染性能优化                     |
| **ESLint**     | 禁止强制布局计算          | ❌ 未配置                    | -                              | 需要添加性能相关规则                                            | 渲染性能优化                     |
| **Prettier**   | 不接受纯格式化PR          | ✅ 已配置                    | `.prettierrc` + `package.json` | Prettier 自动格式化 + lint-staged                               | 基础编码原则, P3指南             |
| **Prettier**   | import顺序                | ✅ 已配置                    | `.prettierrc`                  | `importOrder` 配置完整                                          | Typescript最佳实践               |
| **TypeScript** | 严格模式开启              | ✅ 已配置                    | `tsconfig.json`                | `strict: true`                                                  | 基础编码原则, Typescript最佳实践 |
| **TypeScript** | 禁止基础类型包装对象      | ✅ 已配置                    | `eslint.config.mjs`            | `@typescript-eslint/no-new-wrappers: error`                     | Typescript最佳实践               |
| **TypeScript** | 接口命名一致              | ✅ 已配置                    | `eslint.config.mjs`            | `@typescript-eslint/naming-convention`                          | Typescript最佳实践               |
| **TypeScript** | 避免枚举enum              | ✅ 已配置                    | `eslint.config.mjs`            | `@typescript-eslint/no-enum: error`                             | Typescript最佳实践               |
| **单元测试**   | 覆盖率≥80%                | ✅ 已配置                    | `vitest.config.mjs`            | `thresholds: 80%`                                               | P3指南                           |
| **单元测试**   | 使用纯函数设计            | ❌ 未配置                    | -                              | 需要添加函数式编程规则                                          | 基础编码原则                     |
| **单元测试**   | 类型边界测试              | ❌ 未配置                    | -                              | 需要添加测试相关规则                                            | P3指南, Typescript最佳实践       |

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

The following npm scripts are available for this project:

| Script           | Command                 | Description                                                     |
| ---------------- | ----------------------- | --------------------------------------------------------------- |
| Start Dev Server | npm run dev             | Runs the app in development mode with hot reloading.            |
| Build Production | npm run build           | Builds the app for production to the .next folder.              |
| Start Production | npm run start           | Starts the production build locally.                            |
| Lint             | npm run lint            | Runs ESLint to analyze and fix code style issues.               |
| Type Check       | npm run type-check      | Runs TypeScript compiler for type checking.                     |
| Test             | npm run test            | Runs unit tests using Vitest.                                   |
| Test Coverage    | npm run test:coverage   | Runs tests with coverage report.                                |
| Format Code      | npm run format          | Formats code using Prettier.                                    |
| Storybook        | npm run storybook       | Starts Storybook for UI component development at port 6006.     |
| Build Storybook  | npm run build-storybook | Builds the Storybook static site.                               |
| Prepare Husky    | npm run prepare         | Installs Husky git hooks (run automatically after npm install). |

## Git Workflow

### Before Committing

The following checks are automatically performed on staged files:

1. **Code Formatting**: Prettier automatically formats your code
2. **Linting**: ESLint checks for code quality issues
3. **Type Checking**: TypeScript validates type safety
4. **Tests**: Unit tests ensure functionality

### Commit Requirements

- All linting errors must be resolved
- TypeScript compilation must pass
- Unit tests must pass with 80% coverage
- Code must be properly formatted

### Bypassing Hooks (Emergency Only)

If you need to bypass the pre-commit hooks in an emergency:

```bash
git commit --no-verify -m "Emergency commit message"

OR

mv .husky/pre-commit .husky/pre-commit.disabled
```

⚠️ **Warning**: This should only be used in critical situations and the issues should be addressed immediately in the next commit.

## Development Guidelines

1. **Always run tests before committing**: `npm run test`
2. **Check code formatting**: `npm run format`
3. **Verify type safety**: `npm run type-check`
4. **Ensure linting passes**: `npm run lint`

## Troubleshooting

### Common Issues

1. **Pre-commit hook fails**: Run `npm run lint` and `npm run format` to fix issues
2. **Type errors**: Check TypeScript configuration and fix type issues
3. **Test failures**: Ensure all tests pass before committing
4. **Coverage below 80%**: Add more test cases to improve coverage

### Reset Husky Hooks

If git hooks are not working properly:

```bash
npm run prepare
```

This will reinstall all Husky git hooks.
