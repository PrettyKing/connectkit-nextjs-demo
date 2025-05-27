# ConnectKit Next.js Demo

这是一个使用 Next.js + ConnectKit 的现代化 Web3 应用演示，展示了如何在 Next.js 中集成钱包连接功能，并完美解决了 SSR 和 Hydration 问题。

## 🚀 特性

- ✅ **Next.js 14** - 最新的 React 框架，支持服务端渲染和 App Router
- ✅ **TypeScript** - 完整的类型安全支持
- ✅ **ConnectKit** - 强大的钱包连接组件库
- ✅ **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ✅ **多链支持** - 以太坊、Polygon、Optimism、Arbitrum、Base
- ✅ **响应式设计** - 适配桌面和移动端设备
- ✅ **SSR 优化** - 完美解决服务端渲染和 Hydration 问题
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

## 🔧 核心功能说明

### SSR 优化核心 - useIsMounted Hook

`src/hooks/useIsMounted.ts` 是解决 SSR 问题的核心：
```typescript
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted;
}
```

这个 Hook 确保组件只在客户端挂载后才渲染 Web3 相关内容。

### Web3Provider 组件

`src/providers/Web3Provider.tsx` 是应用的核心配置：
- 配置 Wagmi 和 ConnectKit
- 设置支持的区块链网络
- 配置 RPC 提供商
- 处理 TanStack Query 客户端
- **SSR 安全**：使用 `useIsMounted` 防止服务端渲染问题

### WalletDemo 组件

`src/components/WalletDemo.tsx` 演示了：
- 钱包连接/断开功能
- 显示钱包地址和余额
- 显示 ENS 名称
- 显示当前网络信息
- **组件分离**：将 Wagmi hooks 分离到子组件中，避免 SSR 时的错误

### Next.js 配置

`next.config.js` 包含必要的 Webpack 配置：
- 处理 Node.js polyfills
- 外部化一些包以避免构建错误

## 🎨 自定义主题

ConnectKit 支持自定义主题，在 `Web3Provider.tsx` 中可以看到配置示例：

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

### ✅ 已解决的问题

1. **Hydration 错误**：
   - 使用 `useIsMounted` Hook 防止 SSR 不匹配
   - 组件分离策略避免 Wagmi hooks 在服务端执行
   - 添加友好的加载状态

2. **WagmiProviderNotFoundError**：
   - 将 Wagmi hooks 分离到独立的子组件中
   - 确保 hooks 只在 `WagmiProvider` 包裹下执行
   - 服务端渲染时不初始化 Web3 提供商

### 常见问题

1. **WalletConnect 连接失败**：
   - 检查 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` 是否正确设置
   - 确保在 WalletConnect Cloud 中配置了正确的域名

2. **构建错误**：
   - 检查 `next.config.js` 中的 webpack 配置
   - 清除缓存：`rm -rf .next && npm run dev`

3. **类型错误**：
   - 确保所有依赖版本兼容
   - 运行 `npm run lint` 检查代码

### SSR 优化架构

本项目采用了最佳实践来解决 Next.js + Web3 应用中的 SSR 问题：

```typescript
// 核心模式：组件分离 + 客户端挂载检测
export function MyWeb3Component() {
  const isMounted = useIsMounted();
  
  if (!isMounted) {
    return <LoadingState />;
  }
  
  return <ComponentWithWeb3Hooks />;
}
```

**优势：**
- 🔄 服务端不渲染 Web3 组件，避免 `window` 未定义错误
- ⚡ 客户端挂载后才初始化钱包连接，保证功能正常
- 🎯 提供平滑的加载体验，用户感知良好
- 🛡️ 完全避免 Hydration 不匹配问题

### 开发提示

- 使用 `npm run lint` 检查代码质量
- 使用 TypeScript 获得更好的开发体验
- 建议使用 VSCode 并安装相关扩展
- 在开发模式下，热重载可能会导致钱包重连，这是正常现象

## 🚀 部署

### Vercel 部署（推荐）

1. Fork 这个仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置环境变量：
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_ALCHEMY_ID` (可选)
4. 部署

### 其他平台

项目也可以部署到 Netlify、Railway 等支持 Next.js 的平台。

## 📚 技术栈

- **[Next.js 14](https://nextjs.org/)** - React 框架
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全
- **[ConnectKit](https://docs.family.co/connectkit)** - 钱包连接
- **[Wagmi](https://wagmi.sh)** - React Hooks for Ethereum
- **[Viem](https://viem.sh)** - TypeScript Ethereum 接口
- **[TanStack Query](https://tanstack.com/query)** - 异步状态管理

## 📖 学习资源

- [Next.js 文档](https://nextjs.org/docs)
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
3. 本项目已完美解决 Next.js SSR 和 Hydration 问题，可直接用于生产环境