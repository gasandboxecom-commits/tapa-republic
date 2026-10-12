import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tapa-republic",
  assetPrefix: "/tapa-republic/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
