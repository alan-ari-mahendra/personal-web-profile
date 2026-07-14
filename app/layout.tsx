import type { Metadata } from "next"
import { Outfit, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
})

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alan Ari Mahendra | Fullstack Developer & AI Code Auditor",
  description: "Alan Ari Mahendra, AI Code Auditor and Fullstack Developer. I turn fragile, AI-generated codebases into clean, secure, production-grade systems. Full-stack, end to end.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceCodePro.variable} h-full antialiased`} style={{ colorScheme: "dark" }}>
      <body className="h-full bg-bg text-ink">
        {children}
      </body>
    </html>
  )
}
