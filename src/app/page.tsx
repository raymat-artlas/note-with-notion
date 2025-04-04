import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                note with Notion
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              noteで見つけた素晴らしい情報を、Notionに簡単保存。
              知識の整理をシームレスに。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-300"
              >
                無料で始める
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow hover:shadow-lg transition duration-300"
              >
                機能を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              あなたの知識管理をサポート
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              noteの記事からNotionへ。知識の収集から整理までをシームレスに。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 特徴1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                簡単ハイライト保存
              </h3>
              <p className="text-gray-600">
                noteで気になる部分をハイライトするだけで、Notionに自動保存。URL付きで参照も簡単。
              </p>
            </div>

            {/* 特徴2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                タグ＆メモで整理
              </h3>
              <p className="text-gray-600">
                保存した情報にタグを付けて整理。後から見返す時もすぐに見つかります。
              </p>
            </div>

            {/* 特徴3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                リレーション機能
              </h3>
              <p className="text-gray-600">
                著者やnoteごとに情報を自動整理。関連情報をNotionで一元管理できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              シンプルな料金プラン
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              あなたのニーズに合わせて選べる2つのプラン
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 無料プラン */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-gray-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">無料プラン</h3>
              <p className="text-4xl font-bold mb-6">¥0<span className="text-lg text-gray-600 font-normal">/月</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>ハイライト部分の保存</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>タグの追加・設定</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>メモの追加</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>著者情報・リレーション</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 transition duration-300"
              >
                無料で始める
              </Link>
            </div>

            {/* 有料プラン */}
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-600 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-bl-lg rounded-tr-lg">
                人気
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">有料プラン</h3>
              <p className="text-4xl font-bold mb-6">¥500<span className="text-lg text-gray-600 font-normal">/月</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>無料プランのすべての機能</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>メモの追加</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>著者情報の自動取得</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>note情報の自動取得</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>複数端末での同期</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition duration-300"
              >
                プランを選択
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            今日から知識の整理を始めよう
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-blue-100">
            noteの情報をNotionで管理して、あなたの知識ベースを構築しましょう。
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition duration-300"
          >
            無料で始める
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">note with Notion</h3>
              <p className="text-gray-400">
                noteの知識をNotionで整理する最高のツール
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">製品</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white">機能</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">料金</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">Chrome拡張機能</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">サポート</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">使い方ガイド</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">よくある質問</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">法的情報</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white">プライバシーポリシー</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white">利用規約</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} note with Notion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
