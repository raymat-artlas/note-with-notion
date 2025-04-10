import { loadStripe, Stripe as StripeClient } from '@stripe/stripe-js';

// シングルトンパターンでStripeインスタンスを管理
let stripePromise: Promise<StripeClient | null> | null = null;

export const getStripe = async () => {
  if (!stripePromise) {
    // 公開キーのみを使用（必ずNEXT_PUBLIC_から始まる環境変数を使う）
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!key) {
      console.error('Stripe公開キーが見つかりません');
      throw new Error('決済システムの初期化に失敗しました');
    }
    
    // 明示的にログ出力（デバッグ用）
    console.log('Stripeクライアント初期化: 公開キーのプレフィックス=', key.substring(0, 8));
    
    // キーの検証（pkから始まることを確認）
    if (!key.startsWith('pk_')) {
      console.error('無効なStripe公開キーフォーマット');
      throw new Error('無効なStripe公開キー形式');
    }
    
    stripePromise = loadStripe(key);
  }
  
  return stripePromise;
}; 