import Link from 'next/link';
import Image from 'next/image';
import { FaChrome, FaCheck, FaGlobe, FaStickyNote, FaBookmark, FaDatabase } from 'react-icons/fa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                <span className="block text-indigo-600">すべての読書体験を</span>
                <span className="block">記録・整理・活用</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                note with Notionは、Webページからハイライトした情報を素早くNotionに保存。
                あなたのアイデアや発見を最大限に活用できるツールです。
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <Link 
                  href="/signup" 
                  className="px-8 py-3 bg-indigo-600 text-white rounded-md font-medium shadow-sm hover:bg-indigo-700 transition"
                >
                  無料で始める
                </Link>
                <Link 
                  href="/guide" 
                  className="px-8 py-3 bg-white text-indigo-600 rounded-md font-medium shadow-sm border border-indigo-200 hover:bg-indigo-50 transition"
                >
                  使い方を見る
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative text-center mx-auto max-w-5xl">
            <div className="shadow-xl rounded-lg overflow-hidden">
              <Image 
                src="/images/app-screenshot.png" 
                alt="note with Notionの画面" 
                width={1280} 
                height={720}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white shadow-lg rounded-full px-6 py-2 flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span className="font-medium">Notionと完全連携</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 機能説明セクション */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">シンプルで使いやすい機能</h2>
            <p className="mt-4 text-xl text-gray-600">Webサーフィンをより価値あるものに</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">簡単ハイライト</h3>
              <p className="text-gray-600">
                テキストを選択するだけで、重要な部分を簡単にハイライト。あなたのナレッジベースを構築します。
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Notion連携</h3>
              <p className="text-gray-600">
                ハイライトした内容を自動的にNotionに保存。煩わしい手作業なく情報を整理できます。
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">タグ付け整理</h3>
              <p className="text-gray-600">
                ハイライトにタグを付けて整理。後から必要な情報をすぐに見つけられます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* プラン比較セクション */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">あなたに合ったプランをお選びください</h2>
            <p className="mt-4 text-xl text-gray-600">シンプルな料金体系でご利用いただけます</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">無料プラン</h3>
                <p className="text-3xl font-bold mb-4">¥0 <span className="text-base font-normal text-gray-600">/月</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>月20件のハイライト保存</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>1つのNotion連携</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>基本機能</span>
                  </li>
                </ul>
                <Link 
                  href="/signup" 
                  className="block w-full text-center bg-white border border-indigo-600 text-indigo-600 py-3 rounded-md font-medium hover:bg-indigo-50 transition"
                >
                  無料で始める
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-indigo-500 relative">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1">
                おすすめ
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">プレミアムプラン</h3>
                <p className="text-3xl font-bold mb-4">¥980 <span className="text-base font-normal text-gray-600">/月</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">無制限のハイライト保存</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">複数のNotion連携</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">高度なタグ付け機能</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">優先サポート</span>
                  </li>
                </ul>
                <Link 
                  href="/pricing?upgrade=true" 
                  className="block w-full text-center bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition"
                >
                  プレミアムに登録
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA セクション */}
      <div className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">今すぐ始めましょう</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            あなたの知識管理をもっと簡単に。Chrome拡張機能をインストールして、より効率的な情報収集を始めましょう。
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="https://chrome.google.com/webstore/detail/note-with-notion/your-extension-id" 
              className="px-8 py-3 bg-white text-indigo-600 rounded-md font-medium shadow-sm hover:bg-gray-100 transition"
              target="_blank"
            >
              Chrome拡張をインストール
            </Link>
            <Link 
              href="/signup" 
              className="px-8 py-3 bg-indigo-700 text-white rounded-md font-medium shadow-sm hover:bg-indigo-800 transition"
            >
              アカウント登録
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 