import path from "node:path";
import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage sections are ported as-is from Softr and are loosely typed.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  // The old Top Dog Partners page now lives on For Businesses (same as on Softr).
  async redirects() {
    return [{ source: "/top-dog-partners", destination: "/for-businesses", permanent: true }];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(dir, "src");
    return config;
  },
};
export default nextConfig;
