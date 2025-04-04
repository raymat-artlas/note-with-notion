import { 
  doc, 
  // collection の削除または使わない場合はコメントアウト 
  // collection,
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp, 
  Timestamp,
  FieldValue
} from 'firebase/firestore';
import { db } from './firebase';

// Notion連携情報の型定義
export type NotionIntegration = {
  userId: string;
  apiToken: string;
  databaseId: string;
  createdAt?: Timestamp | FieldValue | null;
  updatedAt?: Timestamp | FieldValue | null;
};

// Notion連携情報をFirestoreに保存
export const saveNotionIntegration = async (
  userId: string, 
  apiToken: string, 
  databaseId: string
): Promise<void> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return;
  }

  const notionRef = doc(db, 'notionIntegrations', userId);
  
  const integrationData: NotionIntegration = {
    userId,
    apiToken,
    databaseId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  await setDoc(notionRef, integrationData);
};

// Notion連携情報を取得
export const getNotionIntegration = async (userId: string): Promise<NotionIntegration | null> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return null;
  }

  const notionRef = doc(db, 'notionIntegrations', userId);
  const notionSnap = await getDoc(notionRef);
  
  if (notionSnap.exists()) {
    return notionSnap.data() as NotionIntegration;
  }
  
  return null;
};

// Notion連携情報を更新
export const updateNotionIntegration = async (
  userId: string, 
  apiToken?: string, 
  databaseId?: string
): Promise<void> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return;
  }

  const notionRef = doc(db, 'notionIntegrations', userId);
  
  const updateData: Partial<NotionIntegration> = {
    updatedAt: serverTimestamp()
  };
  
  if (apiToken) updateData.apiToken = apiToken;
  if (databaseId) updateData.databaseId = databaseId;
  
  await updateDoc(notionRef, updateData);
};

// Notion連携を削除
export const deleteNotionIntegration = async (userId: string): Promise<void> => {
  if (!db) {
    console.error('Firestore が初期化されていません');
    return;
  }

  const notionRef = doc(db, 'notionIntegrations', userId);
  await deleteDoc(notionRef);
}; 