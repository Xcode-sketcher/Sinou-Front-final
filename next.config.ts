import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', '@tabler/icons-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    // Validação das variáveis de ambiente obrigatórias
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const processingApiUrl = process.env.NEXT_PUBLIC_PROCESSING_API_URL;

    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is required');
    }
    if (!processingApiUrl) {
      throw new Error('NEXT_PUBLIC_PROCESSING_API_URL is required');
    }

    return [
      {
        source: '/api/FacialAnalysis/:path*',
        destination: `${processingApiUrl}/api/FacialAnalysis/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
