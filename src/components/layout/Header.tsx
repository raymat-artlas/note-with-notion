'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('ログアウト成功');
      window.location.href = '/login';
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-indigo-600">
          note with Notion
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-600 hover:text-indigo-600">
            料金プラン
          </Link>
          <Link href="/faq" className="text-gray-600 hover:text-indigo-600">
            よくある質問
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-indigo-600"
              >
                ダッシュボード
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                ログイン
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                新規登録
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
} 