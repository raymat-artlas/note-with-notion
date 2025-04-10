// APIエンドポイント
const API_BASE_URL = 'http://localhost:9876';

// リクエストヘッダーにJSONコンテンツタイプを設定
const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// 多言語対応のためのメッセージ
const messages = {
  ja: {
    loginSuccess: 'ログインに成功しました',
    loginFailed: 'ログインに失敗しました',
    notionSaveSuccess: 'Notionに保存しました',
    notionSaveError: 'Notionへの保存に失敗しました'
  },
  en: {
    loginSuccess: 'Login successful',
    loginFailed: 'Login failed',
    notionSaveSuccess: 'Saved to Notion',
    notionSaveError: 'Failed to save to Notion'
  }
};

// 言語設定
const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';

// オフラインモードとデモユーザー
let OFFLINE_MODE = false;
const DEMO_USER = {
  email: 'demo@example.com',
  token: 'demo-token-12345',
  plan: 'free'
};

// APIエンドポイントを動的に取得
async function getApiEndpoint() {
  try {
    const { apiUrl, offlineMode } = await chrome.storage.local.get(['apiUrl', 'offlineMode']);
    OFFLINE_MODE = offlineMode === true;
    
    if (OFFLINE_MODE) {
      console.log('⚠️ オフラインモードで動作中');
      return null;
    }
    
    return apiUrl || API_BASE_URL;
  } catch (error) {
    console.error('API設定取得エラー:', error);
    return API_BASE_URL;
  }
}

// 認証処理 - API接続問題に強い実装
async function loginWithAPIFallback(email, password) {
  try {
    // オフラインモードの場合
    if (OFFLINE_MODE) {
      console.log('オフラインモードでログイン中...');
      
      // デモユーザーと一致するか確認
      if (email === DEMO_USER.email && password === 'demo') {
        await chrome.storage.local.set({
          isLoggedIn: true,
          authToken: DEMO_USER.token,
          userEmail: DEMO_USER.email,
          loginTimestamp: Date.now(),
          userPlan: DEMO_USER.plan
        });
        
        console.log('デモユーザーでログイン成功');
        return { success: true, user: { email: DEMO_USER.email, plan: DEMO_USER.plan } };
      } else {
        return { success: false, error: 'オフラインモード: デモアカウント(demo@example.com / demo)のみログイン可能です' };
      }
    }
    
    // 通常の認証フロー
    const apiEndpoint = await getApiEndpoint();
    console.log(`${apiEndpoint}/api/auth/login にリクエスト送信中...`);
    
    const response = await fetch(`${apiEndpoint}/api/auth/login`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      // 認証情報をストレージに保存
      await chrome.storage.local.set({
        isLoggedIn: true,
        authToken: data.token,
        userEmail: email,
        loginTimestamp: Date.now()
      });
      
      console.log('ログイン成功:', email);
      return { success: true, user: { email } };
    } else {
      console.error('ログイン失敗:', data.error || response.statusText);
      return { success: false, error: data.error || 'ログインに失敗しました' };
    }
  } catch (error) {
    console.error('認証API呼び出しエラー:', error);
    
    // 接続エラーの場合はオフラインモードを提案
    if (error.message === 'Failed to fetch') {
      return { 
        success: false, 
        error: 'APIサーバーに接続できません。ネットワーク接続を確認するか、オフラインモードを有効にしてください。',
        isConnectionError: true
      };
    }
    
    return { success: false, error: error.message };
  }
}

// トークン検証関数
async function validateAuthToken() {
  try {
    const { authToken, loginTimestamp } = await chrome.storage.local.get(['authToken', 'loginTimestamp']);
    
    if (!authToken) {
      return { isValid: false, reason: 'トークンがありません' };
    }
    
    // トークンの期限切れをチェック（24時間）
    if (loginTimestamp && (Date.now() - loginTimestamp > 24 * 60 * 60 * 1000)) {
      return { isValid: false, reason: 'トークンの期限切れです' };
    }
    
    // APIを使用してトークンを検証
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error('トークン検証に失敗しました');
    }
    
    const userData = await response.json();
    return { isValid: true, user: userData };
  } catch (error) {
    console.error('トークン検証エラー:', error);
    return { isValid: false, reason: 'トークン検証エラー', error: error.message };
  }
}

