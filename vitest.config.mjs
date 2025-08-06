import { defineConfig } from 'vitest/config';
import path from 'path';

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
      '**/index.tsx'
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
        'src/i18n/**',
    
        // Ignore page layouts and routing shells
        'src/**/layout.tsx',
        'src/**/page.tsx',
    
        // Ignore barrel/index files
        'src/**/index.ts',
    
        // Ignore pure type definition files
        'src/**/interface.ts',
        'src/types/**',
    
        // Ignore state management setup files
        'src/store/store.ts',
        'src/store/provider.tsx',
    
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
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets') 
    }
  }
}); 