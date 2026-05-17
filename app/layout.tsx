import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav,PageTransition } from "@/common";
import 'highlight.js/styles/github-dark.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "曹磊.blog",
  description: "曹磊的个人博客 - one Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         {children}
      </body>
    </html>
  );
}
