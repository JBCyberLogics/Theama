import './globals.css'

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
      <body style={{ margin: 0, background: '#0A0A0A' }}>{children}</body>
    </html>
  )
}
