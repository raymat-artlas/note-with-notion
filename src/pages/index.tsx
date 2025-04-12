import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

// 最もシンプルな静的ページ
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>note with Notion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">
          note with Notion
        </h1>

        <p className="mt-3 text-xl">
          シンプルなスタートページ
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-center">
          <Link href="/login" className="mt-4 w-96 rounded-md bg-indigo-500 p-2 text-white">
            ログイン
          </Link>
        </div>
      </main>
    </div>
  )
} 