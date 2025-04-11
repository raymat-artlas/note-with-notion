import { redirect } from 'next/navigation';

// Pages Router版のページにリダイレクト
export default function RedirectToPages() {
  redirect('/');
  return null;
}
