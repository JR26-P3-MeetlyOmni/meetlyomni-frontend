# Internationalization (i18n) Setup Guide

This guide explains how to set up and use internationalization (i18n) in your Next.js project using `next-intl`.

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Configuration Files](#configuration-files)
4. [Message Files](#message-files)
5. [Usage in Components](#usage-in-components)
6. [Adding New Locales](#adding-new-locales)
7. [Best Practices](#best-practices)

## Installation

### Step 1: Install next-intl

```bash
npm install next-intl
# or
yarn add next-intl
# or
pnpm add next-intl
```

### Step 2: Verify Installation

Check your `package.json` to ensure `next-intl` is listed in dependencies:

```json
{
  "dependencies": {
    "next-intl": "^4.3.4"
  }
}
```

## Project Structure

Your i18n setup follows this structure:

```
src/
├── i18n/
│   ├── routing.ts      # Locale configuration
│   ├── request.ts      # Request configuration
│   └── navigation.ts   # Navigation utilities
├── app/
│   └── [locale]/       # Dynamic locale routing
│       ├── layout.tsx  # Locale layout
│       └── page.tsx    # Page components
└── middleware.ts       # Middleware for locale handling

messages/
├── en.json            # English translations
└── zh.json            # Chinese translations
```

## Configuration Files

### 1. Routing Configuration (`src/i18n/routing.ts`)

This file defines which locales are supported:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // List of all supported locales
  locales: ['en', 'zh'],

  // Default locale when none is specified
  defaultLocale: 'en',
});
```

### 2. Request Configuration (`src/i18n/request.ts`)

This file handles loading messages for each locale:

```typescript
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 3. Navigation Utilities (`src/i18n/navigation.ts`)

Provides locale-aware navigation functions:

```typescript
import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

### 4. Middleware (`src/middleware.ts`)

Handles locale detection and routing:

```typescript
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
```

## Message Files

### Location: `/messages/`

Create JSON files for each locale in the `messages` directory.

### Example: `messages/en.json`

```json
{
  "HomePage": {
    "title": "Hello world!",
    "about": "Go to the about page"
  },
  "Navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  },
  "Common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

### Example: `messages/zh.json`

```json
{
  "HomePage": {
    "title": "你好!",
    "about": "导航到关于页面"
  },
  "Navigation": {
    "home": "首页",
    "about": "关于",
    "contact": "联系"
  },
  "Common": {
    "loading": "加载中...",
    "error": "发生错误",
    "save": "保存",
    "cancel": "取消"
  }
}
```

## Usage in Components

### 1. Server Components

```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
```

### 2. Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  );
}
```

### 3. Using Navigation with Locales

```typescript
'use client';

import { Link, useRouter } from '@/i18n/navigation';

export default function LocaleSwitcher() {
  const router = useRouter();

  return (
    <div>
      <Link href="/" locale="en">English</Link>
      <Link href="/" locale="zh">中文</Link>

      {/* Programmatic navigation */}
      <button onClick={() => router.push('/', { locale: 'en' })}>
        Switch to English
      </button>
    </div>
  );
}
```

## Adding New Locales

### Step 1: Update Routing Configuration

Add the new locale to `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en', 'zh', 'es'], // Add 'es' for Spanish
  defaultLocale: 'en',
});
```

### Step 2: Create Message File

Create `messages/es.json`:

```json
{
  "HomePage": {
    "title": "¡Hola mundo!",
    "about": "Ir a la página sobre"
  }
}
```

### Step 3: Update Locale Layout

The `[locale]` dynamic route will automatically handle the new locale.

## Best Practices

### 1. Message Organization

- Group related messages under meaningful keys
- Use nested objects for better organization
- Keep message keys descriptive and consistent

### 2. Translation Keys

```json
{
  "UserProfile": {
    "welcome": "Welcome, {name}!",
    "lastLogin": "Last login: {date}",
    "settings": {
      "title": "Settings",
      "language": "Language",
      "theme": "Theme"
    }
  }
}
```

### 3. Using Parameters

```typescript
const t = useTranslations('UserProfile');

// With parameters
<h1>{t('welcome', { name: 'John' })}</h1>
<p>{t('lastLogin', { date: '2024-01-15' })}</p>
```

### 4. Pluralization

```json
{
  "Items": {
    "count": "{count, plural, =0 {No items} one {# item} other {# items}}"
  }
}
```

### 5. Date and Number Formatting

```typescript
import { useFormatter } from 'next-intl';

export default function DateExample() {
  const format = useFormatter();
  const date = new Date();

  return (
    <div>
      <p>{format.dateTime(date, { dateStyle: 'long' })}</p>
      <p>{format.number(1234.56, { style: 'currency', currency: 'USD' })}</p>
    </div>
  );
}
```

## Testing Your Setup

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Test different locales:**
   - Visit `http://localhost:3000/en` for English
   - Visit `http://localhost:3000/zh` for Chinese

3. **Test locale switching:**
   - Use the locale switcher component
   - Manually change URLs to test routing

## Troubleshooting

### Common Issues:

1. **Messages not loading:**
   - Check file paths in `request.ts`
   - Ensure JSON files are valid
   - Verify locale names match exactly

2. **Navigation not working:**
   - Ensure middleware is properly configured
   - Check that `[locale]` folder structure is correct

3. **TypeScript errors:**
   - Install `@types/next-intl` if needed
   - Check import statements

### Getting Help:

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

This setup provides a robust foundation for internationalizing your Next.js application. The structure is scalable and follows Next.js 13+ App Router conventions.
