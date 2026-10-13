'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface TagItem {
  id: string;
  name: string;
  count: number;
}

export default function AdminTagsPage() {
  const [items, setItems] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchItems = () => {
    fetch('/api/admin/tags')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setAdding(true);
    await fetch('/api/admin/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    });
    setName('');
    setAdding(false);
    fetchItems();
  };

  const handleDelete = async (id: string, tagName: string) => {
    if (!confirm(`确认删除标签「${tagName}」？关联文章将同时解除。`)) return;
    await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">分类 / 标签</h1>

      <div className="flex items-center gap-2 mb-6 max-w-md">
        <Input
          placeholder="输入新标签名，回车创建"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button onClick={handleAdd} disabled={adding || !name.trim()} className="flex items-center gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          添加
        </Button>
      </div>

      <div className="rounded-lg border bg-white dark:bg-gray-900 max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标签名</TableHead>
              <TableHead>文章数</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-400">加载中...</TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-400">暂无标签，先在上方创建一个吧</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs">
                      {item.count} 篇
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.name)}
                    >
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
