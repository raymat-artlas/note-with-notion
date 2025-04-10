'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Highlight } from '@/types/highlight';
import { FiHome, FiSettings, FiBookmark, FiFileText, FiHelpCircle } from 'react-icons/fi';

// ローディングコンポーネント
function DashboardLoading() {
  return (
    <div className="p-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4 mb-6"></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

// メインコンテンツコンポーネント
function DashboardContent() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    if (user) {
      fetchHighlights();
    }
  }, [user, authLoading, router]);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/highlights', {
        headers: {
          Authorization: `Bearer ${await user?.getIdToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('ハイライトの取得に失敗しました');
      }

      const data = await response.json();
      setHighlights(data.highlights || []);
    } catch (err) {
      console.error('ハイライト取得エラー:', err);
      setError('データの読み込み中にエラーが発生しました。再度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  // ローディング中の表示
  if (authLoading || (loading && !error)) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">エラーが発生しました</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchHighlights}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">マイハイライト</h1>
        <p className="text-gray-600">保存したハイライトを管理・整理できます</p>
      </header>

      {highlights.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">まだハイライトがありません</h2>
          <p className="text-gray-600 mb-6">Chrome拡張を使って、Webページからテキストをハイライトして保存しましょう</p>
          <Link href="/guide" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            使い方を見る
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition">
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{highlight.sourceUrl}</p>
                <p className="text-gray-800 mb-4">"{highlight.text}"</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{new Date(highlight.createdAt).toLocaleDateString()}</span>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    詳細を見る
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// メインのダッシュボードページコンポーネント
export default function DashboardPage() {
  return (
    <DashboardContent />
  );
} 