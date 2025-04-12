// Firebase初期化ファイル
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase設定
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// クライアントサイドのみで初期化
let app: FirebaseApp;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
} else if (getApps().length > 0) {
  app = getApps()[0];
} else {
  // サーバーサイドでは初期化しない
  app = {} as FirebaseApp;
}

export const auth = typeof window !== 'undefined' ? getAuth(app) : ({} as any);
export const db = typeof window !== 'undefined' ? getFirestore(app) : ({} as any);
export default app; 