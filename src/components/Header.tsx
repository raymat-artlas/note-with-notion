'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { db } from '@/lib/firebase/client';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const pathname = usePathname();
  
  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Note with Notion" 
                width={40} 
                height={40} 
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Note with Notion</span>
            </Link>
          </div>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-base font-medium ${
                pathname === '/' 
                ? 'text-indigo-600' 
                : 'text-gray-700 hover:text-indigo-500'
              } transition duration-150`}
            >
              ホーム
            </Link>
            <Link 
              href="/features" 
              className={`text-base font-medium ${
                pathname === '/features' 
                ? 'text-indigo-600' 
                : 'text-gray-700 hover:text-indigo-500'
              } transition duration-150`}
            >
              機能
            </Link>
            <Link 
              href="/pricing" 
              className={`text-base font-medium ${
                pathname === '/pricing' 
                ? 'text-indigo-600' 
                : 'text-gray-700 hover:text-indigo-500'
              } transition duration-150`}
            >
              料金プラン
            </Link>
            <Link 
              href="/blog" 
              className={`text-base font-medium ${
                pathname === '/blog' 
                ? 'text-indigo-600' 
                : 'text-gray-700 hover:text-indigo-500'
              } transition duration-150`}
            >
              ブログ
            </Link>
            
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link 
                      href="/dashboard" 
                      className="text-base font-medium text-gray-700 hover:text-indigo-500 transition duration-150"
                    >
                      マイページ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-150"
                    >
                      ログアウト
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link 
                      href="/login" 
                      className="text-base font-medium text-gray-700 hover:text-indigo-500 transition duration-150"
                    >
                      ログイン
                    </Link>
                    <Link 
                      href="/signup" 
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                    >
                      無料で始める
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>
          
          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none transition duration-150"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">メニューを開く</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/' 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-500'
            } transition duration-150`}
            onClick={() => setIsOpen(false)}
          >
            ホーム
          </Link>
          <Link 
            href="/features" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/features' 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-500'
            } transition duration-150`}
            onClick={() => setIsOpen(false)}
          >
            機能
          </Link>
          <Link 
            href="/pricing" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/pricing' 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-500'
            } transition duration-150`}
            onClick={() => setIsOpen(false)}
          >
            料金プラン
          </Link>
          <Link 
            href="/blog" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/blog' 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-500'
            } transition duration-150`}
            onClick={() => setIsOpen(false)}
          >
            ブログ
          </Link>
          
          {!loading && (
            <>
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 transition duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    マイページ
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition duration-150"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-500 transition duration-150"
                    onClick={() => setIsOpen(false)}
                  >
                    ログイン
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 mt-2 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    無料で始める
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
} 