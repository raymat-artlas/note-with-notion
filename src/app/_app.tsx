'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase/config';

// 他のインポート...

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Firebaseはクライアントサイドでのみ初期化
    console.log('Firebase app initialized');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 