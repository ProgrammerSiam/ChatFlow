import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.pet.com.bd',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.petfoodprocessing.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
