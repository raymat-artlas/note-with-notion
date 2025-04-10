document.addEventListener('DOMContentLoaded', function() {
  console.log('料金プランページが読み込まれました');
  
  // 料金プラン切り替え機能
  const toggleButtons = document.querySelectorAll('.toggle-button');
  const premiumPriceElement = document.getElementById('premium-price');
  const freePriceElement = document.getElementById('free-price');
  
  // 料金プラン情報
  const pricing = {
    month: {
      premium: {
        amount: '¥500',
        period: '/月'
      },
      free: {
        amount: '¥0',
        period: '/月'
      }
    },
    year: {
      premium: {
        amount: '¥4,800',
        period: '/年'
      },
      free: {
        amount: '¥0',
        period: '/年'
      }
    }
  };
  
  // 料金プラン切り替え
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      // ボタンのアクティブ状態を切り替え
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // 選択した課金サイクルを取得
      const billingType = button.getAttribute('data-billing');
      
      // 料金表示を更新
      updatePricing(billingType);
    });
  });
  
  // 料金表示更新関数
  function updatePricing(billingType) {
    const premiumPrice = pricing[billingType].premium;
    const freePrice = pricing[billingType].free;
    
    premiumPriceElement.innerHTML = `
      <span class="amount">${premiumPrice.amount}</span>
      <span class="period">${premiumPrice.period}</span>
    `;
    
    freePriceElement.innerHTML = `
      <span class="amount">${freePrice.amount}</span>
      <span class="period">${freePrice.period}</span>
    `;
  }
  
  // アップグレードボタンのクリックイベント
  const upgradeButton = document.querySelector('.upgrade');
  
  if (upgradeButton) {
    console.log('アップグレードボタンを検出しました');
    
    upgradeButton.addEventListener('click', async function() {
      console.log('アップグレードボタンがクリックされました');
      
      try {
        // アラート通知を削除（開発中の確認用だったため）
        // alert('Premiumプランへのアップグレード処理を開始します（開発中）');
        
        // Chrome拡張機能環境かブラウザ環境かを判定
        const isExtension = typeof chrome !== 'undefined' && chrome.storage;
        
        // 選択された課金タイプを取得
        const billingType = document.querySelector('.toggle-button.active').getAttribute('data-billing');
        
        if (isExtension) {
          // 拡張機能環境での処理 - 既存のコードと同様
          const userInfo = await chrome.storage.local.get(['authToken', 'userEmail']);
          
          if (!userInfo.authToken) {
            alert('プレミアムプランへのアップグレードにはログインが必要です');
            return;
          }
          
          // APIリクエスト
          const response = await fetch('http://localhost:9876/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.authToken}`
            },
            body: JSON.stringify({
              billingInterval: billingType,
              userEmail: userInfo.userEmail
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('Stripeセッション作成成功:', data);
            
            // 支払いページへリダイレクト
            if (data.sessionUrl) {
              window.location.href = data.sessionUrl;
            }
          } else {
            console.error('サーバーエラー:', await response.text());
            alert('サーバーとの通信に失敗しました。後でもう一度お試しください。');
          }
        } else {
          // ブラウザ環境での処理
          const demoResponse = await fetch('http://localhost:9876/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              billingInterval: billingType,
              userEmail: 'demo@example.com'
            })
          });
          
          if (demoResponse.ok) {
            const data = await demoResponse.json();
            // アラートを表示せずに直接リダイレクト
            window.location.href = data.sessionUrl;
          } else {
            alert('サーバー接続エラー: ' + await demoResponse.text());
          }
        }
      } catch (error) {
        console.error('アップグレード処理エラー:', error);
        alert('エラーが発生しました: ' + error.message);
      }
    });
  } else {
    console.error('アップグレードボタンが見つかりません');
  }
  
  // 現在のプランボタンのイベント
  const currentPlanButton = document.querySelector('.current');
  if (currentPlanButton) {
    currentPlanButton.addEventListener('click', function() {
      alert('あなたは既に無料プランを利用中です');
    });
  }

  // 課金オプション選択エフェクト
  const billingOptions = document.querySelectorAll('.billing-option');
  
  billingOptions.forEach(option => {
    option.addEventListener('click', function() {
      // このオプション内のラジオボタンを選択
      const radio = this.querySelector('input[type="radio"]');
      radio.checked = true;
      
      // イベント発火（値の変更を通知）
      const event = new Event('change');
      radio.dispatchEvent(event);
    });
  });

  // タブ切り替え機能
  const tabButtons = document.querySelectorAll('.tab-button');
  const pricingOptions = document.querySelectorAll('.pricing-option');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブタブの切り替え
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // コンテンツの切り替え
      const billingType = button.getAttribute('data-billing');
      pricingOptions.forEach(option => {
        option.classList.remove('active');
      });
      
      if (billingType === 'month') {
        document.getElementById('monthly-plan').classList.add('active');
      } else {
        document.getElementById('yearly-plan').classList.add('active');
      }
    });
  });
});

// 選択された課金タイプを取得する関数
const getBillingInterval = () => {
  const activeTab = document.querySelector('.tab-button.active');
  return activeTab ? activeTab.getAttribute('data-billing') : 'month';
}; 