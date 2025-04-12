/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 最小限の設定
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
  
  // ビルドエラーは無視
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;