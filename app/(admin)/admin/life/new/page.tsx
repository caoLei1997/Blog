'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function NewLifePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [cover, setCover] = useState('');

  const handleSave = async (published: boolean) => {
    const res = await fetch('/api/life', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, excerpt, cover: cover || undefined, published }),
    });
    if (res.ok) {
      router.push('/admin/life');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">新建人生路</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(false)}>保存草稿</Button>
          <Button onClick={() => handleSave(true)}>发布</Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input
            placeholder="标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />
          <Input
            placeholder="摘要（可选）"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <Input
            placeholder="封面图 URL（可选）"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
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
