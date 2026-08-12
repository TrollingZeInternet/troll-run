import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  transpilePackages: [
    "@relayprotocol/relay-kit-ui",
    "@relayprotocol/relay-kit-hooks",
    "@relayprotocol/relay-sdk",
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
