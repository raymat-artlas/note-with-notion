import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Header from '@/components/Header';
import ClientLayout from '@/components/ClientLayout';
import { dynamic, revalidate, fetchCache, runtime } from './config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'note with Notion',
  description: 'ウェブページのハイライトをNotionに保存',
};

export function reportWebVitals(metric) {
  console.log('Web Vitals:', metric);
}

export { dynamic, revalidate, fetchCache, runtime };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          body { opacity: 1; transition: opacity 0.5s; }
          .loading { display: flex; justify-content: center; align-items: center; height: 100vh; }
        `}} />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="min-h-screen">
            <ClientLayout>
              {children}
            </ClientLayout>
          </main>
        </Suspense>
        <div id="loading" className="loading" style={{ display: 'none' }}>
          <div>読み込み中...</div>
        </div>
      </body>
    </html>
  );
}
