'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface Tag {
  id: string;
  name: string;
}

interface Props {
  /** 编辑时传入文章 id，新建不传 */
  articleId?: string;
}

export default function ArticleForm({ articleId }: Props) {
  const router = useRouter();
  const isEdit = Boolean(articleId);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    fetch('/api/admin/tags')
      .then((res) => res.json())
      .then((data) => setAllTags(data));
  }, []);

  useEffect(() => {
    if (!articleId) return;
    fetch(`/api/admin/articles/${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setTitle(data.title || '');
        setSlug(data.slug || '');
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setPublished(data.published || false);
        setTagIds((data.articleTags || []).map((t: { tag: Tag }) => t.tag.id));
        setLoading(false);
      });
  }, [articleId]);

  const toggleTag = (id: string) => {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空');
      return;
    }
    setSaving(true);

    const payload = {
      title,
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      content,
      published,
      tagIds,
    };

    const res = isEdit
      ? await fetch(`/api/admin/articles/${articleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/articles');
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || '保存失败');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-20">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEdit ? '编辑文章' : '新建文章'}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>取消</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '保存中...' : published ? '保存并发布' : '保存'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Input
            placeholder="文章标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold border-none px-0 focus-visible:ring-0"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Slug（留空自动生成）"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Input
              placeholder="摘要（可选）"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">标签</p>
            <div className="flex flex-wrap gap-2">
              {allTags.length === 0 ? (
                <span className="text-xs text-gray-400">
                  暂无标签，可到「分类/标签」页创建
                </span>
              ) : (
                allTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      tagIds.includes(tag.id)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))
              )}
            </div>
          </div>
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
