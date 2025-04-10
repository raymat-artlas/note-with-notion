import { getFirestore } from 'firebase/firestore';
import { app } from './config';

// Firestoreインスタンスを初期化
export const db = getFirestore(app); 