// app/admin/posts/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // 模拟加载文章数据，后续替换为 fetch(`/api/admin/posts/${params.id}`)
    // 这里先用写死数据演示，确保页面能正常显示
    if (params.id === '1') {
      setTitle('你好，世界');
      setContent('# 你好\n这是第一篇文章');
    } else {
      setTitle('加载中...');
    }
  }, [params.id]);

  const handleSave = async () => {
    // 调用更新 API
    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      router.push('/admin/posts');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">编辑文章</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="文章标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            height={500}
            preview="live"
          />
        </CardContent>
      </Card>
    </div>
  );
}