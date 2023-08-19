import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Analytics from './components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'URL Inspector - Safely Inspect Questionable Links',
  description: 'Safely inspect and analyze links from any source using URL Inspector. Protect yourself from harmful links with real-time scanning.',
  openGraph: {
    type: 'website',
    url: 'https://url-inspector.vercel.app',
    title: 'URL Inspector - Safely Inspect Questionable Links',
    description: 'Safely inspect and analyze links from any source using URL Inspector. Protect yourself from harmful links with real-time scanning.',
    images: [
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Analytics>{children}</Analytics></body>
    </html>
  )
}
