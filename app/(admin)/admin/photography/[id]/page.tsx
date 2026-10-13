'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function EditPhotographyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/photography/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setTitle(data.title || '');
        setDescription(data.description || '');
        setImageUrl(data.imageUrl || '');
        setPublished(data.published || false);
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      alert('图片地址不能为空');
      return;
    }
    const res = await fetch(`/api/photography/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim() || null,
        description: description.trim() || null,
        imageUrl: imageUrl.trim(),
        published,
      }),
    });
    if (res.ok) {
      router.push('/admin/photography');
    } else {
      alert('保存失败');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">编辑照片</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="标题（可选）"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="描述（可选）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="图片地址 URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              发布（勾选后前台可见）
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 mb-3">预览</p>
            {imageUrl ? (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={title || '预览'}
                  fill
                  className="object-cover"
                  unoptimized={imageUrl.startsWith('http')}
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                填写图片地址后显示预览
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
