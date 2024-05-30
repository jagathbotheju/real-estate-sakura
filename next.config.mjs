/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "utfs.io/f",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
