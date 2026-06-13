import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { LiveClock } from "@/components/live-clock";

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
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-[#E5E7EB] px-14 py-[14px] flex items-center justify-between max-md:px-7 max-sm:px-5">
            <a href="#" className="text-sm text-[#111111] font-medium hover:underline underline-offset-[2px]">
              Reach out →
            </a>
            <span className="text-sm text-[#6B7280]">Made by Alan | © 2026</span>
            <LiveClock />
          </footer>
        </div>
      </body>
    </html>
  );
}
