'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">ログイン</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            現在、認証システムはメンテナンス中です。
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              申し訳ありませんが、現在システムメンテナンス中です。
            </p>
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 