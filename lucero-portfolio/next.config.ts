import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  trailingSlash: process.env.STATIC_EXPORT === "true",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
