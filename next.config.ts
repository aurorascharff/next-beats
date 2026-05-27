import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    cachedNavigations: true,
    instantInsights: {
      validationLevel: 'warning',
    },
    instantNavigationDevToolsToggle: true,
    useOffline: true,
    viewTransition: true,
  },
  typedRoutes: true,
};

export default nextConfig;
