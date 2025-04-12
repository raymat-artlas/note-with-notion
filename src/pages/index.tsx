// モダンでインパクトのあるトップページ
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { FaChrome, FaCheck, FaGlobe, FaStickyNote, FaBookmark, FaDatabase, FaArrowRight } from 'react-icons/fa';

// SSRを強制
export const getServerSideProps = async ({ query }) => {
  const hasRedirectParam = Boolean(query._r);
  return {
    props: {
      serverTime: new Date().toISOString(),
      hasRedirectParam
    }
  };
};

export default function HomePage({ serverTime, hasRedirectParam }) {
  const router = useRouter();
  
  // リダイレクトループ防止
  useEffect(() => {
    if (hasRedirectParam) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
    
    // スクロールアニメーション
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          element.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示時にも実行
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasRedirectParam]);
  
  return (
    <>
      <Head>
        <title>note with Notion - アイデアを整理・保存・活用</title>
        <meta name="description" content="noteの記事をNotionに簡単保存。あなたのアイデアベースを構築します。" />
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          
          .animate-in {
            opacity: 1;
            transform: translateY(0);
          }
          
          .gradient-text {
            background: linear-gradient(90deg, #4f46e5 0%, #9333ea 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .hero-gradient {
            background: linear-gradient(135deg, #f0f4ff 0%, #e9f0ff 100%);
          }
          
          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          
          .cta-button {
            background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.5);
          }
        `}</style>
      </Head>
      
      {/* モダンなヒーローセクション */}
      <div className="bg-white">
        <div className="hero-gradient relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-on-scroll">
                  <span className="block gradient-text">すべての読書体験を</span>
                  <span className="block">記録・整理・活用</span>
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto animate-on-scroll" style={{animationDelay: "0.2s"}}>
                  note with Notionは、Webページからハイライトした情報を
                  <span className="text-indigo-600 font-semibold">ワンクリック</span>でNotionに保存。
                  <br />あなたの知識ベースを効率的に構築します。
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll" style={{animationDelay: "0.4s"}}>
                  <Link 
                    href="/signup" 
                    className="cta-button px-8 py-4 text-white rounded-full font-medium shadow-xl hover:bg-indigo-700 transition flex items-center justify-center"
                  >
                    無料で始める <FaArrowRight className="ml-2" />
                  </Link>
                  <Link 
                    href="/guide" 
                    className="px-8 py-4 bg-white text-indigo-600 rounded-full font-medium shadow-md border border-indigo-100 hover:bg-indigo-50 transition"
                  >
                    使い方を見る
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative text-center mx-auto max-w-5xl pb-16 animate-on-scroll" style={{animationDelay: "0.6s"}}>
              <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-100">
                <Image 
                  src="/images/app-screenshot.png" 
                  alt="note with Notionの画面" 
                  width={1280} 
                  height={720}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-white shadow-xl rounded-full px-8 py-3 flex items-center">
                  <span className="text-green-500 mr-2"><FaCheck /></span>
                  <span className="font-medium">Notionと完全連携</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 装飾要素 */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 opacity-20 lg:opacity-30">
            <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
              <defs>
                <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" fill="#4f46e5" />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#pattern-squares)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 opacity-20 lg:opacity-30">
            <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
              <defs>
                <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="#4f46e5" />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#pattern-circles)" />
            </svg>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">すべての情報を、あなたの知識に</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll" style={{animationDelay: "0.2s"}}>
                ウェブ上の大切な情報を見逃さず、効率的に整理・活用しましょう
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* 特徴カード1 */}
              <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-on-scroll" style={{animationDelay: "0.1s"}}>
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-5">
                  <FaGlobe className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">ワンクリック保存</h3>
                <p className="text-gray-600">
                  ウェブページの文章を選択してハイライトするだけ。複雑な操作は必要ありません。
                </p>
              </div>
              
              {/* 特徴カード2 */}
              <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-on-scroll" style={{animationDelay: "0.2s"}}>
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-5">
                  <FaDatabase className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Notionと連携</h3>
                <p className="text-gray-600">
                  保存した情報は自動的にNotionデータベースに整理。タグや検索で簡単に見つけられます。
                </p>
              </div>
              
              {/* 特徴カード3 */}
              <div className="feature-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 animate-on-scroll" style={{animationDelay: "0.3s"}}>
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-5">
                  <FaStickyNote className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">メモと整理</h3>
                <p className="text-gray-600">
                  保存時にメモを追加。後からカテゴリー分けや編集も簡単にできます。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 使い方セクション */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">シンプルな3ステップ</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-on-scroll" style={{animationDelay: "0.2s"}}>
                難しい設定は不要。すぐに使い始められます
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {/* ステップ1 */}
              <div className="text-center animate-on-scroll" style={{animationDelay: "0.1s"}}>
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-5">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">拡張機能を追加</h3>
                <p className="text-gray-600">
                  Chromeウェブストアから拡張機能をインストールして、アカウント連携します。
                </p>
              </div>
              
              {/* ステップ2 */}
              <div className="text-center animate-on-scroll" style={{animationDelay: "0.2s"}}>
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-5">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Notionと連携</h3>
                <p className="text-gray-600">
                  NotionのAPIキーを設定するだけ。あとは自動的にデータベースが作成されます。
                </p>
              </div>
              
              {/* ステップ3 */}
              <div className="text-center animate-on-scroll" style={{animationDelay: "0.3s"}}>
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-5">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">ハイライト＆保存</h3>
                <p className="text-gray-600">
                  Webページで興味のある部分をハイライトし、保存ボタンをクリック。これだけです！
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 最終CTA */}
        <div className="py-24 bg-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll">
              今すぐあなたの知識ベース構築を始めましょう
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10 animate-on-scroll" style={{animationDelay: "0.2s"}}>
              無料プランで十分に機能をお試しいただけます
            </p>
            <div className="animate-on-scroll" style={{animationDelay: "0.4s"}}>
              <Link 
                href="/signup" 
                className="px-10 py-4 bg-white text-indigo-700 rounded-full font-bold shadow-xl hover:bg-gray-100 transition inline-flex items-center"
              >
                無料アカウントを作成 <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 