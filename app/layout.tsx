import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentRail - Cross-Chain AI Payment Gateway',
  description: 'Revolutionary payment gateway combining PayPal USD, Hedera, and AI for seamless cross-chain payments',
  keywords: ['ethereum', 'hedera', 'paypal-usd', 'ai', 'payments', 'cross-chain', 'ethglobal'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
