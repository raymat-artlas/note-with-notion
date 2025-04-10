import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDK設定
const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Firebaseアプリが初期化済みでない場合のみ初期化
const apps = getApps();
if (!apps.length) {
  initializeApp({
    credential: cert(firebaseAdminConfig),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

// 認証とデータベースのインスタンスをエクスポート
export const adminAuth = getAuth();
export const adminDb = getFirestore(); 