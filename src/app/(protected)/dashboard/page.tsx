'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBook, FaTags, FaCog, FaChartLine, FaPlus, FaSearch, FaFilter, FaEllipsisH, FaChrome } from 'react-icons/fa';

// ダミーデータ（実際の実装ではAPIからデータを取得）
const savedHighlights = [
  {
    id: 1,
    text: "最高のアイデアは、必要性から生まれる。人々が本当に必要としているものを見つけ出し、それを解決する方法を考えよう。",
    source: "起業家のためのアイデア発想法",
    url: "https://note.com/example/n/n123456789",
    date: "2023-12-01",
    tags: ["ビジネス", "アイデア", "起業"]
  },
  {
    id: 2,
    text: "朝の最初の1時間は、その日の残りの時間を決定づける。朝の習慣を丁寧に作り上げることで、1日の生産性が劇的に変わる。",
    source: "理想の朝習慣の作り方",
    url: "https://note.com/example/n/n987654321",
    date: "2023-12-03",
    tags: ["習慣", "生産性", "モーニングルーティン"]
  },
  {
    id: 3,
    text: "良いデザインは目に見えない。最高のユーザーエクスペリエンスは、ユーザーが気づかないほど自然で直感的なものである。",
    source: "UXデザインの基本原則",
    url: "https://note.com/example/n/n567891234",
    date: "2023-12-05",
    tags: ["デザイン", "UX", "UI"]
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('highlights');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [highlights, setHighlights] = useState(savedHighlights);
  const [showTagFilter, setShowTagFilter] = useState(false);
  
  // すべてのタグを取得（重複を除く）
  const allTags = [...new Set(savedHighlights.flatMap(h => h.tags))];
  
  // フィルター処理
  useEffect(() => {
    let filtered = savedHighlights;
    
    // 検索語でフィルター
    if (searchTerm) {
      filtered = filtered.filter(h => 
        h.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // タグでフィルター
    if (selectedTags.length > 0) {
      filtered = filtered.filter(h => 
        selectedTags.some(tag => h.tags.includes(tag))
      );
    }
    
    setHighlights(filtered);
  }, [searchTerm, selectedTags]);
  
  // タグ選択を切り替え
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ダッシュボードヘッダー */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">マイページ</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                  onClick={() => window.open('https://chrome.google.com/webstore/detail/your-extension-id', '_blank')}
                >
                  <FaChrome className="mr-2" />
                  拡張機能を入手
                </button>
              </div>
              
              <Link href="/account" className="text-gray-500 hover:text-gray-700">
                <FaCog className="w-6 h-6" />
              </Link>
              
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 ${activeTab === 'highlights' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'} font-medium`}
            onClick={() => setActiveTab('highlights')}
          >
            ハイライト
          </button>
          <button
            className={`py-3 px-6 ${activeTab === 'tags' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'} font-medium`}
            onClick={() => setActiveTab('tags')}
          >
            タグ管理
          </button>
          <button
            className={`py-3 px-6 ${activeTab === 'stats' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'} font-medium`}
            onClick={() => setActiveTab('stats')}
          >
            統計
          </button>
        </div>
        
        {/* 検索とフィルター */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ハイライトを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <div className="relative">
              <button
                className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setShowTagFilter(!showTagFilter)}
              >
                <FaFilter className="mr-2 text-gray-500" />
                タグでフィルター
                {selectedTags.length > 0 && (
                  <span className="ml-2 bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                    {selectedTags.length}
                  </span>
                )}
              </button>
              
              {showTagFilter && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                  <div className="mb-3 font-medium text-gray-700">タグを選択</div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedTags.includes(tag)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <button
                      className="mt-3 text-xs text-indigo-600 hover:text-indigo-800"
                      onClick={() => setSelectedTags([])}
                    >
                      クリア
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
              <FaPlus className="mr-2" />
              新規作成
            </button>
          </div>
        </div>
        
        {/* ハイライト一覧 */}
        {activeTab === 'highlights' && (
          <div className="space-y-6">
            {highlights.length > 0 ? (
              highlights.map(highlight => (
                <div key={highlight.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <Link href={highlight.url} target="_blank" className="text-sm text-indigo-600 hover:text-indigo-800 mb-2">
                      {highlight.source}
                    </Link>
                    <span className="text-sm text-gray-500">{highlight.date}</span>
                  </div>
                  
                  <p className="text-gray-800 text-lg mb-4">{highlight.text}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {highlight.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <FaBook className="w-full h-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ハイライトがありません</h3>
                <p className="text-gray-500 mb-6">Chrome拡張機能をインストールして記事からハイライトを保存しましょう</p>
                <button 
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                  onClick={() => window.open('https://chrome.google.com/webstore/detail/your-extension-id', '_blank')}
                >
                  拡張機能を入手する
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* タグ管理 */}
        {activeTab === 'tags' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">タグ管理</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allTags.map(tag => (
                <div key={tag} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-800">{tag}</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 統計 */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">利用統計</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-indigo-600 mb-2">{highlights.length}</div>
                <div className="text-sm text-gray-500">保存したハイライト</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-indigo-600 mb-2">{allTags.length}</div>
                <div className="text-sm text-gray-500">作成したタグ</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-indigo-600 mb-2">30/月</div>
                <div className="text-sm text-gray-500">保存可能数</div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">アップグレードで全機能が利用可能に</h3>
              <p className="text-gray-600 mb-6">プレミアムプランでは無制限のハイライト保存や高度なタグ管理機能が利用できます。</p>
              <Link href="/pricing" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium inline-block transition duration-300">
                プランを見る
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 