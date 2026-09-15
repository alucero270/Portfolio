import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  trailingSlash: process.env.STATIC_EXPORT === "true",
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
