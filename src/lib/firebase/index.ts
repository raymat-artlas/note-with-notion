// このファイルはクライアント側でのみ使用する
'use client';

// クライアント側のFirebaseのみをインポート
import app, { auth, db } from './client';

export { auth, db };
export default app;

// デフォルトとして config をエクスポート
export { default } from './config'; 