import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  transpilePackages: ['firebase', '@firebase/app', '@firebase/firestore', '@firebase/auth'],
};

export default nextConfig;
