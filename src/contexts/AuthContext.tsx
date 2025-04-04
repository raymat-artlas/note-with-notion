'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// シンプル化した認証コンテキスト
interface AuthContextType {
  user: null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  bypassAuth: () => void;
}

// 初期コンテキスト値
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  signOut: async () => {},
  bypassAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 認証をバイパスする機能（デバッグ用）
  const bypassAuth = () => {
    console.log('⚠️ 認証バイパスモードを有効化');
    setLoading(false);
    setError(null);
  };
  
  // シンプル化したサインアウト関数
  const signOut = async () => {
    console.log('サインアウト処理（現在無効化中）');
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ 
      user: null, 
      loading, 
      error, 
      signOut, 
      bypassAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};