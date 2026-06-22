import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alan Ari Mahendra | Full-stack Developer",
  description: "Personal portfolio of Alan Ari Mahendra — Full-stack Developer specializing in SaaS, e-commerce, and custom internal tools.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} style={{ colorScheme: "light" }}>
      <body className="h-full bg-gradient-to-r from-[#F9FAFB] to-[#EBEBEB] text-[#111111]">
        {children}
      </body>
    </html>
  )
}
