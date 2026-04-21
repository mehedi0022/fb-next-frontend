/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'freelancerbangladesh.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://demoapi.save71.com/api/v1/:path*',
            },
        ];
    },
};

export default nextConfig;
