import Link from 'next/link';
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        {/* サイドバー */}
        <aside className="w-64 bg-white shadow-sm">
          <nav className="p-4 space-y-1">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium"
            >
              ダッシュボード
            </Link>
            <div className="pt-2 pb-1">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                設定
              </p>
            </div>
            <Link 
              href="/settings/notion" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              Notion連携
            </Link>
            <Link 
              href="/settings/account" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              アカウント設定
            </Link>
            <Link 
              href="/billing" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              プラン・課金
            </Link>
            <div className="pt-2 pb-1">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ヘルプ
              </p>
            </div>
            <Link 
              href="/help/extension" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              拡張機能の使い方
            </Link>
            <Link 
              href="/help/faq" 
              className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              よくある質問
            </Link>
          </nav>
        </aside>
        
        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 