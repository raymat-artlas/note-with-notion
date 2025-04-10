import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">note with Notion</h3>
            <p className="text-gray-300">
              noteの記事を簡単にNotionに保存。あなたの知識ベースを効率的に構築します。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">リンク</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white">
                  料金プラン
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <p className="text-gray-300">
              お問い合わせやサポートは以下のメールアドレスまでお願いします。
            </p>
            <a 
              href="mailto:support@notewithnotion.com" 
              className="text-indigo-400 hover:text-indigo-300"
            >
              support@notewithnotion.com
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} note with Notion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 