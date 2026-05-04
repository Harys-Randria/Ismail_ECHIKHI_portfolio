import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ismail ECHIKHI - Tech Lead Java/Angular',
  description: 'Portfolio de Ismail ECHIKHI, Développeur Fullstack Java/Angular avec 10 ans d\'expérience en architecture microservices et leadership technique.',
  keywords: ['Java', 'Angular', 'React', 'Spring Cloud', 'AWS', 'Tech Lead', 'Développeur Fullstack'],
  openGraph: {
    title: 'Ismail ECHIKHI - Tech Lead Java/Angular',
    description: 'Développeur Fullstack Java/Angular avec 10 ans d\'expérience sur des projets complexes pour grands comptes.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0052CC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-white">
      <body className={`${inter.className} antialiased text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
