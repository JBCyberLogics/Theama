import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
import PWARegister from '@/components/layout/PWARegister'

export const metadata = {
  title: 'THEAMA — Enter the Spectacle',
  description: 'A cinematic movie discovery platform with vintage Greek theater aesthetic',
  keywords: 'movies, cinema, film discovery, theater, TMDB',
  manifest: '/manifest.json',
  themeColor: '#0A0A0A',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'THEAMA',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  openGraph: {
    title: 'THEAMA',
    description: 'Enter the Spectacle — A cinematic movie discovery platform',
    type: 'website',
    siteName: 'THEAMA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THEAMA',
    description: 'Enter the Spectacle — A cinematic movie discovery platform',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <PWARegister />
        </AuthProvider>
      </body>
    </html>
  )
}
