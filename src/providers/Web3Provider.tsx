"use client";

import React, { useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { useIsMounted } from "@/hooks/useIsMounted";

// 创建 Wagmi 配置
const config = getDefaultConfig({
  // dApp 信息
  appName: "ConnectKit Next.js Demo",
  appDescription: "A Next.js demo app showcasing ConnectKit integration",
  appUrl: "https://connectkit-nextjs-demo.vercel.app",
  appIcon: "https://family.co/logo.png",

  // WalletConnect 项目 ID
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLETCONNECT_PROJECT_ID",

  // 支持的区块链网络
  chains: [mainnet, polygon, optimism, arbitrum, base],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo'}`
    ),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo'}`
    ),
    [optimism.id]: http(
      `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo'}`
    ),
    [arbitrum.id]: http(
      `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo'}`
    ),
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID || 'demo'}`
    ),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const isMounted = useIsMounted();
  
  // 使用 useState 确保 QueryClient 只创建一次
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  // 在服务端渲染时，只渲染子组件而不包含 Web3 提供商
  // 这样可以避免 SSR 不匹配，同时保持应用结构
  return (
    <>
      {isMounted ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider
              customTheme={{
                "--ck-border-radius": "16px",
                "--ck-primary-button-border-radius": "16px",
              }}
            >
              {children}
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        // 服务端渲染时的回退内容
        children
      )}
    </>
  );
}