'use client';

import { useState, useEffect } from 'react';
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
import { Plus, Trash2 } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
}

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  articleTags: { tag: Tag }[];
}

export default function AdminArticlesPage() {
  const [items, setItems] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    fetch('/api/admin/articles')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除这篇文章？')) return;
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    fetchItems();
  };

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
              <TableHead>标签</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>日期</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">加载中...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">暂无数据</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[280px] truncate">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.articleTags?.map(({ tag }) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={item.published ? 'text-green-600' : 'text-yellow-600'}>
                      {item.published ? '已发布' : '草稿'}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">{item.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/articles/${item.id}`}>
                      <Button variant="outline" size="sm">编辑</Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
