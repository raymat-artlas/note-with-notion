'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserData } from '@/lib/firebase/users';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function AccountSettings() {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setDisplayName(userData.displayName || '');
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

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    setSuccess(false);
    setError('');
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName });
      setSuccess(true);
    } catch (err) {
      console.error('プロフィールの保存に失敗しました', err);
      setError('プロフィールの保存に失敗しました。もう一度お試しください。');
    } finally {
      setSaving(false);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      console.log('ログアウト成功');
      window.location.href = '/login';
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">アカウント設定</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">プロフィール情報</h2>
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-sm text-green-700">プロフィールが正常に保存されました</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSaveProfile}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              disabled
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <p className="mt-1 text-xs text-gray-500">メールアドレスは変更できません</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              表示名
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? '保存中...' : 'プロフィールを保存'}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-red-600">危険な操作</h2>
        
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            ログアウト
          </button>
          
          <button
            className="px-4 py-2 ml-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              if (window.confirm('本当にアカウントを削除しますか？この操作は元に戻せません。')) {
                // アカウント削除処理を実装
                alert('この機能はまだ実装されていません');
              }
            }}
          >
            アカウントを削除
          </button>
        </div>
      </div>
    </div>
  );
} 