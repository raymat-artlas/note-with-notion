'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

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
          if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ uid: user.uid });
          }
        } catch (_e) {
          console.log('Chrome拡張機能APIが利用できません (通常のブラウザ環境での実行時は無視してください)');
        }
      } else {
        localStorage.removeItem('uid');
        
        // Chrome拡張機能向けにchrome.storage.localからも削除
        try {
          if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.remove('uid');
          }
        } catch (_e) {
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