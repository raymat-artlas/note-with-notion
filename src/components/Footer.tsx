'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2023 note with Notion. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-sm hover:text-gray-300">
              利用規約
            </Link>
            <Link href="/privacy" className="text-sm hover:text-gray-300">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="text-sm hover:text-gray-300">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 