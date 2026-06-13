import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alan | AI Engineer",
  description: "Personal portfolio of Alan — AI Engineer & full-stack builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-gradient-to-r from-[#F9FAFB] to-[#EBEBEB] text-[#111111]">
        <Sidebar />
        <div className="ml-[240px] max-sm:ml-14 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
