'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { useState, useEffect, ReactNode } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [error, setError] = useState<Error | null>(null);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(true);
  }, []);

  if (error) {
    return (
      <html lang="ja">
        <body>
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: 'red' }}>エラーが発生しました</h1>
            <p>アプリケーションでエラーが発生しました。以下のメッセージを確認してください。</p>
            <pre style={{ 
              background: '#f7f7f7', 
              padding: '1rem', 
              borderRadius: '4px', 
              overflow: 'auto' 
            }}>
              {error.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              style={{
                background: '#0070f3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              ページを再読み込み
            </button>
          </div>
        </body>
      </html>
    );
  }

  try {
    return (
      <html lang="ja">
        <head>
          <title>note with Notion</title>
          <meta name="description" content="noteで見つけた情報をNotionに整理" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>
            {hasWindow ? children : <div>Loading...</div>}
          </AuthProvider>
        </body>
      </html>
    );
  } catch (err) {
    if (err instanceof Error) {
      setError(err);
    } else {
      setError(new Error('不明なエラーが発生しました'));
    }
    return null;
  }
}
