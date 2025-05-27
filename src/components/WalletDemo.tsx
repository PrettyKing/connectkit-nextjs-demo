"use client";

import React, { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance, useEnsName } from "wagmi";

export function WalletDemo() {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const { data: ensName } = useEnsName({
    address,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在组件挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="wallet-section">
        <div className="wallet-loading">
          <p>🔄 正在加载钱包连接...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-section">
      <ConnectKitButton />
      
      {isConnected && (
        <div className="wallet-info">
          <h3>🎉 钱包已连接</h3>
          
          {ensName && (
            <div>
              <strong>ENS Name:</strong> {ensName}
            </div>
          )}
          
          <div>
            <strong>地址:</strong>
            <div className="address">{address}</div>
          </div>
          
          {balance && (
            <div>
              <strong>余额:</strong> {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
          )}
          
          {chain && (
            <div>
              <strong>网络:</strong> {chain.name} (Chain ID: {chain.id})
            </div>
          )}
        </div>
      )}
      
      {!isConnected && (
        <div className="wallet-info">
          <p>👆 点击上方按钮连接您的钱包</p>
          <p>支持 MetaMask、WalletConnect、Coinbase Wallet 等</p>
        </div>
      )}
    </div>
  );
}