/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{
      source: '/api/:path*',
      destination: 'https://us.api.blizzard.com/:path*'
    }]
  }
}

module.exports = nextConfig
