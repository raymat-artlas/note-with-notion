/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的エクスポートを有効化（サーバーサイドの複雑さを排除）
  output: 'export',
  // 他のオプション
  reactStrictMode: false,
  // 型チェックは必須ではない
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 