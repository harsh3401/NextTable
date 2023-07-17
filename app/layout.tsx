import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Tryp.com',
  description: 'Data Table for internal tool',
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
        </Providers></body>
    </html>
  )
}
