// app/admin/posts/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

// 写死数据演示，后续替换为 fetch('/api/admin/posts')
const posts = [
  { id: '1', title: '你好，世界', status: '已发布', date: '2026-05-01' },
  { id: '2', title: 'Next.js 16 学习笔记', status: '草稿', date: '2026-05-10' },
];

export default function PostsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <Link href="/admin/articles/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建文章
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border bg-white dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <span
                    className={
                      post.status === '已发布'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }
                  >
                    {post.status}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500">{post.date}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/articles/${post.id}`}>
                    <Button variant="outline" size="sm">编辑</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}