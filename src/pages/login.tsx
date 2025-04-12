// Pages Router版ログインページ
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const redirect = router.query.redirect || '/dashboard';

  // ユーザーがすでにログインしている場合はリダイレクト
  React.useEffect(() => {
    if (user) {
      router.push(typeof redirect === 'string' ? redirect : '/dashboard');
    }
  }, [user, router, redirect]);

  // メールアドレスとパスワードでログイン
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(typeof redirect === 'string' ? redirect : '/dashboard');
    } catch (err: any) {
      console.error('ログインエラー:', err);
      setError(
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'メールアドレスまたはパスワードが正しくありません'
          : err.code === 'auth/too-many-requests'
          ? 'ログイン試行回数が多すぎます。しばらく時間をおいてお試しください'
          : 'ログインに失敗しました。再度お試しください'
      );
    } finally {
      setLoading(false);
    }
  };

  // Googleでログイン
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(typeof redirect === 'string' ? redirect : '/dashboard');
    } catch (err: any) {
      console.error('Googleログインエラー:', err);
      setError('Googleログインに失敗しました。再度お試しください');
    } finally {
      setLoading(false);
    }
  };

  // GitHubでログイン
  const handleGithubLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(typeof redirect === 'string' ? redirect : '/dashboard');
    } catch (err: any) {
      console.error('GitHubログインエラー:', err);
      setError('GitHubログインに失敗しました。再度お試しください');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ログイン - note with Notion</title>
        <meta name="description" content="アカウントにログインして、note記事をNotionに保存しましょう" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              アカウントにログイン
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              または{' '}
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                新規登録はこちら
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  メールアドレス
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="メールアドレス"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  パスワード
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="パスワード"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  ログイン状態を保持
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  パスワードをお忘れですか？
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  ソーシャルアカウントでログイン
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                  Google
                </button>
              </div>

              <div>
                <button
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGithub className="h-5 w-5 text-gray-800 mr-2" />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 