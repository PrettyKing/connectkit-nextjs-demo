# ConnectKit Next.js Demo

这是一个使用 Next.js + ConnectKit 的现代化 Web3 应用演示，展示了如何在 Next.js 中集成钱包连接功能，并通过动态导入完美解决 SSR 问题。

## 🚀 特性

- ✅ **Next.js 14** - 最新的 React 框架，支持服务端渲染和 App Router
- ✅ **TypeScript** - 完整的类型安全支持
- ✅ **ConnectKit** - 强大的钱包连接组件库
- ✅ **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ✅ **多链支持** - 以太坊、Polygon、Optimism、Arbitrum、Base
- ✅ **响应式设计** - 适配桌面和移动端设备
- ✅ **完美 SSR** - 使用动态导入彻底解决所有 SSR 问题
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
│   │   ├── WalletDemo.tsx      # 钱包演示组件(动态导入)
│   │   └── WalletDemoClient.tsx # 客户端钱包组件
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useIsMounted.ts     # SSR 挂载状态 Hook
│   └── providers/              # Context 提供商
│       └── Web3Provider.tsx    # Web3 提供商
├── .env.example                # 环境变量模板
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
├── tailwind.config.js          # Tailwind 配置
└── README.md                   # 项目文档
```

## 🔧 核心技术方案

### 动态导入解决方案

本项目使用 Next.js 的 `dynamic` 函数完全禁用 Web3 组件的服务端渲染：

```typescript
// src/components/WalletDemo.tsx
const WalletDemoComponent = dynamic(
  () => import('./WalletDemoClient').then(mod => ({ default: mod.WalletDemoClient })),
  {
    ssr: false, // 关键：禁用服务端渲染
    loading: () => (
      <div className="wallet-loading">
        <p>🔄 正在加载钱包连接...</p>
      </div>
    ),
  }
);
```

这种方法的优势：
- 🎯 **彻底避免** SSR 相关的所有错误
- ⚡ **零配置** 无需复杂的挂载状态检查
- 🎨 **优雅降级** 自动显示加载状态
- 🚀 **性能优秀** 只在客户端加载 Web3 相关代码

### Web3Provider 组件

`src/providers/Web3Provider.tsx` 专注于 Web3 功能配置：
- Wagmi 和 ConnectKit 配置
- 支持的区块链网络设置
- RPC 提供商配置
- TanStack Query 客户端管理

### WalletDemo 组件架构

- `WalletDemo.tsx`: 动态导入包装器，处理 SSR
- `WalletDemoClient.tsx`: 实际的功能组件，包含所有 Web3 逻辑

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

## 🔧 故障排除

### ✅ 已完美解决的问题

1. **Hydration 错误**: `Cannot read properties of undefined (reading 'ssr')`
2. **WagmiProviderNotFoundError**: `useConfig must be used within WagmiProvider`
3. **SSR 渲染错误**: 服务端无法访问 `window` 对象
4. **组件状态不匹配**: 服务端和客户端 HTML 结构差异

### 技术方案对比

| 方案 | 优缺点 | 使用场景 |
|------|--------|----------|
| **动态导入** ✅ | 简单、可靠、零配置 | **推荐**，适合所有场景 |
| useEffect + useState | 需要额外状态管理 | 简单组件 |
| 组件分离 | 代码结构复杂 | 复杂交互逻辑 |

### 开发提示

- ✅ 无需任何额外的 SSR 处理代码
- ✅ 动态导入自动处理所有边缘情况
- ✅ 加载状态由 Next.js 自动管理
- ✅ 完美的开发和生产环境兼容性

## 🚀 部署

### Vercel 部署（推荐）

1. Fork 这个仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置环境变量：
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_ALCHEMY_ID` (可选)
4. 部署

### 其他平台

项目可部署到任何支持 Next.js 的平台。

## 📚 技术栈

- **[Next.js 14](https://nextjs.org/)** - React 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全
- **[ConnectKit](https://docs.family.co/connectkit)** - 钱包连接
- **[Wagmi](https://wagmi.sh)** - React Hooks for Ethereum
- **[Viem](https://viem.sh)** - TypeScript Ethereum 接口
- **[TanStack Query](https://tanstack.com/query)** - 异步状态管理

## 📖 学习资源

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
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
3. 本项目使用动态导入方案，**完美解决所有 SSR 问题**，可直接用于生产环境