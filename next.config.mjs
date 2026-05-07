/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // تحديد البورت الافتراضي
  env: {
    PORT: '5000',
  },
  async rewrites() {
    return [
      {
        source: '/05-Inventory/:path*',
        destination: '/modules/05-Inventory/:path*',
      },
      {
        source: '/01-hospital/:path*',
        destination: '/modules/01-hospital/:path*',
      },
      {
        source: '/02-GeneralDefinition/:path*',
        destination: '/modules/02-GeneralDefinition/:path*',
      },
      {
        source: '/03-MedecalDefinition/:path*',
        destination: '/modules/03-MedicalDefinition/:path*',
      },
      {
        source: '/04-DealingViews/:path*',
        destination: '/modules/04-DealingViews/:path*',
      },
      {
        source: '/06-Financial/:path*',
        destination: '/modules/06-Financial/:path*',
      },
    ]
  },
}

export default nextConfig
