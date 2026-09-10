import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    localPatterns: [
      { pathname: "/images/**", search: "" },
      { pathname: "/images/**", search: "?v=2" },
    ],
  },
};

export default nextConfig;
