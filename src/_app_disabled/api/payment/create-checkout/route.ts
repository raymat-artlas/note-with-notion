import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import Stripe from 'stripe';

// StripeのAPIキーが環境変数にあることを確認
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Stripeの最新APIバージョン
});

export async function POST(request: Request) {
  try {
    // 認証トークンの検証
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: '認証が必要です' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    
    // Stripeの顧客IDをFirestoreから取得または新規作成
    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();
    
    let stripeCustomerId: string;
    
    if (userDoc.exists && userDoc.data()?.stripeCustomerId) {
      // 既存の顧客IDを使用
      stripeCustomerId = userDoc.data()?.stripeCustomerId;
    } else {
      // 新しいStripe顧客を作成
      const userData = userDoc.data() || {};
      const customer = await stripe.customers.create({
        email: decodedToken.email || undefined,
        metadata: {
          firebaseUID: uid
        }
      });
      
      // FirestoreにStripe顧客IDを保存
      await userRef.set({
        ...userData,
        stripeCustomerId: customer.id
      }, { merge: true });
      
      stripeCustomerId = customer.id;
    }
    
    // チェックアウトセッションを作成
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'note with Notion プレミアム',
              description: '毎月の自動更新サブスクリプション'
            },
            unit_amount: 500, // 500円
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?payment=canceled`,
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripeチェックアウト作成エラー:', error);
    return NextResponse.json(
      { message: error.message || 'チェックアウト作成中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 