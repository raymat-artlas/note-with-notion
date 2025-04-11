export const auth = initializeAuth();

function initializeAuth() {
  if (typeof window !== 'undefined') {
    // クライアント側の初期化
    const { getAuth } = require('firebase/auth');
    const { app } = require('./firebase');
    return getAuth(app);
  }
  return null;
} 