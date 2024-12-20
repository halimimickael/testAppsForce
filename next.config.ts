import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'], // Add the domain to the allowed list
  },
};

export default nextConfig;