import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MagneticCursor } from "@/components/ui/magnetic-cursor"
import "./globals.css"

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "株式会社きっかけ",
  description:
    "複数社提携による助成金活用コンサルティングで、企業に最適な制度選びと申請サポートをオンラインで提供します。",
  openGraph: {
    title: "株式会社きっかけ",
    description:
      "複数社提携による助成金活用コンサルティングで、企業に最適な制度選びと申請サポートをオンラインで提供します。",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJp.className} font-sans antialiased`}>
        <MagneticCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
