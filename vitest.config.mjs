import path from 'path';
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
        '.storybook/**',
        '**/*.stories.{js,ts,jsx,tsx}',
        '**/*.config.{js,ts}',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/index.ts',
        '**/index.tsx',
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
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets'),
    },
  },
});
