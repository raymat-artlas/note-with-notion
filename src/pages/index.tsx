// Pages Router版のトップページ (SSRモード)
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { FaChrome, FaCheck, FaGlobe, FaStickyNote, FaBookmark, FaDatabase } from 'react-icons/fa';

// SSRを強制
export const getServerSideProps = async ({ query }) => {
  // リダイレクトループの防止
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
    // クエリパラメータがすでにある場合は、クリーンURLにする
    if (hasRedirectParam) {
      // クリーンURLにするために、履歴を置き換える
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [hasRedirectParam]);
  
  return (
    <>
      <Head>
        <title>note with Notion - アイデアを整理・保存・活用</title>
        <meta name="description" content="noteの記事をNotionに簡単保存。あなたのアイデアベースを構築します。" />
      </Head>
      
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
                  priority
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
          {/* その他のセクション（既存と同じ）*/}
        </div>
      </div>
    </>
  );
} 