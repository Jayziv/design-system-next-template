/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows Next.js to process the design system package so that
  // "use client" directives are respected in App Router.
  transpilePackages: ["@jayziv/design-system-core"],
};

export default nextConfig;
