'use client';

import React, { useEffect } from 'react';

// クライアントサイドのレイアウト機能を担当するコンポーネント
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // クライアントサイドのみの機能をここに実装
    const handleRouteChange = () => {
      // ページ遷移時の処理
      document.getElementById('loading')?.style.setProperty('display', 'none');
    };

    // ページロード完了時
    window.addEventListener('load', handleRouteChange);
    
    return () => {
      window.removeEventListener('load', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
} 