import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark, FaTag, FaDatabase, FaChartLine, FaPen, FaSearch, FaMobileAlt, FaLock } from 'react-icons/fa';

export default function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">もっと便利に、もっとシンプルに</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Note with Notionの機能を詳しくご紹介します。
            知識管理を簡単にするための全ての機能が揃っています。
          </p>
        </div>
      </section>

      {/* 主要機能の詳細説明 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="flex flex-col justify-center">
              <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                主要機能 1
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ワンクリックでハイライト保存</h2>
              <p className="text-lg text-gray-600 mb-8">
                テキストを選択して右クリックするだけで、あなたのNotionデータベースに直接保存できます。コピー&ペーストの手間をなくし、読書体験に集中できます。
              </p>
              <ul className="space-y-4">
                {['選択したテキストを即座に保存', 'ソース記事へのリンクも自動保存', 'タイトルも自動的に取得'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white p-2 rounded-xl shadow-xl overflow-hidden">
                <Image 
                  src="/images/highlight-feature.png" 
                  alt="ハイライト機能の説明" 
                  width={600} 
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-1/2 h-1/2 bg-indigo-100 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 第2の機能説明 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 bg-white p-2 rounded-xl shadow-xl overflow-hidden">
                <Image 
                  src="/images/tagging-feature.png" 
                  alt="タグ機能の説明" 
                  width={600} 
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 bg-yellow-100 rounded-full z-0"></div>
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                主要機能 2
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">柔軟なタグ管理</h2>
              <p className="text-lg text-gray-600 mb-8">
                ハイライトにタグを追加して、後からの検索や整理を簡単にします。関連するコンテンツをまとめて、知識を体系化しましょう。
              </p>
              <ul className="space-y-4">
                {['複数のタグをカンマ区切りで追加', 'よく使うタグの提案機能', 'タグによるフィルタリングと検索'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 全機能一覧 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">すべての機能</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Note with Notionの全機能をチェック
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBookmark />,
                title: 'ハイライト保存',
                description: '選択したテキストを簡単にNotionに保存'
              },
              {
                icon: <FaTag />,
                title: 'タグ管理',
                description: 'カテゴリ別にハイライトを整理'
              },
              {
                icon: <FaPen />,
                title: 'メモ追加',
                description: 'ハイライトに個人的なメモを追加'
              },
              {
                icon: <FaDatabase />,
                title: 'Notion連携',
                description: '自動的にNotionデータベースに整理'
              },
              {
                icon: <FaSearch />,
                title: '検索機能',
                description: '保存したハイライトを簡単に検索'
              },
              {
                icon: <FaChartLine />,
                title: '学習管理',
                description: '読書量や学習の進捗を追跡'
              },
              {
                icon: <FaMobileAlt />,
                title: '複数デバイス対応',
                description: 'どのデバイスからでもアクセス可能'
              },
              {
                icon: <FaLock />,
                title: 'プライバシー保護',
                description: 'あなたのデータは安全に保管'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition duration-300 border border-gray-100">
                <div className="text-indigo-500 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* プランの比較セクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">機能比較</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              無料プランとプレミアムプランの違い
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="h-full bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-center mb-8">機能</h3>
                <ul className="space-y-6">
                  <li className="py-2 border-b border-gray-100">基本ハイライト保存</li>
                  <li className="py-2 border-b border-gray-100">タグ付け</li>
                  <li className="py-2 border-b border-gray-100">Notion連携</li>
                  <li className="py-2 border-b border-gray-100">メモ追加</li>
                  <li className="py-2 border-b border-gray-100">月間保存制限</li>
                  <li className="py-2 border-b border-gray-100">複数デバイス連携</li>
                  <li className="py-2 border-b border-gray-100">優先サポート</li>
                  <li className="py-2">新機能優先アクセス</li>
                </ul>
              </div>
            </div>

            <div className="col-span-1">
              <div className="h-full bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-center mb-8">無料</h3>
                <ul className="space-y-6">
                  <li className="py-2 border-b border-gray-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-gray-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-gray-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-gray-100 flex justify-center text-center">✖</li>
                  <li className="py-2 border-b border-gray-100 flex justify-center">月30件</li>
                  <li className="py-2 border-b border-gray-100 flex justify-center text-center">✖</li>
                  <li className="py-2 border-b border-gray-100 flex justify-center text-center">✖</li>
                  <li className="py-2 flex justify-center text-center">✖</li>
                </ul>
              </div>
            </div>

            <div className="col-span-1">
              <div className="h-full bg-indigo-50 rounded-xl shadow-md p-8 border border-indigo-100 relative">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-tr-xl rounded-bl-xl text-sm font-medium">
                  おすすめ
                </div>
                <h3 className="text-2xl font-bold text-center mb-8">プレミアム</h3>
                <ul className="space-y-6">
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center">無制限</li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 border-b border-indigo-100 flex justify-center"><FaCheck className="text-green-500" /></li>
                  <li className="py-2 flex justify-center"><FaCheck className="text-green-500" /></li>
                </ul>
                <div className="mt-10 flex justify-center">
                  <Link href="/pricing" className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium transition duration-300">
                    プランを見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            今すぐNotionとの連携を始めましょう
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            無料プランから始めて、読書体験を次のレベルに引き上げましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium text-lg transition duration-300 shadow-lg hover:shadow-xl">
              無料で始める
            </Link>
            <Link href="/pricing" className="bg-transparent text-white hover:bg-indigo-500 px-8 py-4 rounded-lg font-medium text-lg transition duration-300 border border-white">
              料金プランを見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Check コンポーネント
function FaCheck(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" {...props}>
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
    </svg>
  );
} 