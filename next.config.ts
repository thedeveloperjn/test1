/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Allow Sanity image URLs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS image URLs
      },
    ],
  },
  transpilePackages: ['lucide-react'], // Transpile specific packages
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
};

module.exports = nextConfig;