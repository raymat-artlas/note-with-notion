'use client';

import { useEffect } from 'react';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void;
}) {
  useEffect(() => {
    console.error('料金ページでエラーが発生しました:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold text-red-600">エラーが発生しました</h2>
      <p className="text-gray-600 mb-4">ページの読み込み中に問題が発生しました</p>
      <div className="flex space-x-4">
        <button
          onClick={reset}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          再試行
        </button>
        <button
          onClick={() => window.location.href = '/pricing'}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          ページを再読み込み
        </button>
      </div>
    </div>
  );
} 