const express = require('express');
const path = require('path');
const app = express();
const port = 9876;

// 環境変数の読み込み
require('dotenv').config();

// 環境変数チェック
console.log('=== 環境変数チェック ===');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '設定済み' : '未設定');
console.log('NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID:', process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID ? '設定済み' : '未設定');
console.log('NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID:', process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID ? '設定済み' : '未設定');

// Stripeライブラリをインポート
let stripe;
try {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  console.log('Stripeライブラリの初期化に成功しました');
} catch (error) {
  console.error('Stripeライブラリの初期化に失敗しました:', error);
}

// JSONボディパーサーの追加
app.use(express.json());

// 静的ファイルを提供
app.use(express.static('extension'));

// CORS設定を追加
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error('エラーが発生しました:', err);
  res.status(500).send('Internal Server Error');
});

// ルート
app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'extension/plans.html'));
});

// ルートパスも料金ページにリダイレクト
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'extension/plans.html'));
});

// Stripe連携用のエンドポイント
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('Checkout session APIが呼び出されました');
    const { priceId, billingInterval, userEmail } = req.body;
    console.log('リクエストボディ:', { priceId, billingInterval, userEmail });
    
    // 料金プランの選択（月額または年額）
    let price;
    if (billingInterval === 'year') {
      console.log('年額プランが選択されました');
      price = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID;
    } else {
      console.log('月額プランが選択されました');
      price = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID;
    }
    
    // 価格IDがない場合はハードコードされた値を使用
    const fallbackPrice = billingInterval === 'year' 
      ? 'price_1R8l9LCji9fPithE7quOkmQW'  // 年額プランの実際の価格ID 
      : 'price_1R8l6dCji9fPithEjEoP7ShR'; // 月額プランの実際の価格ID
    
    const selectedPrice = price || fallbackPrice || priceId;
    console.log('使用する価格ID:', selectedPrice);
    
    // Stripeセッション作成
    if (!stripe) {
      throw new Error('Stripeライブラリが初期化されていません');
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail,
      line_items: [
        {
          price: selectedPrice,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/pricing`,
    });
    
    console.log('Stripeセッション作成成功:', session.url);
    res.json({ 
      success: true,
      sessionUrl: session.url 
    });
  } catch (error) {
    console.error('Stripe処理エラー詳細:', error);
    res.status(500).json({ 
      error: `Stripeセッションの作成に失敗しました: ${error.message}`,
      stack: error.stack
    });
  }
});

// 成功ページのルート
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'extension/success.html'));
});

// Stripe Webhook処理
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook署名検証エラー:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // イベントタイプに基づいて処理
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('決済完了:', session);
      // ここでユーザーのプラン情報を更新する処理
      // Firebaseなどのデータベースと連携
      break;
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('サブスクリプション更新:', subscription);
      // ユーザーのサブスクリプションステータスを更新
      break;
    default:
      console.log(`処理されないイベントタイプ: ${event.type}`);
  }
  
  res.json({ received: true });
});

// Stripeセッション情報取得エンドポイント（サンクスページ用）
app.get('/api/checkout-session', async (req, res) => {
  try {
    const { session_id } = req.query;
    
    if (!session_id) {
      return res.status(400).json({ error: 'セッションIDが必要です' });
    }
    
    // Stripeからセッション情報を取得
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer']
    });
    
    res.json({
      success: true,
      session: session,
      customer: session.customer,
      subscription: session.subscription
    });
  } catch (error) {
    console.error('セッション取得エラー:', error);
    res.status(500).json({ error: error.message });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
}); 