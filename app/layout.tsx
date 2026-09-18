import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/ui/Navigation'
import Footer from '@/components/ui/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import BackToTop from '@/components/ui/BackToTop'
import SmoothScrollHandler from '@/components/ui/SmoothScrollHandler'
import { Analytics } from '@vercel/analytics/next'

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
  title: 'Miftah Abate | Full-Stack Developer',
  description:
    'Full-stack developer building web applications, AI products, SaaS platforms, automation systems and mobile applications.',
  keywords: [
    'full-stack developer',
    'web development',
    'AI products',
    'SaaS',
    'automation',
    'mobile',
    'Miftah Abate',
    'remote developer',
    'contract developer',
  ],
  authors: [{ name: 'Miftah Abate' }],
  icons: {
    icon: '/symbol.png',
    apple: '/symbol.png',
  },
  openGraph: {
    title: 'Miftah Abate | Full-Stack Developer',
    description:
      'Full-stack developer building web applications, AI products, SaaS platforms, automation systems and mobile applications.',
    type: 'website',
    url: 'https://miftah-ab.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miftah Abate | Full-Stack Developer',
    description:
      'Full-stack developer building web applications, AI products, SaaS platforms, automation systems and mobile applications.',
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
        {/* Theme init — must run before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try{
                  var t=localStorage.getItem('theme');
                  document.documentElement.setAttribute('data-theme', t==='dark'?'dark':'light');
                }catch(e){
                  document.documentElement.setAttribute('data-theme','light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <CustomCursor />
        <Navigation />
        <SmoothScrollHandler />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
