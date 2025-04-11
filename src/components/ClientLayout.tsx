'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';

// すべてのページ共通のクライアントサイドロジックを提供するコンポーネント
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 強制的にクライアントサイドレンダリングを確保
  useEffect(() => {
    // Next.jsのクライアントサイドナビゲーションを強制
    if (typeof window !== 'undefined') {
      window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
      window.__NEXT_DATA__.props = window.__NEXT_DATA__.props || {};
    }
  }, []);
  
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">コンテンツを読み込み中...</div>}>
        {children}
      </Suspense>
    </AuthProvider>
  );
} 