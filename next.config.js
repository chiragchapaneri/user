/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ApiKey: process.env.NEXT_PUBLIC_ApiKey,
  },
  images: {
    domains: [
      "virul-dev.s3.amazonaws.com",
      "virul-dev.s3.us-east-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
