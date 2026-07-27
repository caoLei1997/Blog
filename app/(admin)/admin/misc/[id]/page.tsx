'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function EditMiscPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [cover, setCover] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetch(`/api/misc/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setTitle(data.title || '');
        setContent(data.content || '');
        setExcerpt(data.excerpt || '');
        setCover(data.cover || '');
        setPublished(data.published || false);
      });
  }, [params.id]);

  const handleSave = async () => {
    const res = await fetch(`/api/misc/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, excerpt, cover: cover || null, published }),
    });
    if (res.ok) {
      router.push('/admin/misc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">编辑杂烩</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            已发布
          </label>
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
