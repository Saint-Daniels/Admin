import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import BootstrapClient from './components/BootstrapClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Office Dashboard',
  description: 'Modern office management system',
  keywords: 'office dashboard, workspace management, professional tools',
  openGraph: {
    title: 'Office Dashboard',
    description: 'Professional office dashboard for managing your workspace.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <BootstrapClient />
        {children}
      </body>
    </html>
  )
} 