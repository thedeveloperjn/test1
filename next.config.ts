/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // ✅ Add this line to allow Sanity image URLs
  },
};

module.exports = nextConfig;
