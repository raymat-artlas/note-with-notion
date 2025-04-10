// Firebaseとサブスクリプション管理の連携
const { initializeApp } = require('firebase/app');
const { getAuth, onAuthStateChanged } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

// Firebase設定のインポート
const firebaseConfig = {
  // 設定値
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ユーザーのサブスクリプション情報を更新
async function updateUserSubscription(userId, subscriptionData) {
  try {
    await setDoc(doc(db, 'users', userId), {
      subscription: subscriptionData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('サブスクリプション情報を更新しました');
    return true;
  } catch (error) {
    console.error('サブスクリプション更新エラー:', error);
    return false;
  }
}

// ユーザーのサブスクリプション情報を取得
async function getUserSubscription(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().subscription;
    }
    return null;
  } catch (error) {
    console.error('サブスクリプション取得エラー:', error);
    return null;
  }
}

module.exports = {
  updateUserSubscription,
  getUserSubscription
}; 