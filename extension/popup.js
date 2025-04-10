// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
  // ユーザー情報の初期化
  initializeUserInfo();
  
  // ボタンのイベントリスナー設定
  setupButtonListeners();
  
  // UIエフェクト設定
  setupEffects();
});

// ユーザー情報の初期化
function initializeUserInfo() {
  chrome.storage.local.get(['authToken', 'userEmail', 'userName'], function(result) {
    if (result.userEmail) {
      // ユーザーのメールアドレスを表示
      document.getElementById('user-email').textContent = result.userEmail;
      
      // アバターの頭文字を設定
      const firstLetter = result.userEmail.charAt(0).toUpperCase();
      document.querySelector('.avatar').textContent = firstLetter;
    } else {
      // ログインしていない場合はログインページにリダイレクト
      redirectToLogin();
    }
  });
}

// ボタンのイベントリスナー設定
function setupButtonListeners() {
  // マイページボタン
  document.getElementById('dashboard-button').addEventListener('click', function() {
    // Webサイトのマイページを開く
    chrome.tabs.create({ url: 'https://note-with-notion.vercel.app/dashboard' });
  });
  
  // Webサイトを開くボタン
  document.getElementById('website-button').addEventListener('click', function() {
    // Webサイトのホームページを開く
    chrome.tabs.create({ url: 'https://note-with-notion.vercel.app/' });
  });
  
  // 料金プランボタン
  document.getElementById('pricing-button').addEventListener('click', function() {
    // 料金プランページを開く
    chrome.tabs.create({ url: 'https://note-with-notion.vercel.app/pricing' });
  });
  
  // ハイライトボタン
  document.getElementById('highlight-button').addEventListener('click', function() {
    // 現在のタブでハイライト機能を有効化するメッセージを送信
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableHighlightMode"});
        window.close(); // ポップアップを閉じる
      } else {
        showNotification('テキストをハイライトできるページを開いてください');
      }
    });
  });
  
  // ログアウトボタン
  document.getElementById('logout-button').addEventListener('click', function() {
    // 確認ダイアログ
    if (confirm('ログアウトしますか？')) {
      // ログアウト処理
      chrome.storage.local.remove(['authToken', 'userEmail', 'userName', 'isPremium'], function() {
        console.log('ログアウトしました');
        
        // Firebaseからのログアウト処理（必要に応じて）
        if (typeof firebase !== 'undefined' && firebase.auth) {
          firebase.auth().signOut();
        }
        
        // ログイン画面にリダイレクト
        redirectToLogin();
      });
    }
  });
}

// UIエフェクト設定
function setupEffects() {
  // ボタンホバーエフェクト強化
  const buttons = document.querySelectorAll('.button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // ユーザー情報エフェクト
  const userInfo = document.querySelector('.user-info');
  
  if (userInfo) {
    userInfo.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#e5e7eb';
    });
    
    userInfo.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '#f3f4f6';
    });
  }
}

// ログインページへリダイレクト
function redirectToLogin() {
  chrome.tabs.create({ url: 'https://note-with-notion.vercel.app/login' });
}

// 通知表示
function showNotification(message) {
  // 既存の通知があれば削除
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // 通知要素を作成
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // ドキュメントに追加
  document.body.appendChild(notification);
  
  // 3秒後に削除
  setTimeout(function() {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
} 