import './../app.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'ODO Stream',
}

export const viewport: Viewport = {
  themeColor: 'black',
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
        <link href="https://use.typekit.net/tho7jgz.css" rel="stylesheet" />
      </head>
      <body className="fixed flex h-full w-full flex-col overflow-hidden bg-black text-white">
        {children}
      </body>
    </html>
  )
}
