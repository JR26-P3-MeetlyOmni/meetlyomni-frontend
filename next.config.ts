import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 完全禁用trace功能
  experimental: {
    // 禁用所有可能导致权限问题的功能
    trace: false,
    telemetry: false,
    instrumentationHook: false,
  },
  // 禁用输出文件追踪
  outputFileTracing: false,
  // 禁用静态分析
  staticPageGenerationTimeout: 0,
  // 禁用webpack分析
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
