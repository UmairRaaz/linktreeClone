import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Linktree Clone',
  description: 'Developed  By Umair',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header />
          <div className='p-6 max-w-4xl mx-auto'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
