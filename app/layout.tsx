import type { Metadata } from "next";
import 'highlight.js/styles/github-dark.css';
import "./globals.css";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
         {children}
      </body>
    </html>
  );
}
