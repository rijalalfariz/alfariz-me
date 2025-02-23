import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/alfariz-me",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  distDir: 'out',
  trailingSlash: true
};

// export default nextConfig;
module.exports = nextConfig;
