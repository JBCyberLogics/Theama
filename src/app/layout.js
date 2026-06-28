import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import StageLayout from '@/components/layout/StageLayout'

export const metadata = {
  title: 'Theama - Enter the Spectacle',
  description: 'A cinematic movie discovery platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body style={{ margin: 0, background: 'var(--surface-base)' }}>
        <AuthProvider>
          <StageLayout>{children}</StageLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
