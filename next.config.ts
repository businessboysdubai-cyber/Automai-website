import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Static export: Vercel serves the 'out/' directory directly.
  // Avoids the framework: null routing issue on the Vercel project.
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
