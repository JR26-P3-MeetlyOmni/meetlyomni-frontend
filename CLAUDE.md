# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

### Testing Commands

- `npm test` or `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report (requires 80% minimum)

### Component Development

- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build static Storybook

### Pre-commit Quality Checks

All commits automatically run:

1. Prettier formatting
2. ESLint with error fixing
3. TypeScript type checking
4. Unit tests with 80% coverage requirement

## Architecture Overview

### Framework Stack

- **Next.js 15** with App Router and TypeScript
- **React 19** as the UI framework
- **Redux Toolkit** for state management with placeholder store
- **Material-UI (MUI)** as the primary component library
- **Styled Components** for custom styling
- **next-intl** for internationalization (English/Chinese)

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes (en, zh)
│   │   ├── (auth)/        # Authentication routes (login, signup)
│   │   ├── (main)/        # Main app routes
│   │   └── layout.tsx     # Locale-specific layout
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable UI components
│   ├── Button/           # Global button component
│   ├── Input/            # Global input component
│   ├── Providers/        # Context providers (MUI)
│   └── QRCode/           # QR code component with stories/tests
├── features/             # Feature-specific components
│   ├── auth/             # Authentication logic and hooks
│   └── hooks/            # Shared feature hooks
├── i18n/                 # Internationalization setup
│   ├── routing.ts        # Locale routing configuration
│   ├── request.ts        # Message loading configuration
│   └── navigation.ts     # Locale-aware navigation utilities
├── store/                # Redux store setup
│   ├── store.ts          # Store configuration (placeholder)
│   └── provider.tsx      # Redux provider wrapper
├── theme/                # MUI theme configuration
└── types/                # TypeScript type definitions
```

### Key Configuration Details

#### Path Aliases (vitest.config.mjs)

- `@/` maps to `./src/`
- `@assets/` maps to `./public/assets/`

#### Internationalization

- Supported locales: `en` (default), `zh`
- Messages stored in `/messages/[locale].json`
- Middleware handles automatic locale routing
- Use `useTranslations()` hook in components
- Navigation with `Link` and `useRouter` from `@/i18n/navigation`

#### State Management

- Redux Toolkit store with placeholder reducer
- ReduxProvider wraps app in `src/app/layout.tsx`
- Store types exported: `RootState`, `AppDispatch`

#### Component Development

- All components have corresponding `.stories.tsx` files for Storybook
- Test files follow `.test.tsx` naming convention
- Export components from `index.ts` files

### Code Quality Standards

- Functions limited to 60 lines maximum
- No `console.log` or `debugger` statements allowed
- No `any` types permitted
- 80% test coverage requirement enforced
- React performance optimizations required (memo, useCallback)
- No direct DOM manipulation (document access restricted)
- Import sorting and formatting enforced by Prettier

### Testing Approach

- **Framework**: Vitest with jsdom environment
- **Coverage**: V8 provider with HTML/JSON reports
- **Location**: Tests in same directory as components (`.test.tsx`)
- **Exclusions**: Stories, config files, and index files excluded from coverage

###login###
请基于以下 Zeplin 设计规范，重写 React + TypeScript + MUI 登录页面组件。

### 📐 **设计要求**

**页面结构：**

1. 全屏白色背景 (1920x1080px)
2. 左上角 Logo 区域：Omni 品牌标识 + 文字
3. 中央主标题：蓝色背景条 + "Welcome to Omni ! Let's Sign in Your Profile"
4. 右侧登录卡片：白色渐变背景，圆角 30px
5. 表单区域：邮箱、密码输入框 + 登录按钮
6. 装饰元素：搜索图标、用户头像卡片、评分图标

**精确布局：**

- Logo: 位置 (160, 70)，26x28px 图标 + "Omni" 文字
- 主标题: 位置 (611, 472)，684x40px，蓝色背景
- 登录卡片: 位置 (730, 116)，460x337px
- 表单: 位置 (754, 576)，412px 宽度
- 搜索图标: 位置 (357, 371)，84x84px 圆形
- 用户卡片 Rachel: 位置 (1404, 264)，204x82px
- 用户卡片 Mark: 位置 (349, 739)，209x97px
- 搜索框: 位置 (1506, 468)，179x42px
- 评分图标: 位置 (1476, 778)，72x72px

**样式规范：**

- 使用 MUI styled components 和 theme
- 精确的颜色值、字体、间距
- 渐变背景、阴影效果
- 响应式设计考虑

**交互功能：**

- 表单验证
- 登录按钮状态管理
- 链接跳转功能
- 错误处理

**图片资源：**

- logo.png, magnifying_glass.png, user_avatar.png, star.png
- 路径：/assets/images/sign-in/

**代码要求：**

- 遵循现有代码的 best practices
- 使用 TypeScript 类型定义
- 组件化设计
- 可维护性和可扩展性
- 性能优化

请生成完整的 page.tsx 文件，包含所有必要的导入、类型定义、样式组件和功能实现。
