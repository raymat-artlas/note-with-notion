'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// 認証コンテキストの型定義
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// デフォルト値
const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {}
};

// コンテキスト作成
const AuthContext = createContext<AuthContextType>(defaultContext);

// 認証プロバイダーコンポーネント
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // 認証状態を監視
  useEffect(() => {
    // ブラウザ環境でのみ実行
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        setAuthInitialized(true);
      });

      return () => unsubscribe();
    } else {
      // サーバーサイドでは即座に読み込み完了
      setLoading(false);
    }
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // サインアップ処理
  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('サインアップエラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// カスタムフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 