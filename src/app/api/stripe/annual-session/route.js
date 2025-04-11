import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    console.log('Stripe API: チェックアウトセッション作成開始');
    
    // 価格IDを取得
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      console.log('Stripe API: 価格IDが設定されていません');
      return Response.json({ error: '価格IDが設定されていません' }, { status: 400 });
    }

    // 確実にベースURLを取得する関数
    const getBaseUrl = () => {
      if (process.env.NEXT_PUBLIC_URL) {
        return process.env.NEXT_PUBLIC_URL;
      }
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return 'http://localhost:3000';
    };

    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/dashboard?success=true`;
    const cancelUrl = `${baseUrl}/plans?error=stripe_error`;

    // セッション作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.log('Stripe session creation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
} 