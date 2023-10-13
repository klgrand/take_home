import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import RecoidContextProvider from './recoilContextProvider'
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PLAYTORIUM'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoidContextProvider>
          <Navbar />
          {children}
          <ToastContainer
            theme="dark"
            autoClose={3000}
            position="bottom-left"
          />
        </RecoidContextProvider>
      </body>
    </html>
  )
}
