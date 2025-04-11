import { redirect } from 'next/navigation';

// Pages Router版のページにリダイレクト
export default function RedirectToPages() {
  redirect('/');
  return null;
}

// App Router版のページはシンプルにPages Routerにリダイレクト
export const dynamic = 'force-dynamic';

export default function Page() {
  return null; // Pages Routerが処理するため不要
}
