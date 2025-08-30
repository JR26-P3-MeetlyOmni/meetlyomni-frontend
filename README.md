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

| Tool           | Rule/Recommendation                   | Current Configuration Status | Configuration File Location    | Detailed Description                                            | Document Source                                    |
| -------------- | ------------------------------------- | ---------------------------- | ------------------------------ | --------------------------------------------------------------- | -------------------------------------------------- |
| **ESLint**     | No console.log/debugger               | Configured                   | `eslint.config.mjs`            | `no-console: error`, `no-debugger: error`                       | Basic Coding Principles                            |
| **ESLint**     | Single Responsibility Principle (SRP) | Configured                   | `eslint.config.mjs`            | `max-lines-per-function: 60` (stricter than required 40 lines)  | Basic Coding Principles                            |
| **ESLint**     | No circular dependencies              | Configured                   | `eslint.config.mjs`            | `import/no-cycle: error`                                        | P3 Guidelines                                      |
| **ESLint**     | Function ≤ 60 lines                   | Configured                   | `eslint.config.mjs`            | `max-lines-per-function: 60` (stricter)                         | P3 Guidelines                                      |
| **ESLint**     | No any type                           | Configured                   | `eslint.config.mjs`            | `@typescript-eslint/no-explicit-any: error`                     | P3 Guidelines, TypeScript Best Practices           |
| **ESLint**     | React.memo/useCallback                | Configured                   | `eslint.config.mjs`            | `react/jsx-no-bind: error`, `react/jsx-no-leaked-render: error` | P3 Guidelines                                      |
| **ESLint**     | No document.write                     | Configured                   | `eslint.config.mjs`            | `no-restricted-globals: error` (forbidden document)             | Frontend Checklist                                 |
| **Prettier**   | No pure formatting PRs                | Configured                   | `.prettierrc` + `package.json` | Prettier auto-formatting + lint-staged                          | Basic Coding Principles, P3 Guidelines             |
| **Prettier**   | Import order                          | Configured                   | `.prettierrc`                  | `importOrder` complete configuration                            | TypeScript Best Practices                          |
| **TypeScript** | Strict mode enabled                   | Configured                   | `tsconfig.json`                | `strict: true`                                                  | Basic Coding Principles, TypeScript Best Practices |
| **Unit Tests** | Coverage ≥ 80%                        | Configured                   | `vitest.config.mjs`            | `thresholds: 80%`                                               | P3 Guidelines                                      |

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

**Warning**: This should only be used in critical situations and the issues should be addressed immediately in the next commit.

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
// texst
