import { WalletDemo } from '@/components/WalletDemo'

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1 className="title">ConnectKit Next.js Demo</h1>
        <p className="subtitle">
          体验最简单的钱包连接方案。使用 Next.js + ConnectKit 构建的现代化 dApp，
          支持多种主流钱包和区块链网络，提供服务端渲染和最佳的用户体验。
        </p>
      </header>
      
      <WalletDemo />
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <div className="feature-title">多钱包支持</div>
          <div className="feature-description">
            支持 MetaMask、WalletConnect、Coinbase Wallet 等主流钱包
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <div className="feature-title">Next.js 优化</div>
          <div className="feature-description">
            服务端渲染、自动代码分割、优化的性能和 SEO
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <div className="feature-title">主题定制</div>
          <div className="feature-description">
            支持自定义主题和样式，完美融入您的应用设计
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <div className="feature-title">多链支持</div>
          <div className="feature-description">
            支持以太坊、Polygon、Optimism、Arbitrum 等多个区块链网络
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <div className="feature-title">TypeScript</div>
          <div className="feature-description">
            完整的 TypeScript 支持，提供更好的开发体验和类型安全
          </div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <div className="feature-title">响应式设计</div>
          <div className="feature-description">
            适配桌面和移动端设备，提供一致的用户体验
          </div>
        </div>
      </div>
    </main>
  )
}