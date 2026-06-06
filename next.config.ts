import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    inlineCss: true,
    appShells: true,
    useOffline: true,
    viewTransition: true,
  },
  typedRoutes: true,
};

export default nextConfig;
