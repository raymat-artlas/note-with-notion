'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/context/AuthContext';
import { FaUser, FaChevronDown, FaCog, FaSignOutAlt, FaBook, FaHome } from 'react-icons/fa';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  
  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 画面外クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);
  
  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [router.pathname]);
  
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
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-indigo-600' : 'text-indigo-700'}`}>
                Note with Notion
              </span>
            </Link>
          </div>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium ${
                scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-700 hover:text-indigo-700'
              } transition-colors`}
            >
              ホーム
            </Link>
            <Link 
              href="/features" 
              className={`font-medium ${
                scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-700 hover:text-indigo-700'
              } transition-colors`}
            >
              機能
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium ${
                scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-700 hover:text-indigo-700'
              } transition-colors`}
            >
              料金プラン
            </Link>
            <Link 
              href="/guide" 
              className={`font-medium ${
                scrolled ? 'text-gray-600 hover:text-indigo-600' : 'text-gray-700 hover:text-indigo-700'
              } transition-colors`}
            >
              ガイド
            </Link>
            
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center font-medium ${
                    scrolled 
                      ? 'text-gray-700 hover:text-indigo-600' 
                      : 'text-gray-800 hover:text-indigo-700'
                  } transition-colors`}
                >
                  <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white mr-2">
                    {user.email ? user.email.charAt(0).toUpperCase() : <FaUser />}
                  </span>
                  <span className="hidden sm:inline-block">{user.displayName || 'ユーザー'}</span>
                  <FaChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {/* ドロップダウンメニュー */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-100">
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaHome className="mr-3 text-indigo-500" />
                        <span>ダッシュボード</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaCog className="mr-3 text-indigo-500" />
                        <span>設定</span>
                      </Link>
                      <Link
                        href="/settings/notion"
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaBook className="mr-3 text-indigo-500" />
                        <span>Notion連携</span>
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={() => {
                          logout();
                          router.push('/');
                        }}
                        className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <FaSignOutAlt className="mr-3" />
                        <span>ログアウト</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`font-medium ${
                    scrolled ? 'text-indigo-600 hover:text-indigo-700' : 'text-indigo-700 hover:text-indigo-800'
                  } transition-colors`}
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className={`px-4 py-2 rounded-md ${
                    scrolled 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-indigo-700 hover:bg-indigo-800 text-white'
                  } transition-colors`}
                >
                  登録
                </Link>
              </div>
            )}
          </nav>
          
          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                scrolled ? 'text-gray-700' : 'text-gray-800'
              } focus:outline-none transition-colors`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              機能
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              料金プラン
            </Link>
            <Link
              href="/guide"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              ガイド
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  ダッシュボード
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  設定
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-100">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600"
                    >
                      ログイン
                    </Link>
                  </div>
                  <div className="ml-3">
                    <Link
                      href="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white"
                    >
                      登録
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 