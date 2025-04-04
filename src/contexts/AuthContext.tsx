'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// シンプル化した認証コンテキスト
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// 初期コンテキスト値
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 認証状態監視を簡素化
    const unsubscribe = auth ? 
      onAuthStateChanged(
        auth,
        (user) => {
          setUser(user);
          setLoading(false);
        },
        (error) => {
          console.error('認証エラー:', error);
          setError('認証エラーが発生しました');
          setLoading(false);
        }
      ) : () => {};

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};