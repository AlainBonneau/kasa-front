import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["s3-eu-west-1.amazonaws.com", "rightathomerealtyinc.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
