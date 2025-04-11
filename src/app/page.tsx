import { redirect } from 'next/navigation';

// App Routerのルートページ - Pages Router版のページにリダイレクト
export const dynamic = 'force-dynamic';

// 一つのデフォルトエクスポートのみ許可されるため統合
export default function AppPage() {
  // Pages Routerに処理を委譲
  redirect('/');
  return null;
}
