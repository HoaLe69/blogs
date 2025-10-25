import type { Metadata } from "next"
// import { Space_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

// const spaceGrotesk = Space_Grotesk({
//   variable: "--font-space-grotesk",
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// })

const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/spacegrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-space-grotesk",
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
