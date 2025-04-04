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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: useEffect 実行');
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged 呼び出し:', user ? '認証済み' : '未認証');
      setCurrentUser(user);
      setLoading(false);

      // ローカルストレージにもユーザー情報を保存（ブラウザ環境のみ）
      if (typeof window !== 'undefined') {
        if (user?.uid) {
          localStorage.setItem('uid', user.uid);
          
          // Chrome拡張機能向け (オプショナル)
          if (window.chrome?.storage?.local) {
            window.chrome.storage.local.set({ uid: user.uid });
          }
        } else {
          localStorage.removeItem('uid');
          
          // Chrome拡張機能向け (オプショナル)
          if (window.chrome?.storage?.local) {
            window.chrome.storage.local.remove('uid');
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // デバッグ用ログ
  console.log('AuthProvider render:', { loading, user: currentUser?.email });

  return (
    <AuthContext.Provider value={{ user: currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};