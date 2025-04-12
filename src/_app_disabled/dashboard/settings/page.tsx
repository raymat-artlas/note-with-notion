'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [notionToken, setNotionToken] = useState('');
  const [databaseId, setDatabaseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // ユーザー設定の読み込み
  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);
  
  async function fetchSettings() {
    // APIからユーザー設定を取得
  }
  
  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    // 設定の保存処理
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">設定</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notion連携</h2>
        
        <form onSubmit={saveSettings}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NotionインテグレーションAPI
            </label>
            <input
              type="text"
              value={notionToken}
              onChange={(e) => setNotionToken(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="secret_xxxx"
            />
            <p className="text-sm text-gray-500 mt-1">
              <a href="https://www.notion.so/my-integrations" target="_blank" rel="noreferrer" className="text-indigo-600">
                Notionインテグレーション
              </a>
              から取得してください
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NotionデータベースID
            </label>
            <input
              type="text"
              value={databaseId}
              onChange={(e) => setDatabaseId(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loading ? '保存中...' : '設定を保存'}
          </button>
          
          {message && (
            <p className="mt-4 text-green-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
} 