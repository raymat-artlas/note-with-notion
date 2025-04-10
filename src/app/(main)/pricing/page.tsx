'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const isUpgrade = searchParams.get('upgrade') === 'true';
  
  const handleUpgrade = async (planId: string) => {
    if (!user) {
      router.push('/login?redirect=/pricing?upgrade=true');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/stripe/create-checkout?plan=${planId}&userId=${user.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'チェックアウトの作成に失敗しました');
      }
      
      const data = await response.json();
      // Stripeのチェックアウトページにリダイレクト
      window.location.href = data.url;
    } catch (err) {
      console.error('アップグレードエラー:', err);
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isUpgrade ? 'プランアップグレード' : '料金プラン'}
      </h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white">
            <h2 className="text-xl font-bold">月額プラン</h2>
            <p className="text-3xl font-bold mt-2">¥980 <span className="text-sm font-normal">/月</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                無制限のハイライト保存
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                複数のNotion連携
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                高度なタグ付け機能
              </li>
            </ul>
            <button 
              onClick={() => handleUpgrade('price_monthly')}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded transition duration-150"
            >
              {loading ? '処理中...' : '月額プランに登録'}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-indigo-500">
          <div className="bg-indigo-700 p-6 text-white">
            <div className="inline-block bg-indigo-500 text-white text-xs px-2 py-1 rounded mb-2">おすすめ</div>
            <h2 className="text-xl font-bold">年額プラン</h2>
            <p className="text-3xl font-bold mt-2">¥9,800 <span className="text-sm font-normal">/年</span></p>
            <p className="text-sm mt-1">（月あたり約¥817 - 2ヶ月分お得）</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                無制限のハイライト保存
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                複数のNotion連携
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                高度なタグ付け機能
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                優先サポート
              </li>
            </ul>
            <button 
              onClick={() => handleUpgrade('price_yearly')}
              disabled={loading}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded transition duration-150"
            >
              {loading ? '処理中...' : '年額プランに登録'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ダッシュボードに戻る
        </Link>
      </div>
    </div>
  );
}