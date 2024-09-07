import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IPE',
  description: 'Igreja Presbiteriana do Estreito'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CookiesProvider>
          {children}
          <Toaster />
        </CookiesProvider>
      </body>
    </html>
  )
}
