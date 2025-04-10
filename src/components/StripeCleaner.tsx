'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

/**
 * Stripeリダイレクト後のURLパラメータをクリーンアップするコンポーネント
 * レイアウトに配置することで、アプリ全体で動作します
 */
export default function StripeCleaner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Stripeからのリダイレクト後にURLからパラメータをクリーンアップ
    if (searchParams && (searchParams.has('payment_intent') || searchParams.has('setup_intent'))) {
      // URLからStripeパラメータを削除した新しいURLを構築
      const cleanURL = pathname;
      console.log('Stripeパラメータをクリーンアップ:', cleanURL);
      router.replace(cleanURL);
    }
  }, [pathname, router, searchParams]);

  // 何もレンダリングしない
  return null;
} 