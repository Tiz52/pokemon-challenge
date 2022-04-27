/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
