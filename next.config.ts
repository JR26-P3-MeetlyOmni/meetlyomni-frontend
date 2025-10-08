/** @type {import('next').NextConfig} */
const nextConfig = (() => {
  // get cdn hostname from environment variable
  const cdnHostname = process.env.NEXT_PUBLIC_CDN_HOSTNAME;
  if (!cdnHostname) {
    throw new Error('NEXT_PUBLIC_CDN_HOSTNAME environment variable is required');
  }

  const isDev = process.env.NODE_ENV === 'development';

  return {
    // Enable standalone output for Docker optimization
    output: 'standalone',

    // new config for images
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: cdnHostname,
          pathname: '/**', // can be more specific if needed
        },
      ],
      unoptimized: isDev,
    },
  };
})();

export default nextConfig;
