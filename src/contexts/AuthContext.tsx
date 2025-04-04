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
        }
      }
    }
  }
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Chromeの拡張機能と共有するためローカルストレージにUIDを保存
      if (user) {
        localStorage.setItem('uid', user.uid);
        
        // Chrome拡張機能向けにchrome.storage.localも使用（ブラウザ環境の場合のみ）
        try {
          if (typeof window !== 'undefined' && window.chrome?.storage) {
            window.chrome.storage.local.set({ uid: user.uid });
          }
        } catch {
          console.log('Chrome拡張機能APIが利用できません (通常のブラウザ環境での実行時は無視してください)');
        }
      } else {
        localStorage.removeItem('uid');
        
        // Chrome拡張機能向けにchrome.storage.localからも削除
        try {
          if (typeof window !== 'undefined' && window.chrome?.storage) {
            window.chrome.storage.local.remove('uid');
          }
        } catch {
          console.log('Chrome拡張機能APIが利用できません (通常のブラウザ環境での実行時は無視してください)');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 