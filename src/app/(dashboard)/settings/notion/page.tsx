'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserData, updateUserNotionToken } from '@/lib/firebase/users';

export default function NotionSettings() {
  const { user } = useAuth();
  const [notionToken, setNotionToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData && userData.notionToken) {
            setNotionToken('********-****-****-****-************'); // マスクされたトークンを表示
          }
        } catch (err) {
          console.error('ユーザーデータの読み込みに失敗しました', err);
          setError('ユーザーデータの読み込みに失敗しました');
        } finally {
          setLoading(false);
        }
      }
    }
    
    loadUserData();
  }, [user]);

  async function handleSaveToken(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setSuccess(false);
    setError('');
    
    try {
      await updateUserNotionToken(user.uid, notionToken);
      setSuccess(true);
    } catch (err) {
      console.error('トークンの保存に失敗しました', err);
      setError('トークンの保存に失敗しました。もう一度お試しください。');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notion設定</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Notionとの連携</h2>
        
        <p className="mb-4 text-gray-600">
          note with Notionを使用するには、NotionのAPIトークンを設定する必要があります。
          以下の手順で設定してください：
        </p>
        
        <ol className="list-decimal pl-5 mb-6 space-y-2 text-gray-700">
          <li><a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Notion Integrations</a>ページに移動する</li>
          <li>「New integration」ボタンをクリックする</li>
          <li>統合の名前を「note with Notion」などとして作成する</li>
          <li>「Secrets」タブからInternal Integration Tokenをコピーする</li>
          <li>コピーしたトークンを下のフォームに貼り付ける</li>
          <li>Notionデータベースを作成し、この統合と共有する</li>
        </ol>
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-sm text-green-700">トークンが正常に保存されました！</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSaveToken}>
          <div className="mb-4">
            <label htmlFor="notionToken" className="block text-sm font-medium text-gray-700 mb-1">
              Notion API トークン
            </label>
            <input
              type="text"
              id="notionToken"
              value={notionToken}
              onChange={(e) => setNotionToken(e.target.value)}
              placeholder="secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={saving || !notionToken}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? '保存中...' : 'トークンを保存'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Notionデータベースの設定</h2>
        
        <p className="mb-4 text-gray-600">
          note with Notionを使用するには、Notionにデータベースを作成して統合と共有する必要があります。
          以下の手順で設定してください：
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Notionで新しいデータベースを作成する</li>
          <li>データベースに以下のプロパティを設定する：
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>ハイライト（タイトル）</li>
              <li>URL（URL）</li>
              <li>タグ（マルチセレクト）</li>
              <li>保存日（日付）</li>
              <li>タイトル（テキスト）</li>
              <li>メモ（テキスト）- プレミアムプランのみ</li>
            </ul>
          </li>
          <li>データベースの右上の「...」をクリックし、「コネクトを追加」を選択</li>
          <li>先ほど作成した「note with Notion」統合を選択して接続</li>
        </ol>
      </div>
    </div>
  );
} 