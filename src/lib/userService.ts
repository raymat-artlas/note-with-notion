import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  Timestamp,
  FieldValue
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

// ユーザープロファイルの型定義
export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  createdAt?: Timestamp | FieldValue | null;
  lastLoginAt?: Timestamp | FieldValue | null;
};

// ユーザー登録時にFirestoreにユーザー情報を保存
export const createUserProfile = async (user: User): Promise<void> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return;
  }

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const userData: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    };
    
    await setDoc(userRef, userData);
  } else {
    // 既存ユーザーの場合は最終ログイン時間のみ更新
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp()
    });
  }
};

// ユーザープロファイルの取得
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return null;
  }

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  
  return null;
};

// ユーザープロファイルを更新
export const updateUserProfile = async (uid: string, profileData: any): Promise<void> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return;
  }

  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...profileData,
    updatedAt: serverTimestamp(),
  });
}; 