/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Three.js in dev without transpilation issues
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei"],
  },
};

module.exports = nextConfig;
