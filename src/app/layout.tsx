import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CookiesProvider } from 'next-client-cookies/server'
import './globals.css'

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
        </CookiesProvider>
      </body>
    </html>
  )
}
