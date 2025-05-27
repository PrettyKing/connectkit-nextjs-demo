import dynamic from 'next/dynamic'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// 动态导入 Web3Provider，禁用 SSR
const Web3Provider = dynamic(
  () => import('@/providers/Web3Provider').then(mod => ({ default: mod.Web3Provider })),
  {
    ssr: false,
  }
)

export const metadata: Metadata = {
  title: 'ConnectKit Next.js Demo',
  description: 'A Next.js demo app showcasing ConnectKit integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}