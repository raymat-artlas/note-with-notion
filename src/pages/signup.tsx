// Pages Router版サインアップページ
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Head from 'next/head';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // ユーザーがすでにログインしている場合はリダイレクト
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // メールアドレスとパスワードで登録
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // バリデーション
    if (password !== confirmPassword) {
      return setError('パスワードが一致しません');
    }

    if (password.length < 6) {
      return setError('パスワードは6文字以上にしてください');
    }

    setLoading(true);

    try {
      // Firebase認証でユーザー作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // ユーザープロフィールを更新
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      // 登録成功後はダッシュボードへ
      router.push('/dashboard');
    } catch (err: any) {
      console.error('サインアップエラー:', err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'このメールアドレスは既に使用されています'
          : '登録に失敗しました。再度お試しください'
      );
    } finally {
      setLoading(false);
    }
  };

  // Googleで登録
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Google登録エラー:', err);
      setError('Google登録に失敗しました。再度お試しください');
    } finally {
      setLoading(false);
    }
  };

  // GitHubで登録
  const handleGithubSignup = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('GitHub登録エラー:', err);
      setError('GitHub登録に失敗しました。再度お試しください');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>新規登録 - note with Notion</title>
        <meta name="description" content="新規アカウントを作成して、note記事をNotionに保存しましょう" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              新規アカウント作成
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              または{' '}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                既にアカウントをお持ちの方はこちら
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

          <form className="mt-8 space-y-6" onSubmit={handleEmailSignup}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  お名前
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="お名前（任意）"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="パスワード（6文字以上）"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  パスワード（確認）
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="パスワード（確認）"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? '登録中...' : 'アカウントを作成'}
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
                  ソーシャルアカウントで登録
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                  Google
                </button>
              </div>

              <div>
                <button
                  onClick={handleGithubSignup}
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