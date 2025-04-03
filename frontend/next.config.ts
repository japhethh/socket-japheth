import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable WebSocket support
  experimental: {
    serverComponentsExternalPackages: ['socket.io'],
  },
};

export default nextConfig;
