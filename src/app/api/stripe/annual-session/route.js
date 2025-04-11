// URLの生成部分を修正
const baseUrl = process.env.NEXT_PUBLIC_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

// 絶対URLを確実に生成（http/httpsで始まるURLを保証）
const successUrl = new URL('/dashboard?success=true', baseUrl).toString();
const cancelUrl = new URL('/plans?error=stripe_error', baseUrl).toString();

// Stripeセッション作成時にこれらのURLを使用
const session = await stripe.checkout.sessions.create({
  // 他のパラメータ...
  success_url: successUrl,
  cancel_url: cancelUrl,
  // 残りのパラメータ...
}); 