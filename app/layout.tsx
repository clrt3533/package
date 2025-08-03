import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionWrapper } from '@/components/providers/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PackagePro - AI-Powered Packaging Design',
  description: 'Create professional packaging designs in minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}