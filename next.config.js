/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
  });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Correct domain for raw GitHub files
        port: '',
        pathname: '/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'assets.polygon.technology',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'etherscan.io',
        port: '',
        pathname: '/token/images/**', // Fixed hostname and pathname
      },
      {
        protocol: 'https',
        hostname: 'polygonscan.com',
        port: '',
        pathname: '/token/images/**', // Fixed hostname and pathname
      },
      {
        protocol: 'https',
        hostname: 'github.com', // Fixed the hostname
        port: '',
        pathname: '/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'insuretoken.net', // Fixed the hostname
        port: '',
        pathname: '**/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com', // Fixed the hostname
        port: '',
        pathname: '**/**', // Allow all paths under this domain
      },
    ],
  },
};

module.exports = nextConfig;
