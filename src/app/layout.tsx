import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientOnly } from '@/components/ClientOnly'
import { Web3Provider } from '@/providers/Web3Provider'

const inter = Inter({ subsets: ['latin'] })

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
        <ClientOnly
          fallback={
            <div className="container">
              <div className="header">
                <h1 className="title">ConnectKit Next.js Demo</h1>
                <p className="subtitle">正在加载应用...</p>
              </div>
            </div>
          }
        >
          <Web3Provider>
            {children}
          </Web3Provider>
        </ClientOnly>
      </body>
    </html>
  )
}