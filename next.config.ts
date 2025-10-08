/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Your existing Next.js config

  // new config for images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
