'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 静的生成を回避するためのコンポーネント
export default function ForceSSR() {
  const router = useRouter();
  
  useEffect(() => {
    // クライアントサイドでの初期化を確実に行う
    setTimeout(() => {
      router.refresh();
    }, 100);
  }, [router]);
  
  return null;
} 