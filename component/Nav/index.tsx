"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "首页", icon: "🏠", href: "/" },
  { label: "文章", icon: "📝", href: "/articles" },
  { label: "杂烩", icon: "🎨", href: "/misc" },
  { label: "人生路", icon: "🚶", href: "/life" },
  { label: "社交", icon: "💬", href: "/social" },
  { label: "摄影", icon: "✨", href: "/photography" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#53ade5]/30 backdrop-blur-sm">
      <Link
        href="/"
        className="text-lg font-bold text-white drop-shadow-md tracking-wide hover:opacity-80 transition-opacity"
      >
        曹磊.博客
      </Link>
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`flex items-center gap-1 text-sm transition-colors drop-shadow-md ${
                pathname === item.href
                  ? "text-white font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
