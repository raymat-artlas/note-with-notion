'use client';

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <title>note with Notion</title>
        <meta name="description" content="noteで見つけた情報をNotionに整理" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
