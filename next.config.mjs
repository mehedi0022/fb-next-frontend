/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "freelancerbangladesh.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "demoapi.save71.com" },
      { protocol: "http", hostname: "localhost", port: "5000" },
    ],
  },

  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        source: "/api/:path*",
        destination: isProd
          ? "https://demoapi.save71.com/api/v1/:path*"
          : "http://localhost:5000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
