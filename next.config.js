/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: false,
  skipWaiting: true,
  sw: "sw.js",
  scope: "/",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
