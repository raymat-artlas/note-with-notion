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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      // 拡張機能向けにUIDを保存（オプショナル）
      if (typeof window !== 'undefined' && window.chrome?.storage?.local) {
        if (user?.uid) {
          window.chrome.storage.local.set({ uid: user.uid });
        } else {
          window.chrome.storage.local.remove('uid');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};