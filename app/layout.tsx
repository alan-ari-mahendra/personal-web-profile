import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alan | AI Engineer",
  description: "Personal portfolio of Alan — AI Engineer & full-stack builder.",
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
