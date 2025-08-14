import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'vercel.app', 'media.istockphoto.com', 'images.unsplash.com', "imagedelivery.net","encrypted-tbn0.gstatic.com","encrypted-tbn0.gstatic.com","www.asortie.com"],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withNextIntl(nextConfig);
