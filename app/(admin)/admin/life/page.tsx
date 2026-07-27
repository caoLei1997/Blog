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

interface LifeItem {
  id: string;
  title: string;
  published: boolean;
  createdAt: string;
}

export default function AdminLifePage() {
  const [items, setItems] = useState<LifeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await fetch('/api/life');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除？')) return;
    await fetch(`/api/life/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">人生路管理</h1>
        <Link href="/admin/life/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建人生路
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">加载中...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">暂无数据</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <span className={item.published ? 'text-green-600' : 'text-yellow-600'}>
                      {item.published ? '已发布' : '草稿'}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500">{item.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/life/${item.id}`}>
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
