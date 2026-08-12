import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: [
    "@lifi/widget",
    "@lifi/widget-provider-ethereum",
    "@lifi/widget-provider",
    "@lifi/wallet-management",
    "@wagmi/connectors",
    "wagmi",
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
