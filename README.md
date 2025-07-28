# Meetly Omni Frontend

This project is a web application initialized with a modern frontend stack.

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
| Test             | npm run test            | Runs unit tests using Vitest.                                   |
| Storybook        | npm run storybook       | Starts Storybook for UI component development at port 6006.     |
| Build Storybook  | npm run build-storybook | Builds the Storybook static site.                               |
| Prepare Husky    | npm run prepare         | Installs Husky git hooks (run automatically after npm install). |

## Test Coverage & Git Hook

This project enforces a minimum **80 %** test coverage and prevents regressions on every `git push`.

To run the same check locally without pushing:

```bash
npm run check-coverage
```

If any of `branches`, `functions`, `lines`, or `statements` drops below 80 % **or** below the value on the `dev` branch, the script (and the push) will fail and print both the previous and new percentages along with guidance on adding or improving tests.
