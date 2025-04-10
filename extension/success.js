document.addEventListener('DOMContentLoaded', function() {
  // URLパラメータからセッションIDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (sessionId) {
    console.log('セッションID:', sessionId);
    // サーバーからセッション詳細を取得することもできます
    fetchSessionDetails(sessionId);
  }
  
  // 注文情報の表示
  // 実際には、サーバーから取得した情報を反映させます
  updateOrderInfo();
  
  // ボタンイベントリスナー
  document.getElementById('go-to-dashboard').addEventListener('click', function() {
    // ダッシュボードページに移動
    window.location.href = '/dashboard.html';
  });
  
  document.getElementById('back-to-home').addEventListener('click', function() {
    // ホームページに移動
    window.location.href = '/';
  });
  
  document.getElementById('open-extension').addEventListener('click', function(e) {
    e.preventDefault();
    // Chrome拡張機能を開く（実際にはChrome APIを使用）
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage({ action: 'openExtension' });
    } else {
      alert('Chrome拡張機能の環境ではありません');
    }
  });
  
  document.getElementById('contact-support').addEventListener('click', function(e) {
    e.preventDefault();
    // サポートフォームを開く
    window.open('mailto:support@example.com', '_blank');
  });
});

// セッション詳細を取得（任意）
async function fetchSessionDetails(sessionId) {
  try {
    const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
    if (response.ok) {
      const data = await response.json();
      // セッション情報を表示
      updateOrderInfo(data);
    }
  } catch (error) {
    console.error('セッション詳細の取得に失敗:', error);
  }
}

// 注文情報の更新
function updateOrderInfo(data) {
  // URLパラメータからプラン種別を取得
  const urlParams = new URLSearchParams(window.location.search);
  const planType = urlParams.get('plan') || 'monthly';
  
  const planNameElement = document.getElementById('plan-name');
  const planPriceElement = document.getElementById('plan-price');
  
  // サーバーから取得したデータがある場合はそれを使用
  if (data && data.subscription) {
    planNameElement.textContent = data.subscription.plan.nickname || 'プレミアム';
    planPriceElement.textContent = `${formatAmount(data.subscription.plan.amount)} / ${getPlanInterval(data.subscription.plan.interval)}`;
  } else {
    // デフォルト値
    if (planType === 'yearly') {
      planNameElement.textContent = 'プレミアム（年額）';
      planPriceElement.textContent = '¥4,800 / 年';
    } else {
      planNameElement.textContent = 'プレミアム（月額）';
      planPriceElement.textContent = '¥500 / 月';
    }
  }
}

// 金額のフォーマット
function formatAmount(amount) {
  return `¥${amount / 100}`;
}

// 課金間隔の日本語表示
function getPlanInterval(interval) {
  const intervals = {
    month: '月',
    year: '年',
    week: '週',
    day: '日'
  };
  return intervals[interval] || interval;
} 