'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import PlanCards from '@/components/PlanCards';
import { useRouter } from 'next/navigation';

export default function PlansPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // 初期化ロジックを分離して独立させる
  const initializePage = useCallback(async () => {
    try {
      // 即時ロード状態を解除
      setTimeout(() => setLoading(false), 100);
      
      // Stripeパラメータの存在チェック
      const success = searchParams.get('success');
      const canceled = searchParams.get('canceled');
      
      if (success === 'true') {
        setMessage('お支払いが完了しました！サブスクリプションが有効になりました。');
        
        // URLをクリーンアップ - 即時実行
        const cleanUrl = window.location.pathname;
        window.history.replaceState(null, '', cleanUrl);
        
        // 状態更新のため強制的に再フェッチを遅延実行
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else if (canceled === 'true') {
        setMessage('お支払いがキャンセルされました。');
        
        // URLをクリーンアップ
        const cleanUrl = window.location.pathname;
        window.history.replaceState(null, '', cleanUrl);
      }
    } catch (err: any) {
      console.error('プランページ初期化エラー:', err);
      setError(err.message || 'ページの読み込み中にエラーが発生しました');
    } finally {
      // 確実にロード状態を解除
      setLoading(false);
    }
  }, [searchParams, router]);

  // 初期化の実行
  useEffect(() => {
    // 別スレッドで初期化を実行
    const timer = setTimeout(() => {
      initializePage();
    }, 10);
    
    return () => clearTimeout(timer);
  }, [initializePage]);

  // 表示部分
  return (
    <div className="container mx-auto py-8 px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">エラー:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            ページを再読み込み
          </button>
        </div>
      ) : (
        <>
          {message && (
            <div className={`p-4 mb-6 rounded ${message.includes('完了') ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-yellow-100 border border-yellow-400 text-yellow-700'}`}>
              {message}
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-8 text-center">料金プラン</h1>
          <PlanCards />
        </>
      )}
    </div>
  );
} 