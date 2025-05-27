# ConnectKit Next.js Demo

这是一个使用 Next.js + ConnectKit 的现代化 Web3 应用演示，展示了如何在 Next.js 中集成钱包连接功能。

## 🚀 特性

- ✅ **Next.js 14** - 最新的 React 框架，支持服务端渲染和 App Router
- ✅ **TypeScript** - 完整的类型安全支持
- ✅ **ConnectKit** - 强大的钱包连接组件库
- ✅ **多钱包支持** - MetaMask、WalletConnect、Coinbase Wallet 等
- ✅ **多链支持** - 以太坊、Polygon、Optimism、Arbitrum、Base
- ✅ **响应式设计** - 适配桌面和移动端设备
- ✅ **SSR 优化** - 服务端渲染优化，解决 Hydration 问题
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
│   └── providers/              # Context 提供商
│       └── Web3Provider.tsx    # Web3 提供商
├── .env.example                # 环境变量模板
├── next.config.js              # Next.js 配置
├── package.json                # 项目依赖
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目文档
```

## 🔧 核心功能说明

### Web3Provider 组件

`src/providers/Web3Provider.tsx` 是应用的核心配置：
- 配置 Wagmi 和 ConnectKit
- 设置支持的区块链网络
- 配置 RPC 提供商
- 处理 TanStack Query 客户端
- **SSR 优化**：使用 `mounted` 状态防止服务端和客户端不匹配

### WalletDemo 组件

`src/components/WalletDemo.tsx` 演示了：
- 钱包连接/断开功能
- 显示钱包地址和余额
- 显示 ENS 名称
- 显示当前网络信息
- **加载状态**：在组件挂载前显示友好的加载提示

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

### 常见问题

1. **Hydration 错误** ✅ **已修复**：
   - 使用 `mounted` 状态防止 SSR 不匹配
   - 在客户端挂载前不渲染 Web3 组件
   - 添加友好的加载状态

2. **WalletConnect 连接失败**：
   - 检查 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` 是否正确设置
   - 确保在 WalletConnect Cloud 中配置了正确的域名

3. **构建错误**：
   - 检查 `next.config.js` 中的 webpack 配置
   - 清除缓存：`rm -rf .next && npm run dev`

4. **类型错误**：
   - 确保所有依赖版本兼容
   - 运行 `npm run lint` 检查代码

### SSR 优化详解

本项目已经解决了常见的 Next.js + Web3 应用中的 SSR 问题：

```typescript
// Web3Provider.tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// 在服务端渲染时，不渲染 Web3 相关组件
if (!mounted) {
  return <>{children}</>;
}
```

这确保了：
- 服务端不渲染 Web3 组件，避免 `window` 对象未定义错误
- 客户端挂载后才初始化钱包连接
- 提供平滑的加载体验

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
3. 本项目已解决常见的 Next.js SSR 和 Hydration 问题