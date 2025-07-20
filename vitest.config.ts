import { defineConfig } from 'vitest/config';

// 来自『基础编码原则与最佳实践』+ 『P3 Code Review 指南』+ 『Typescript Best Practice』
export default defineConfig({
  test: {
    // ===== 基础配置 =====
    environment: 'jsdom',
    globals: true,

    // ===== 来自『P3 Code Review 指南』：单元测试覆盖率≥80% =====
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
      ],
      thresholds: {
        global: {
          branches: 80, // 分支覆盖率 ≥80%
          functions: 80, // 函数覆盖率 ≥80%
          lines: 80, // 行覆盖率 ≥80%
          statements: 80, // 语句覆盖率 ≥80%
        },
      },
    },

    // ===== 测试文件配置 =====
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules/**',
      '.storybook/**',
      '**/*.stories.{js,ts,jsx,tsx}',
      '**/coverage/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
    ],

    // ===== 测试环境配置 =====
    setupFiles: ['vitest.shims.d.ts'],

    // ===== 测试超时配置 =====
    testTimeout: 10000, // 10秒超时
  },
});
