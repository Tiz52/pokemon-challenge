/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "firebasestorage.googleapis.com",
      "c0.klipartz.com",
    ],
  },
};

module.exports = nextConfig;
