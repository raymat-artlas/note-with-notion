'use client';  // 明示的にクライアントコンポーネントとして宣言

// App Routerルートページの循環参照を防止
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';

// リダイレクトを行わないようにする（循環参照防止）
export default function AppPage() {
  // クライアントサイドのみで実行されるようにする
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // マウント前は最小限の表示
  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>;
  }
  
  // 単純なページ内容を返す（リダイレクトは行わない）
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-xl font-bold mb-4">note with Notion</h1>
        <p className="mb-4">ページ表示中...</p>
        <Link href="/pages" className="text-indigo-600 hover:underline">
          Pages Router版のページに移動
        </Link>
      </div>
    </div>
  );
}
