import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Lee Hoa",
  description: "A blog about learning, sharing , and exploring knowledge. Author is Lee Hoa",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased transition-all bg-bg-base text-text-primary`}>
        {children}
      </body>
    </html>
  )
}
