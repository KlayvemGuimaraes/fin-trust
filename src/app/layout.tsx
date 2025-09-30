import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinTrust - Sistema de Carteira Digital com Score Comunitário',
  description: 'Revolucione o sistema financeiro com nossa carteira digital P2P, score comunitário antifraude e inclusão financeira inteligente.',
  keywords: ['fintech', 'carteira digital', 'score comunitário', 'antifraude', 'P2P', 'inclusão financeira'],
  authors: [{ name: 'FinTrust Team' }],
  creator: 'FinTrust',
  publisher: 'FinTrust',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fintrust.com.br'),
  openGraph: {
    title: 'FinTrust - Sistema de Carteira Digital com Score Comunitário',
    description: 'Revolucione o sistema financeiro com nossa carteira digital P2P, score comunitário antifraude e inclusão financeira inteligente.',
    url: 'https://fintrust.com.br',
    siteName: 'FinTrust',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FinTrust - Sistema de Carteira Digital',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinTrust - Sistema de Carteira Digital com Score Comunitário',
    description: 'Revolucione o sistema financeiro com nossa carteira digital P2P, score comunitário antifraude e inclusão financeira inteligente.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}