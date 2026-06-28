import './globals.css'

export const metadata = {
  title: 'Theama - Enter the Spectacle',
  description: 'A cinematic movie discovery platform',
}

export const viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0A0A0A' }}>{children}</body>
    </html>
  )
}
