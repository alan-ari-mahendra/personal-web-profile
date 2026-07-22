import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-auth", "@better-auth/core"],
  // Lets the dev server (including HMR) accept requests through an ngrok
  // tunnel, needed because n8n must call back to a publicly reachable URL
  // when testing the /demo webhook flow locally. Wildcard is dev-only.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app"],
  images: {
    localPatterns: [{ pathname: "/avatars/**" }],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
