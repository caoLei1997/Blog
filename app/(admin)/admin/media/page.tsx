'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface MediaItem {
  url: string;
  source: string;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/media')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // 剪贴板 API 不可用时退回方案
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(url);
    setTimeout(() => setCopied((prev) => (prev === url ? null : prev)), 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">媒体库</h1>
          <p className="text-sm text-gray-500 mt-1">
            汇总全站使用的图片，点击即可复制链接，粘贴到文章或封面中使用。
          </p>
        </div>
        <Link href="/admin/photography/new">
          <Button className="flex items-center gap-2 shrink-0">
            <ExternalLink className="h-4 w-4" />
            去上传照片
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">加载中...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          暂无图片，先到「摄影管理」上传一张吧
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item.url}
              className="group rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.url}
                  alt={item.url}
                  fill
                  className="object-cover"
                  unoptimized={item.url.startsWith('http')}
                />
                <button
                  onClick={() => handleCopy(item.url)}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center"
                  title="复制链接"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 bg-white/90 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {copied === item.url ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        复制链接
                      </>
                    )}
                  </span>
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-xs text-gray-500 truncate" title={item.url}>
                  {item.url}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">来源：{item.source}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
