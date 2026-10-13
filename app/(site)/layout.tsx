import type { Metadata } from "next";
import { Nav } from "@/common";
import 'highlight.js/styles/github-dark.css';
import "../globals.css";

export const metadata: Metadata = {
  title: "曹磊的博客",
  description: "曹磊的个人博客 - one Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      {children}
    </div >
  );
}
