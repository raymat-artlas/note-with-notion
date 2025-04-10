'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  // シンプルかつ確実な実装
  useEffect(() => {
    // 直接APIエンドポイントに移動
    window.location.href = '/api/stripe/simple-session';
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">決済ページに移動中...</h1>
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">
          自動的に移動しない場合は下のボタンをクリックしてください。
        </p>
        
        <div className="mt-6 flex flex-col space-y-4 items-center">
          <a
            href="/api/stripe/simple-session"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-48"
          >
            決済ページへ移動
          </a>
          
          <Link
            href="/plans"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 w-48"
          >
            料金プランに戻る
          </Link>
        </div>
      </div>
    </div>
  );
} 