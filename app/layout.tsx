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
  title: "Alan Ari Mahendra | Full-stack Developer",
  description: "Personal portfolio of Alan Ari Mahendra — Full-stack Developer specializing in SaaS, e-commerce, and custom internal tools.",
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
