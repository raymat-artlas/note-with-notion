import '../app/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Headerコンポーネントを動的インポートしてサーバーサイドでの実行を避ける
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>note with Notion</title>
        <meta name="description" content="ウェブページのハイライトをNotionに保存" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
} 