// ログアウト関数
async function logoutUser() {
  // ローカルストレージからログイン情報を削除
  await chrome.storage.local.set({
    isLoggedIn: false,
    authToken: null,
    userId: null,
    userEmail: null,
    loginTimestamp: null
  });
  
  console.log('ログアウト処理完了');
  return { success: true };
}

// エラーハンドリング
self.addEventListener('error', function(event) {
  console.error('バックグラウンドスクリプトエラー:', event.message);
});

// Firebase設定を直接指定
const firebaseConfig = {
  apiKey: "AIzaSyBlmFr1mDOl2mSYlg4TJ1go9upffSwKSVY",
  authDomain: "note-with-notion-10644.firebaseapp.com",
  projectId: "note-with-notion-10644",
  storageBucket: "note-with-notion-10644.firebasestorage.app",
  messagingSenderId: "508991173821",
  appId: "1:508991173821:web:eac65e7b34c5a6cfa473d4",
  measurementId: "G-QS2BQLQ5RC"
};

// Firebase初期化関数を修正 - Service Worker対応
async function initializeFirebase() {
  try {
    // サービスワーカーでは直接firebaseは使えない
    // 代わりに成功を返す（実際の初期化はポップアップで行う）
    console.log('Firebaseの初期化情報を準備しました');
    return true;
  } catch (error) {
    console.error('Firebase初期化情報エラー:', error);
    return false;
  }
}

// 認証方法を修正 - ポップアップにメッセージングで依頼する方式
async function loginUser(email, password) {
  try {
    // オフラインモードの場合は直接APIフォールバックを使用
    const { offlineMode } = await chrome.storage.local.get(['offlineMode']);
    if (offlineMode) {
      return loginWithAPIFallback(email, password);
    }
    
    // APIフォールバックを使用
    return loginWithAPIFallback(email, password);
  } catch (error) {
    console.error('認証エラー:', error);
    return { success: false, error: error.message };
  }
}

// メッセージハンドラを更新
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('受信したメッセージ:', request);
  
  // ログインリクエスト
  if (request.action === 'login') {
    loginUser(request.data?.email, request.data?.password)
      .then(result => {
        sendResponse(result);
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // 非同期レスポンス
  }
  
  // ログアウトリクエスト
  if (request.action === 'logout') {
    logoutUser()
      .then(result => {
        sendResponse(result);
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
  
  // トークン検証リクエスト
  if (request.action === 'validateToken') {
    validateAuthToken()
      .then(result => {
        sendResponse(result);
      })
      .catch(error => {
        sendResponse({ isValid: false, error: error.message });
      });
    return true;
  }
  
  // オンライン/オフラインモード切替リクエスト
  if (request.action === 'toggleOfflineMode') {
    chrome.storage.local.get(['offlineMode'], function(result) {
      const newMode = !result.offlineMode;
      chrome.storage.local.set({ offlineMode: newMode }, function() {
        OFFLINE_MODE = newMode;
        sendResponse({ success: true, offlineMode: newMode });
      });
    });
    return true;
  }
  
  // Firebase設定取得リクエスト
  if (request.action === 'getFirebaseConfig') {
    initializeFirebase()
      .then(result => {
        sendResponse(result);
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
  
  // APIヘルスチェック
  if (request.action === 'healthCheck') {
    fetch(`${API_BASE_URL}/api/healthcheck`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({success: true, data});
    })
    .catch(error => {
      sendResponse({success: false, error: error.toString()});
    });
    return true;
  }
  
  return false; // 同期レスポンス
});

// 拡張機能起動時にオンラインモードを試みる
chrome.runtime.onInstalled.addListener(() => {
  console.log('拡張機能がインストールされました');
  
  // インストール時にストレージをクリアして初期状態にリセット
  chrome.storage.local.clear(() => {
    console.log('ストレージがクリアされました');
  });
});

// デバッグ用：メッセージリスナー
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('バックグラウンドでメッセージを受信:', message);
  
  if (message.action === 'forceLogout') {
    chrome.storage.local.clear(() => {
      console.log('強制ログアウト: ストレージがクリアされました');
      sendResponse({success: true});
    });
    return true; // 非同期レスポンスのために必要
  }
}); 