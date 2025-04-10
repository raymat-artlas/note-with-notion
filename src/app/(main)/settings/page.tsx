'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FiUser, FiCreditCard, FiShield, FiExternalLink, FiBell, FiSave } from 'react-icons/fi';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  // タブ切り替え処理
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSaved(false);
  };
  
  // 保存処理のモック
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // 保存処理を実行
    setTimeout(() => {
      setSaved(true);
    }, 500);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">設定</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* サイドバー - タブメニュー */}
        <div className="md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => handleTabChange('profile')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiUser className={`mr-3 h-5 w-5 ${
                activeTab === 'profile' ? 'text-blue-500' : 'text-gray-400'
              }`} />
              プロフィール
            </button>
            
            <button
              onClick={() => handleTabChange('billing')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'billing'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiCreditCard className={`mr-3 h-5 w-5 ${
                activeTab === 'billing' ? 'text-blue-500' : 'text-gray-400'
              }`} />
              サブスクリプション
            </button>
            
            <button
              onClick={() => handleTabChange('notifications')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'notifications'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiBell className={`mr-3 h-5 w-5 ${
                activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'
              }`} />
              通知設定
            </button>
            
            <button
              onClick={() => handleTabChange('security')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'security'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiShield className={`mr-3 h-5 w-5 ${
                activeTab === 'security' ? 'text-blue-500' : 'text-gray-400'
              }`} />
              セキュリティ
            </button>
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <span>ダッシュボードに戻る</span>
            </Link>
          </div>
        </div>
        
        {/* メインコンテンツエリア */}
        <div className="flex-1 bg-white shadow-sm rounded-lg overflow-hidden border">
          {/* プロフィール設定 */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">プロフィール設定</h2>
              
              {saved && (
                <div className="mb-4 p-2 bg-green-50 border border-green-100 text-green-700 rounded">
                  <p className="text-sm flex items-center">
                    <FiSave className="mr-2" />
                    設定が保存されました
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      姓
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      名
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      disabled
                      defaultValue={user?.email || ''}
                      className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      メールアドレスの変更には確認が必要です
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiSave className="mr-2" />
                    変更を保存
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* サブスクリプション設定 */}
          {activeTab === 'billing' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">サブスクリプション設定</h2>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-blue-800">現在のプラン: プレミアム（月額）</h3>
                <p className="mt-1 text-sm text-blue-700">次回の請求日: 2023年5月7日</p>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">プランの変更</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      プランをアップグレードまたはダウングレードする場合は、以下のリンクからプラン一覧ページに移動してください。
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      href="/plans"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiExternalLink className="mr-2 -ml-1 h-5 w-5 text-gray-400" />
                      プラン一覧を表示
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">お支払い方法</h3>
                
                <div className="flex items-center bg-gray-50 p-4 rounded-md border">
                  <div className="flex-shrink-0">
                    <img src="https://www.mastercard.com/content/dam/public/mastercardcom/jp/ja/home/other/card-image/mastercard-card-image.svg" alt="MasterCard" className="h-8" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">MasterCard ••••4242</p>
                    <p className="text-sm text-gray-500">有効期限: 12/25</p>
                  </div>
                  <button className="ml-auto text-sm text-blue-600 hover:text-blue-800">
                    変更
                  </button>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-red-700 mb-4">サブスクリプションのキャンセル</h3>
                <p className="text-sm text-gray-500 mb-4">
                  サブスクリプションをキャンセルすると、現在の請求期間の終了時に有料機能へのアクセスができなくなります。
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  サブスクリプションをキャンセル
                </button>
              </div>
            </div>
          )}
          
          {/* 通知設定 */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">通知設定</h2>
              
              {saved && (
                <div className="mb-4 p-2 bg-green-50 border border-green-100 text-green-700 rounded">
                  <p className="text-sm flex items-center">
                    <FiSave className="mr-2" />
                    設定が保存されました
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSave}>
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">メール通知</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">新機能のお知らせ</label>
                        <p className="text-gray-500">新しい機能やアップデートについての情報を受け取ります。</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="font-medium text-gray-700">使い方のヒント</label>
                        <p className="text-gray-500">サービスをより効果的に使うためのヒントとコツ。</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="offers" className="font-medium text-gray-700">特別オファー</label>
                        <p className="text-gray-500">割引やプロモーションに関する情報。</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiSave className="mr-2" />
                    設定を保存
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* セキュリティ設定 */}
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">セキュリティ設定</h2>
              
              {saved && (
                <div className="mb-4 p-2 bg-green-50 border border-green-100 text-green-700 rounded">
                  <p className="text-sm flex items-center">
                    <FiSave className="mr-2" />
                    設定が保存されました
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-700">パスワードの変更</h3>
                  <form onSubmit={handleSave} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        現在のパスワード
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        新しいパスワード
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        新しいパスワード（確認）
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiSave className="mr-2" />
                        パスワードを変更
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-700">セッション管理</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ログインしているデバイスとブラウザのリスト。不審なセッションがある場合は、すべてのデバイスからログアウトしてください。
                  </p>
                  
                  <div className="mt-4 border rounded-md overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">現在のセッション</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            アクティブ
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">IP: 192.168.1.1</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Chrome - MacOS - 最終アクセス: 今
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    すべてのデバイスからログアウト
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 