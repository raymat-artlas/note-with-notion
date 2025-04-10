'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 環境変数または固定設定からFirebase設定を取得
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBlmFr1mDOl2mSYlg4TJ1go9upffSwKSVY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "note-with-notion-10644.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "note-with-notion-10644",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "note-with-notion-10644.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "508991173821",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:508991173821:web:eac65e7b34c5a6cfa473d4",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-QS2BQLQ5RC"
};

// アプリの初期化
let firebaseApp;
let auth;
let db;

// クライアント側でのみ初期化
if (typeof window !== 'undefined') {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
}

// Firebase認証ヘルパー関数
export const loginWithEmail = async (email, password) => {
  if (!auth) return { success: false, error: 'Auth not initialized' };
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  if (!auth) return { success: false, error: 'Auth not initialized' };
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// エクスポート
export { firebaseApp, auth, db }; 