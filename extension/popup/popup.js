// Firebase設定を無効化し、シンプルなログイン管理に
document.addEventListener('DOMContentLoaded', function() {
  console.log('ポップアップ初期化開始');
  
  // デバッグ: 現在のストレージ内容を確認
  chrome.storage.local.get(null, function(data) {
    console.log('初期化時のストレージ内容:', data);
    
    // テスト用のログインフォーム表示
    setupLoginForm();
    
    // 以下の処理は、ユーザーがログインしている場合のみ実行
    if (data.userEmail) {
      // ユーザー情報の設定
      setupUserInfo();
      
      // プラン情報の設定
      setupPlanInfo();
    }
  });
  
  // ボタンのイベントリスナー設定（ログイン状態に関わらず）
  setupButtonListeners();
});

// ユーザー情報の設定
function setupUserInfo() {
  // ストレージからユーザー情報を取得
  chrome.storage.local.get(['userEmail'], function(result) {
    if (result.userEmail) {
      const emailElement = document.getElementById('user-email');
      if (emailElement) {
        emailElement.textContent = result.userEmail;
      }
      
      // アバターの頭文字を設定
      const avatar = document.querySelector('.avatar');
      if (avatar && result.userEmail) {
        const initial = result.userEmail.charAt(0).toUpperCase();
        avatar.textContent = initial;
      }
    }
  });
}

// プラン情報の設定
function setupPlanInfo() {
  // ストレージからプラン情報を取得
  chrome.storage.local.get(['userPlan', 'isPremium'], function(result) {
    const planElement = document.getElementById('current-plan');
    if (planElement) {
      if (result.isPremium) {
        planElement.textContent = 'プレミアムプラン';
        planElement.style.backgroundColor = '#10b981';
        
        // アップグレードボタンを非表示
        const upgradeButton = document.getElementById('upgrade-button');
        if (upgradeButton) {
          upgradeButton.style.display = 'none';
        }
      } else {
        planElement.textContent = '無料プラン';
      }
    }
  });
}

// ボタンのイベントリスナー設定
function setupButtonListeners() {
  // マイページを開くボタン
  document.getElementById('dashboard-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://あなたのドメイン.vercel.app/dashboard' });
  });
  
  // Webサイトを開くボタン
  document.getElementById('website-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://あなたのドメイン.vercel.app/' });
  });
  
  // 料金プランを見るボタン
  document.getElementById('pricing-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://あなたのドメイン.vercel.app/pricing' });
  });
  
  // アップグレードボタン
  document.getElementById('upgrade-button').addEventListener('click', function() {
    chrome.tabs.create({ url: 'https://あなたのドメイン.vercel.app/pricing?upgrade=true' });
  });
  
  // ログアウトボタン
  document.getElementById('logout-button').addEventListener('click', function() {
    console.log('ログアウトボタンがクリックされました');
    
    // デバッグ: 現在のストレージ内容を確認
    chrome.storage.local.get(null, function(data) {
      console.log('ログアウト前のストレージ内容:', data);
      
      // ストレージをクリア
      chrome.storage.local.clear(function() {
        if (chrome.runtime.lastError) {
          console.error('ストレージクリアエラー:', chrome.runtime.lastError);
          showNotification('エラー: ' + chrome.runtime.lastError.message);
        } else {
          console.log('ストレージクリア成功');
          showNotification('ログアウトしました');
          
          // 確認のためにストレージ内容を再取得
          chrome.storage.local.get(null, function(emptyData) {
            console.log('ログアウト後のストレージ内容:', emptyData);
            
            // UI更新
            document.getElementById('user-email').textContent = '';
            const avatar = document.querySelector('.avatar');
            if (avatar) avatar.textContent = '?';
            
            // 1秒後にリロード
            setTimeout(function() {
              console.log('ページをリロード');
              window.location.reload();
            }, 1000);
          });
        }
      });
    });
  });
}

// 通知表示関数
function showNotification(message) {
  // 既存の通知を削除
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

// エラーハンドリング
window.addEventListener('error', function(e) {
  console.error('ポップアップエラー:', e.message);
});

// テスト用のログインフォームセットアップ
function setupLoginForm() {
  const loginSection = document.createElement('div');
  loginSection.className = 'login-section';
  loginSection.innerHTML = `
    <button id="login-test-button" class="button primary">
      テストログイン
    </button>
    <button id="reset-storage-button" class="button danger">
      ストレージリセット
    </button>
  `;
  
  // ボタンを最上部に追加
  document.querySelector('.container').prepend(loginSection);
  
  // テストログインボタンのイベントリスナー
  document.getElementById('login-test-button').addEventListener('click', function() {
    const testData = {
      userEmail: 'test@example.com',
      userName: 'テストユーザー',
      userPlan: 'free',
      isPremium: false,
      authToken: 'test-token-123'
    };
    
    chrome.storage.local.set(testData, function() {
      console.log('テストユーザーとしてログインしました');
      showNotification('テストログイン完了');
      setTimeout(() => window.location.reload(), 1000);
    });
  });
  
  // ストレージリセットボタンのイベントリスナー
  document.getElementById('reset-storage-button').addEventListener('click', function() {
    chrome.storage.local.clear(function() {
      console.log('ストレージがリセットされました');
      showNotification('ストレージリセット完了');
      setTimeout(() => window.location.reload(), 1000);
    });
  });
} 