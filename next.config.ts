import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.run.linkworld.ai", "run.linkworld.ai"],
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
