'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // クライアントサイドで実行されることを確認
    setIsLoaded(true);
    console.log('📱 ページが正常にロードされました');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          note with Notion
        </h1>
        
        {!isLoaded ? (
          <div className="animate-pulse">ロード中...</div>
        ) : (
          <>
            <p className="text-xl text-gray-600 max-w-2xl mb-8">
              noteで見つけた情報をNotionデータベースに整理します。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link 
                href="#" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                始める
              </Link>
            </div>
          </>
        )}
      </div>
      
      <footer className="py-4 bg-white border-t">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2023 note with Notion
        </div>
      </footer>
    </div>
  );
}
