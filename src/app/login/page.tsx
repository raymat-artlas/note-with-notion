'use client';

import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // すでにログインしている場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // ログイン済みの場合はローディング表示
  if (loading || user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">読み込み中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">note with Notion</h1>
        <h2 className="mt-3 text-center text-xl font-semibold text-gray-600">
          アカウントにログイン
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm mode="login" />
        
        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない場合は{' '}
          <Link 
            href="/signup" 
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
} 