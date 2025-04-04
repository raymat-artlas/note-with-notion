import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase初期化が複数回実行されないようにチェック
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 認証とFirestoreのインスタンスをエクスポート
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('Firebase initialized:', {
  isAppInitialized: !!app,
  isAuthInitialized: !!auth,
  projectId: firebaseConfig.projectId
}); 