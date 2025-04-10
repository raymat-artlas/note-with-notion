'use client';

import { useEffect, useState } from 'react';
import { PLANS, getPlanDetails } from '@/lib/plans';

export default function PricingAltPage() {
  const [ready, setReady] = useState(false);
  
  // ブラウザの履歴をクリアして新しいページとして扱う
  useEffect(() => {
    // 履歴をリセットして新規ページとして扱う
    window.history.replaceState(null, '', '/pricing-fresh');
    
    // ダイレクトロードを防ぐためにreadyフラグを使用
    setReady(true);
  }, []);
  
  // プラン情報をここで直接取得
  const freePlan = getPlanDetails(PLANS.FREE);
  const monthlyPlan = getPlanDetails(PLANS.MONTHLY);
  
  if (!ready) {
    return <div>準備中...</div>;
  }
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">料金プラン (代替ページ)</h1>
      
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {/* 無料プラン */}
        <div className="border p-4 rounded">
          <h2 className="text-xl">{freePlan.name}</h2>
          <p className="text-gray-600">{freePlan.description}</p>
          <p className="text-2xl font-bold mt-2">¥{freePlan.price}</p>
        </div>
        
        {/* 有料プラン */}
        <div className="border p-4 rounded bg-blue-50">
          <h2 className="text-xl">{monthlyPlan.name}</h2>
          <p className="text-gray-600">{monthlyPlan.description}</p>
          <p className="text-2xl font-bold mt-2">¥{monthlyPlan.price}</p>
        </div>
      </div>
      
      <p>通常の料金ページは現在メンテナンス中です。</p>
      <a href="/dashboard" className="text-blue-500 underline">ダッシュボードに戻る</a>
    </div>
  );
} 