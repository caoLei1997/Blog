'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  published: boolean;
  createdAt: string;
}

export default function AdminPhotographyPage() {
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await fetch('/api/photography');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确认删除？')) return;
    await fetch(`/api/photography/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">摄影管理</h1>
        <Link href="/admin/photography/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            上传照片
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">加载中...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400 py-20">暂无数据</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden bg-white border shadow-sm">
              <div className="relative aspect-square">
                <Image
                  src={item.imageUrl}
                  alt={item.title ?? ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    {item.title || '无标题'}
                  </h3>
                  <span className={`text-xs ${item.published ? 'text-green-600' : 'text-yellow-600'}`}>
                    {item.published ? '已发布' : '草稿'}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{item.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
