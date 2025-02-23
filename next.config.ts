import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/alfariz-me",
  output: "export",
  reactStrictMode: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
},
};

// export default nextConfig;
module.exports = nextConfig;
