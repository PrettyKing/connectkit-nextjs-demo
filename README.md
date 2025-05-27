# ConnectKit Next.js Demo

这是一个使用 Next.js + ConnectKit 的现代化 Web3 应用演示，展示了如何在 Next.js 中集成钱包连接功能。通过完全禁用 SSR，彻底解决所有 hydration 问题。

## 🚀 特性

- ✅ **Next.js 14** - 最新的 React 框架，使用 App Router
- ✅ **TypeScript** - 完整的类型安全支持
- ✅ **ConnectKit** - 强大的钱包连接组件库
- ✅ **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ✅ **多链支持** - 以太坊、Polygon、Optimism、Arbitrum、Base
- ✅ **响应式设计** - 适配桌面和移动端设备
- ✅ **零 SSR 问题** - 完全禁用 SSR，避免所有 hydration 错误
- ✅ **自定义主题** - 支持主题定制和样式自定义

## 📦 安装

1. **克隆项目**：
```bash
git clone https://github.com/PrettyKing/connectkit-nextjs-demo.git
cd connectkit-nextjs-demo
```

2. **安装依赖**：
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. **配置环境变量**：
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加您的配置：
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: 从 [WalletConnect Cloud](https://cloud.walletconnect.com) 获取
- `NEXT_PUBLIC_ALCHEMY_ID`: （可选）从 [Alchemy](https://www.alchemy.com) 获取

## 🏃‍♂️ 运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 🏗️ 构建

```bash
npm run build && npm start
# 或
yarn build && yarn start
# 或
pnpm build && pnpm start
```

## 📁 项目结构

```
connectkit-nextjs-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # 全局样式
│   │   ├── layout.tsx          # 根布局组件
│   │   └── page.tsx            # 首页组件
│   ├── components/             # React 组件
│   │   ├── ClientOnly.tsx      # 客户端渲染包装器(备用)
│   │   └── WalletDemo.tsx      # 钱包演示组件
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useIsMounted.ts     # SSR 挂载状态 Hook(备用)
│   └── providers/              # Context 提供商
│       └── Web3Provider.tsx    # Web3 提供商
├── .env.example                # 环境变量模板
├── next.config.js              # Next.js 配置 (关键)
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
├── tailwind.config.js          # Tailwind 配置
└── README.md                   # 项目文档
```

## 🔧 核心解决方案

### 完全禁用 SSR

这是解决 Next.js + Web3 应用所有 SSR 问题的**终极方案**：

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  // 🔑 关键：完全禁用 SSR
  experimental: {
    ssr: false
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};
```

### 方案优势

1. **🎯 彻底解决** - 一次性解决所有 SSR 相关问题
2. **🧹 代码简洁** - 无需任何特殊的 SSR 处理代码
3. **⚡ 零配置** - 组件可以直接使用所有 Web3 hooks
4. **🔧 易维护** - 所有组件都是标准的 React 组件
5. **🚀 性能优秀** - 专注于客户端性能优化

### 适用场景

这个方案特别适合：
- **Web3 DApps** - 主要功能依赖客户端
- **钱包应用** - 需要浏览器环境
- **交互式应用** - 重交互轻内容
- **私人工具** - 不需要 SEO 优化

### Web3Provider 组件

`src/providers/Web3Provider.tsx` 现在可以直接使用，无需任何 SSR 处理：

```typescript
export function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient({...}));
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### WalletDemo 组件

`src/components/WalletDemo.tsx` 现在是标准的 React 组件：

```typescript
export function WalletDemo() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  
  return (
    <div className="wallet-section">
      <ConnectKitButton />
      {/* 其他组件内容 */}
    </div>
  );
}
```

## 🎨 自定义主题

ConnectKit 支持自定义主题：

```typescript
<ConnectKitProvider
  customTheme={{
    "--ck-border-radius": "16px",
    "--ck-primary-button-border-radius": "16px",
  }}
>
```

更多主题选项请参考 [ConnectKit 文档](https://docs.family.co/connectkit/theming)。

## 🌐 支持的网络

- **以太坊主网** (Ethereum Mainnet)
- **Polygon** 
- **Optimism**
- **Arbitrum**
- **Base**

可以在 `Web3Provider.tsx` 中添加更多网络。

## 🔧 解决方案对比

| 方案 | 复杂度 | 适用场景 | SEO | 推荐度 |
|------|--------|----------|-----|--------|
| **禁用 SSR** ✅ | 极简 | Web3 DApps | ❌ | ⭐⭐⭐⭐⭐ |
| ClientOnly 组件 | 简单 | 混合应用 | ✅ | ⭐⭐⭐⭐ |
| 动态导入 | 中等 | 复杂应用 | ✅ | ⭐⭐⭐ |
| useEffect 检查 | 复杂 | 遗留项目 | ✅ | ⭐⭐ |

## 🚀 部署

### Vercel 部署（推荐）

1. Fork 这个仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置环境变量：
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_ALCHEMY_ID` (可选)
4. 部署

**注意**: 禁用 SSR 后，应用仍然可以正常部署到 Vercel 等平台，只是会以 SPA (Single Page Application) 模式运行。

### 其他平台

项目可部署到任何支持 Next.js 的平台，会自动以 SPA 模式运行。

## 📚 技术栈

- **[Next.js 14](https://nextjs.org/)** - React 框架 (SPA 模式)
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全
- **[ConnectKit](https://docs.family.co/connectkit)** - 钱包连接
- **[Wagmi](https://wagmi.sh)** - React Hooks for Ethereum
- **[Viem](https://viem.sh)** - TypeScript Ethereum 接口
- **[TanStack Query](https://tanstack.com/query)** - 异步状态管理

## 📖 学习资源

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js SPA Mode](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [ConnectKit 文档](https://docs.family.co/connectkit)
- [Wagmi 文档](https://wagmi.sh)
- [Viem 文档](https://viem.sh)
- [WalletConnect](https://walletconnect.com)

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License

---

**注意**: 
1. 使用前请确保在 `.env.local` 文件中配置正确的 WalletConnect Project ID
2. 建议在生产环境中使用自己的 Alchemy API Key 以获得更好的性能
3. 本项目**完全禁用 SSR**，适合 Web3 DApps，如需 SEO 请考虑其他方案