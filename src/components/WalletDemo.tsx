"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// 动态导入 WalletDemo 组件，禁用 SSR
const WalletDemoComponent = dynamic(
  () => import('./WalletDemoClient').then(mod => ({ default: mod.WalletDemoClient })),
  {
    ssr: false,
    loading: () => (
      <div className="wallet-section">
        <div className="wallet-loading">
          <p>🔄 正在加载钱包连接...</p>
        </div>
      </div>
    ),
  }
);

export function WalletDemo() {
  return <WalletDemoComponent />;
}