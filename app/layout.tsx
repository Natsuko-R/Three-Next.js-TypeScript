import { ToasterProvider } from '@/provider/toast-provider'
import { ThemeProvider } from '@/provider/theme-provider'
import './globals.css'
import { TailwindIndicator } from '@/components/tailwind-indicator' // show @media device size
import { ThemeToggle } from '@/components/theme-toggle'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body className={`${inter.className} bg-slate-800 text-slate-100`}>
        <ToasterProvider />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TailwindIndicator />
          <ThemeToggle />
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
