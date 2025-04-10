// Firebaseモジュールをエクスポート
// これにより `@/lib/firebase` として参照できるようになります
export * from './auth';
export * from './config';
export * from './firestore';
export * from './admin';

// デフォルトとして config をエクスポート
export { default } from './config'; 