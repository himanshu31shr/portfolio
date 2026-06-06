import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { personalInfo } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://himanshu31shr.github.io/portfolio/'),
  title: {
    default: `${personalInfo.name} | Senior Full Stack Engineer`,
    template: `%s | ${personalInfo.name}`,
  },
  alternates: {
    canonical: '/',
  },
  description: `Portfolio of ${personalInfo.name} — Senior Full Stack Engineer specializing in Node.js, React, TypeScript, AWS, and AI-assisted engineering workflows.`,
  keywords: [
    'Full Stack Engineer',
    'Node.js',
    'React',
    'TypeScript',
    'AWS',
    'Fintech',
    'WCAG',
    'Accessibility',
    'AI Engineering',
    'Portfolio',
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://himanshu31shr.github.io/portfolio/',
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} | Senior Full Stack Engineer`,
    description: `Portfolio of ${personalInfo.name} — Senior Full Stack Engineer with 9+ years of experience.`,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | Senior Full Stack Engineer`,
    description: `Portfolio of ${personalInfo.name} — Senior Full Stack Engineer with 9+ years of experience.`,
    images: ['/images/og-image.png'],
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <AnimatedBackground />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
