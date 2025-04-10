import Image from "next/image";
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* ヒーローセクション */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          noteの記事を<span className="text-indigo-600">Notionに</span>簡単保存
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          気になる記事のハイライト部分を、ワンクリックでNotionデータベースに整理。
          あなたの知識ベースをスマートに構築します。
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/signup" 
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg"
          >
            無料ではじめる
          </Link>
          <Link 
            href="#features" 
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
          >
            機能を見る
          </Link>
        </div>
        <div className="mt-16 relative max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-xl shadow-xl overflow-hidden">
            {/* ここに実際のスクリーンショット画像を配置 */}
            <div className="aspect-video bg-gray-300 flex items-center justify-center text-gray-500">
              スクリーンショット画像
            </div>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section id="features" className="py-20 bg-white rounded-xl shadow-sm">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            主な機能
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            note with Notionがあれば、記事の整理が驚くほど簡単になります。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* 機能1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              簡単ハイライト保存
            </h3>
            <p className="text-gray-600">
              気になる文章を選択してクリックするだけで、Notionデータベースに保存できます。
            </p>
          </div>

          {/* 機能2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              タグ管理
            </h3>
            <p className="text-gray-600">
              ハイライトにタグを設定して、後から簡単に検索・整理できます。
            </p>
          </div>

          {/* 機能3 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              高度な整理（プレミアム）
            </h3>
            <p className="text-gray-600">
              プレミアムプランでは、メモ追加、著者・記事ごとの整理など、より高度な機能が使えます。
            </p>
          </div>
        </div>
      </section>

      {/* 料金プラン簡易セクション */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            料金プラン
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            あなたのニーズに合わせたプランをお選びいただけます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 無料プラン */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">無料プラン</h3>
            <p className="text-gray-500 mb-6">基本的な機能を無料で利用できます</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ¥0 <span className="text-base font-normal text-gray-500">/永久</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ハイライト送信機能
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                タグ設定
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                メモ追加機能
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="h-5 w-5 text-gray-300 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                著者・記事DB連携
              </li>
            </ul>
            <Link 
              href="/signup" 
              className="block w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-800 text-center font-medium hover:bg-gray-200"
            >
              無料ではじめる
            </Link>
          </div>

          {/* プレミアムプラン */}
          <div className="bg-indigo-50 p-8 rounded-xl shadow-sm border border-indigo-100 relative">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              おすすめ
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">プレミアムプラン</h3>
            <p className="text-gray-500 mb-6">高度な整理機能でデータベースを活用</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ¥500 <span className="text-base font-normal text-gray-500">/月</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                無料プランのすべての機能
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                メモ追加機能
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                著者データベース自動作成
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                記事データベース自動作成
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                複数端末ログイン対応
              </li>
            </ul>
            <Link 
              href="/signup?plan=premium" 
              className="block w-full py-3 px-4 rounded-lg bg-indigo-600 text-white text-center font-medium hover:bg-indigo-700"
            >
              プレミアムではじめる
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/pricing" className="text-indigo-600 hover:text-indigo-800">
            プランの詳細を見る →
          </Link>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-indigo-600 rounded-xl text-white text-center my-20">
        <h2 className="text-3xl font-bold mb-4">
          今すぐ始めよう
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-indigo-100">
          noteからNotionへ、知識の橋渡しをスマートに。
          あなたの知識ベース構築を効率化します。
        </p>
        <Link 
          href="/signup" 
          className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100"
        >
          無料ではじめる
        </Link>
      </section>
    </MainLayout>
  );
}
