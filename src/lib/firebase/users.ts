import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

type UserData = {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isPremium: boolean;
  notionToken?: string;
  createdAt: number;
  lastLoginAt: number;
};

export async function createUserDocument(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const userData: UserData = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    isPremium: false,
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  };

  await setDoc(userRef, userData);
  return userData;
}

export async function getUserData(uid: string): Promise<UserData | null> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserData;
  } else {
    return null;
  }
}

export async function updateUserNotionToken(uid: string, token: string) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { notionToken: token }, { merge: true });
}

export async function updateUserPremiumStatus(uid: string, isPremium: boolean) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, { isPremium }, { merge: true });
} 