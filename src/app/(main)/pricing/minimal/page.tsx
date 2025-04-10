'use client';

import { useState } from 'react';

export default function MinimalPricingPage() {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    
    // シンプルなAPIコール
    fetch('/api/stripe/simple-session')
      .then(res => res.json())
      .then(data => {
        if (data.sessionUrl) {
          window.location.href = data.sessionUrl;
        } else {
          alert('セッションURLがありません');
        }
      })
      .catch(err => {
        alert(`エラー: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">シンプル版料金ページ</h1>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? '処理中...' : 'Stripeチェックアウト'}
      </button>
    </div>
  );
} 