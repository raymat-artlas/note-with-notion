import React from 'react';

export default function PlanCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      <div className="border p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">無料プラン</h3>
        <p className="mb-4">基本機能をお試しいただけます</p>
        <p className="text-2xl font-bold mb-6">¥0/月</p>
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          現在のプラン
        </button>
      </div>
      
      {/* 他のプランカード */}
    </div>
  );
} 