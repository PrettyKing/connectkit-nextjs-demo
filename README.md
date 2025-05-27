# ConnectKit Next.js Demo

这是一个使用 Next.js + ConnectKit 的现代化 Web3 应用演示，展示了如何在 Next.js 中集成钱包连接功能，并通过 ClientOnly 组件完美解决所有 SSR 问题。

## 🚀 特性

- ✅ **Next.js 14** - 最新的 React 框架，支持服务端渲染和 App Router
- ✅ **TypeScript** - 完整的类型安全支持
- ✅ **ConnectKit** - 强大的钱包连接组件库
- ✅ **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ✅ **多链支持** - 以太坊、Polygon、Optimism、Arbitrum、Base
- ✅ **响应式设计** - 适配桌面和移动端设备
- ✅ **完美 SSR** - 使用 ClientOnly 组件彻底解决所有 SSR 问题
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
│   │   ├── ClientOnly.tsx      # 客户端渲染包装器
│   │   └── WalletDemo.tsx      # 钱包演示组件
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

### ClientOnly 组件解决方案

这是解决 Next.js + Web3 应用 SSR 问题的终极方案：

```typescript
// src/components/ClientOnly.tsx
export function ClientOnly({ children, fallback = null }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

**在 layout.tsx 中使用：**
```typescript
<ClientOnly fallback={<LoadingComponent />}>
  <Web3Provider>
    {children}
  </Web3Provider>
</ClientOnly>
```

### 方案优势

1. **🎯 完全解决** - 彻底避免所有 SSR hydration 错误
2. **🧹 代码简洁** - 无需动态导入，代码结构清晰
3. **⚡ 性能优秀** - 只在必要时阻止 SSR
4. **🎨 用户友好** - 提供优雅的加载状态
5. **🔧 易于维护** - 集中处理 SSR 逻辑

### Web3Provider 组件

`src/providers/Web3Provider.tsx` 专注于 Web3 功能配置：
- Wagmi 和 ConnectKit 配置
- 支持的区块链网络设置
- RPC 提供商配置
- TanStack Query 客户端管理

### WalletDemo 组件

`src/components/WalletDemo.tsx` 现在可以直接使用所有 Wagmi hooks，无需任何特殊处理：
- 钱包连接/断开功能
- 显示钱包地址和余额
- 显示 ENS 名称
- 显示当前网络信息

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

### 解决方案对比

| 方案 | 复杂度 | 可维护性 | 性能 | 推荐度 |
|------|--------|----------|------|--------|
| **ClientOnly 组件** ✅ | 简单 | 优秀 | 优秀 | ⭐⭐⭐⭐⭐ |
| 动态导入 | 中等 | 良好 | 良好 | ⭐⭐⭐⭐ |
| useEffect + useState | 复杂 | 一般 | 一般 | ⭐⭐⭐ |

### 架构特点

- **🎯 集中管理**: 所有 SSR 处理逻辑集中在 ClientOnly 组件
- **🧩 组件简洁**: Web3 组件无需额外的 SSR 处理代码
- **📦 易于复用**: ClientOnly 组件可以在任何项目中复用
- **🔍 调试友好**: 问题定位简单，调试容易

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

- [Next.js App Router](https://nextjs.org/docs/app)
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
3. 本项目使用 **ClientOnly 组件**方案，是目前解决 Next.js + Web3 SSR 问题的**最佳实践**