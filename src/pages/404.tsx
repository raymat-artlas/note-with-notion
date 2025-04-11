import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">ページが見つかりませんでした</p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">
        トップページに戻る
      </Link>
    </div>
  );
} 