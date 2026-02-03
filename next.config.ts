/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: '/konsdatinv', // Must match your repo name exactly
  images: {
    unoptimized: true,
  },
};

export default nextConfig;