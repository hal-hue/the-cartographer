import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Cartographer - AI Agent Dashboard',
  description: 'Visualize and track AI agents, capabilities, and workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  🗺️ The Cartographer
                </h1>
                <span className="ml-2 text-sm text-gray-500">
                  AI Agent Observatory
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Organizational Visibility
                </span>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}