import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules/**',
      '.storybook/**',
      '**/*.stories.{js,ts,jsx,tsx}',
      '**/index.ts',
      '**/index.tsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '.storybook/**',
        '**/*.config.{js,ts,mjs}',
        '**/*.d.ts',
        'next-env.d.ts',
        '**/*.stories.{js,ts,jsx,tsx}',
        'src/stories/**',
        'src/theme/**',
        'src/**/layout.tsx',
        'src/**/page.tsx',
        'src/**/index.ts',
        'src/**/interface.ts',
        'src/types/**',
        'src/store/store.ts',
        'src/store/provider.tsx',
        'src/store/hooks.ts',
        'middleware.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@': resolve(__dirname, 'src'),
    },
  },
});
