import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactQueryClientProvider } from '../../helpers/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tanstack Infinite Scroll',
  description: 'by Sertac',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
