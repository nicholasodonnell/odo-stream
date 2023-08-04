import './../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  themeColor: '#000000',
  title: 'ODO Stream',
}

export type RootLayoutProps = {
  children?: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/tho7jgz.css" />
      </head>
      <body className="fixed flex h-full w-full flex-col overflow-hidden bg-black text-white">
        {children}
      </body>
    </html>
  )
}
