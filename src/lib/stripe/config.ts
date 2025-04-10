import Stripe from 'stripe';

// APIキーを直接取得（デバッグ用）
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';

console.log('Stripe設定を初期化中...', {
  keyExists: !!STRIPE_SECRET_KEY,
  keyLength: STRIPE_SECRET_KEY.length,
  keyPrefix: STRIPE_SECRET_KEY.substring(0, 7)
});

// Stripe APIキーを使用してStripeクライアントを初期化
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'note with Notion',
    version: '0.1.0'
  }
}); 