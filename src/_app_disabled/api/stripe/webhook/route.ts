import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { adminDb } from '@/lib/firebase/admin';
import { headers } from 'next/headers';

// 新しい設定のみを使用
export const dynamic = 'force-dynamic';
// webhookがraw bodyを処理できるようにする
export const bodyParser = false;

export async function POST(request: Request) {
  // 一時的に単純なレスポンスを返す
  return new Response(JSON.stringify({ 
    status: 'success', 
    message: 'Webhook handling temporarily disabled'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // 以下のコードはコメントアウト
  /*
  const body = await request.text();
  const signature = headers().get('stripe-signature') || '';
  
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Webhook secret not set' },
      { status: 500 }
    );
  }
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // イベントタイプに基づいた処理
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as any;
        
        // ユーザーのサブスクリプション情報を更新
        if (session.client_reference_id) {
          await adminDb
            .collection('users')
            .doc(session.client_reference_id)
            .update({
              'subscription.status': 'active',
              'subscription.plan': session.metadata?.plan || 'monthly',
              'subscription.stripeCustomerId': session.customer,
              'subscription.updated': new Date().toISOString(),
            });
        }
        break;
        
      case 'customer.subscription.updated':
        const subscription = event.data.object as any;
        
        // Firestoreからユーザーを検索
        const userQuery = await adminDb
          .collection('users')
          .where('subscription.stripeCustomerId', '==', subscription.customer)
          .get();
        
        if (!userQuery.empty) {
          await userQuery.docs[0].ref.update({
            'subscription.status': subscription.status,
            'subscription.updated': new Date().toISOString(),
          });
        }
        break;
        
      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object as any;
        
        // キャンセルされたサブスクリプションを持つユーザーを検索
        const canceledUserQuery = await adminDb
          .collection('users')
          .where('subscription.stripeCustomerId', '==', canceledSubscription.customer)
          .get();
        
        if (!canceledUserQuery.empty) {
          await canceledUserQuery.docs[0].ref.update({
            'subscription.status': 'inactive',
            'subscription.plan': 'free',
            'subscription.updated': new Date().toISOString(),
          });
        }
        break;
    }
    
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return NextResponse.json(
      { message: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
  */
} 