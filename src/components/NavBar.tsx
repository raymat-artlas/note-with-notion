'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await logout();
      console.log('ログアウト成功');
      // Next.jsのルーターの代わりに直接ブラウザのURLを変更
      window.location.href = '/login';
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };
  
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              note with Notion
            </Link>
          </div>
          <div className="flex items-center">
            {user && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                ログアウト
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 