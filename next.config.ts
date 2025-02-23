import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/alfariz-me",
  output: "export",
  reactStrictMode: true,
  distDir: 'out',
  trailingSlash: true
};

// export default nextConfig;
module.exports = nextConfig;
