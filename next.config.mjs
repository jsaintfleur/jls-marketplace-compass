/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Type errors still fail the build; lint runs via `npm run lint` (kept out of the
  // build step so a lint nit never blocks a deploy). CI runs lint separately.
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
