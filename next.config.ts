import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.monis.rent",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
