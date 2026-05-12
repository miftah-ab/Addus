import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import BackToTop from '@/components/ui/BackToTop'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: "Addus I Build What's Next",
  description: 'Addus is an AI products and automation company. I build AI systems, SaaS products, and automation tools that work from day one. Founded by Miftah Abate.',
  keywords: ['AI automation', 'SaaS development', 'AI integration', 'full stack development', 'Miftah Abate', 'Addus'],
  authors: [{ name: 'Miftah Abate' }],
  icons: {
    icon: '/symbol.png',
    apple: '/symbol.png',
  },
  openGraph: {
    title: "Addus I Build What's Next",
    description: 'AI products and automation. Built to ship.',
    type: 'website',
    url: 'https://addus.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Addus I Build What's Next",
    description: 'AI products and automation. Built to ship.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('mousemove', function(e) {
                var x = (e.clientX / window.innerWidth) * 100;
                var y = (e.clientY / window.innerHeight) * 100;
                document.documentElement.style.setProperty('--mouse-x', x + '%');
                document.documentElement.style.setProperty('--mouse-y', y + '%');
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
