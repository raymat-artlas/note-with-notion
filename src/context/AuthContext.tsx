'use client';

import { createContext, useContext, useEffect, useState } from 'react';
// firebase/authモジュールから直接インポートを避け、カスタムFirebaseモジュールを使用
import { auth } from '@/lib/firebase/firebase.js';
// 必要な型定義だけをインポート
import type { User as FirebaseUser } from 'firebase/auth';

// 型定義
type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// 認証コンテキスト作成
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// プロバイダーコンポーネント
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // サーバーサイドでは実行しない
    if (typeof window === 'undefined') return;
    
    // authモジュールがクライアント側で初期化されているか確認
    if (!auth) {
      console.error('Firebase auth module not initialized');
      setLoading(false);
      return;
    }
    
    // 認証状態の監視（直接onAuthStateChangedを使わずにカスタム方法で監視）
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// カスタムフック
export const useAuth = () => useContext(AuthContext); 