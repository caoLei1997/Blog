// app/admin/layout.tsx
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Tags,
  Image,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

const menuItems = [
  { label: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { label: '文章管理', href: '/admin/articles', icon: FileText },
  { label: '新建文章', href: '/admin/articles/new', icon: FileText },
  { label: '分类/标签', href: '/admin/tags', icon: Tags },
  { label: '媒体库', href: '/admin/media', icon: Image },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* 侧边栏 */}
      <div className="w-full flex-none md:w-64 bg-zinc-900 text-white">
        <div className="flex h-full flex-col px-3 py-4">
          {/* Logo */}
          <Link
            href="/admin"
            className="mb-4 flex h-20 items-center justify-start rounded-md bg-zinc-800 p-4"
          >
            <span className="text-lg font-bold">博客后台</span>
          </Link>

          {/* 导航菜单 */}
          <div className="flex grow flex-col space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* 底部操作 */}
          <div className="mt-auto space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
              target="_blank"
            >
              <ChevronLeft className="h-5 w-5" />
              查看前台
            </Link>
          </div>
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}