/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 静的生成モードを無効化し、サーバーサイドレンダリングを強制
  output: 'standalone',
  
  experimental: {
    // ハイドレーションの対応強化
    optimizeCss: false,
    
    // チャンク読み込みの問題を修正
    optimizePackageImports: ['react', 'react-dom', 'next'],
    
    // Firebaseパッケージを外部化
    serverComponentsExternalPackages: ['firebase', '@firebase/auth'],
    
    // クライアントコンポーネントの参照を許可
    serverActions: {
      allowedOrigins: ['localhost:3000', 'note-with-notion.vercel.app']
    }
  },
  
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
    // unoptimizedは不要になるので削除
    // unoptimized: true,
  },
  
  // 環境変数を明示的に公開
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  },
  
  // ウェブパックの設定をカスタマイズして問題に対処
  webpack: (config, { dev, isServer }) => {
    // メモリリークやチャンク読み込みの問題に対応
    config.optimization.runtimeChunk = false;
    
    if (!isServer) {
      // クライアントサイドのバンドルサイズを最適化
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000
      };
    }
    
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    
    // Firebaseを適切に処理する設定
    if (!isServer) {
      // 以下のエイリアス設定を完全に削除
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   'firebase/app': 'firebase/app/dist/index.esm.js',
      //   'firebase/auth': 'firebase/auth/dist/index.esm.js',
      //   'firebase/firestore': 'firebase/firestore/dist/index.esm.js',
      // };
    }
    
    // Firebaseのためのpolyfills設定
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        http2: false
      };
    }
    
    return config;
  },
  generateEtags: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  transpilePackages: ['@firebase/app', '@firebase/firestore'],
  
  // エラーチェックを一時的に無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScriptチェックも一時的にオフに
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;