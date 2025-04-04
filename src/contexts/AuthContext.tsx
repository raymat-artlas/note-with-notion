'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Chrome拡張機能用の型定義
declare global {
  interface Window {
    chrome?: {
      storage?: {
        local: {
          set: (items: Record<string, unknown>) => void;
          remove: (key: string) => void;
        };
      };
    };
  }
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;  // サインアウト関数を追加
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},  // ダミー関数
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // サインアウト関数
  const signOut = async () => {
    try {
      if (!auth) {
        console.error('認証システムが初期化されていません');
        return;
      }
      
      await auth.signOut();
      localStorage.removeItem('uid');
      
      if (window.chrome?.storage?.local) {
        window.chrome.storage.local.remove('uid');
      }
    } catch (error) {
      console.error('サインアウトエラー:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: useEffect 実行 - 認証状態監視開始');
    
    // auth が undefined の場合はリスナーを設定せず、loading を false に
    if (!auth) {
      console.error('認証システムが初期化されていません');
      setLoading(false);
      return () => {};
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged 呼び出し:', user ? `認証済み: ${user.email}` : '未認証');
      setCurrentUser(user);
      setLoading(false);
      setAuthInitialized(true);

      if (typeof window !== 'undefined') {
        if (user?.uid) {
          console.log('User UID saved:', user.uid);
          localStorage.setItem('uid', user.uid);
          
          if (window.chrome?.storage?.local) {
            window.chrome.storage.local.set({ uid: user.uid });
          }
        } else {
          console.log('User UID removed');
          localStorage.removeItem('uid');
          
          if (window.chrome?.storage?.local) {
            window.chrome.storage.local.remove('uid');
          }
        }
      }
    });

    return () => {
      console.log('Auth listener unsubscribed');
      unsubscribe();
    };
  }, []);

  // デバッグ用ログ
  console.log('AuthProvider render:', { 
    loading, 
    authInitialized,
    user: currentUser?.email,
    hasWindow: typeof window !== 'undefined',
    hasLocalStorage: typeof localStorage !== 'undefined',
  });

  return (
    <AuthContext.Provider value={{ user: currentUser, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};