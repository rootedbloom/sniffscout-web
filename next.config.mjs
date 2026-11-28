import path from "node:path";
import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage sections are ported as-is from Softr and are loosely typed.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  // Old Softr addresses, so saved links and Google results keep working.
  async redirects() {
    return [
      // The old Top Dog Partners page now lives on For Businesses (same as on Softr).
      { source: "/top-dog-partners", destination: "/for-businesses", permanent: true },
      // Earlier versions of pages that Softr still published.
      { source: "/directory-old", destination: "/directory", permanent: true },
      { source: "/submit-a-place-old", destination: "/submit-a-place", permanent: true },
      { source: "/claim-your-business-old", destination: "/claim-your-business", permanent: true },
      // Softr preview form pages that were linked before launch.
      { source: "/claim-preview", destination: "/claim-your-business", permanent: true },
      { source: "/submit-place-preview", destination: "/submit-a-place", permanent: true },
      // Softr's built-in account pages. The new site has no logins, so send visitors home.
      ...["/login", "/sign-up", "/account", "/forgot-password", "/reset-password", "/onboarding", "/link-expired", "/401"].map((source) => ({ source, destination: "/", permanent: false })),
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(dir, "src");
    return config;
  },
};
export default nextConfig;
