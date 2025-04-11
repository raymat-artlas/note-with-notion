// App Routerルートページの循環参照を防止
export const dynamic = 'force-dynamic';

// リダイレクトを行わないようにする（循環参照防止）
export default function AppPage() {
  // 単純なページ内容を返す（リダイレクトは行わない）
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-xl font-bold mb-4">note with Notion</h1>
        <p className="mb-4">ページ表示中...</p>
      </div>
    </div>
  );
}
