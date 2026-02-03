/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  basePath: '/konsdatinv', // Replace with your repository name
  images: {
    unoptimized: true, // Next.js Image Optimization doesn't work with static exports
  },
};

export default nextConfig;