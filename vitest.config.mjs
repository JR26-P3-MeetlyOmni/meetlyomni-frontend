import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['@testing-library/jest-dom/vitest'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules/**', 
      '.storybook/**', 
      'storybook-static/**',
      '**/*.stories.{js,ts,jsx,tsx}',
      '**/index.ts',
      '**/index.tsx',
      'src/app/api/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        // Ignore build and system folders
        'node_modules/**',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        'storybook-static/**',
    
        // Ignore config, declaration, and environment files
        '.storybook/**',
        '**/*.config.{js,ts,mjs}',
        '**/*.d.ts',
        'next-env.d.ts',
    
        // Ignore storybook and story files
        '**/*.stories.{js,ts,jsx,tsx}',
        'src/stories/**',
    
        // Ignore styling, theming, and internationalization
        'src/theme/**',
    
        // Ignore Mock API, page layouts and routing shells
        'src/**/layout.tsx',
        'src/**/page.tsx',
        'src/app/api/**',
    
        // Ignore barrel/index files
        'src/**/index.ts',
    
        // Ignore pure type definition files
        'src/**/interface.ts',
        'src/types/**',
    
        // Ignore state management setup files
        'src/store/store.ts',
        'src/store/provider.tsx',
        'src/store/hooks.ts',
    
        // Ignore Next.js middleware (usually logic-less)
        'middleware.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'public/assets'),
      '@': resolve(__dirname, 'src'),
    }
  }
}); 