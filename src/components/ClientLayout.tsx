'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

// すべてのページ共通のクライアントサイドロジックを提供するコンポーネント
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // SSRで問題になりうるブラウザAPIの使用を避ける
  // window/documentの使用をuseEffectでラップする
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">コンテンツを読み込み中...</div>}>
      {children}
    </Suspense>
  );
} 