import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lee Hoa - Tech Blog & Learning Journey",
    template: "%s | Lee Hoa",
  },
  description:
    "A blog about learning, sharing, and exploring knowledge in technology, programming, and software development. Written by Lee Hoa, a passionate IT student.",
  keywords: [
    "programming",
    "technology",
    "software development",
    "web development",
    "algorithms",
    "data structures",
    "learning",
    "tech blog",
  ],
  authors: [{ name: "Lee Hoa" }],
  creator: "Lee Hoa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lee Hoa Blog",
    title: "Lee Hoa - Tech Blog & Learning Journey",
    description:
      "A blog about learning, sharing, and exploring knowledge in technology, programming, and software development.",
    images: [
      {
        url: "/images/author/home.jpg",
        width: 1200,
        height: 630,
        alt: "Lee Hoa Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lee Hoa - Tech Blog & Learning Journey",
    description:
      "A blog about learning, sharing, and exploring knowledge in technology, programming, and software development.",
    images: ["/images/author/home.jpg"],
    creator: "@leehoa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
