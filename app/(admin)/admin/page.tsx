import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Heart, UtensilsCrossed, Camera, ArrowRight } from 'lucide-react';
import { getArticleStats } from '@/lib/articles';
import { getLifeStats } from '@/lib/life';
import { getMiscStats } from '@/lib/misc';
import { getPhotographyStats } from '@/lib/photography';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [articleStats, lifeStats, miscStats, photoStats] = await Promise.all([
    getArticleStats(),
    getLifeStats(),
    getMiscStats(),
    getPhotographyStats(),
  ]);

  const cards = [
    {
      title: '文章',
      total: articleStats.total,
      published: articleStats.published,
      icon: FileText,
      href: '/admin/articles',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: '人生路',
      total: lifeStats.total,
      published: lifeStats.published,
      icon: Heart,
      href: '/admin/life',
      color: 'text-rose-500 bg-rose-50',
    },
    {
      title: '杂烩',
      total: miscStats.total,
      published: miscStats.published,
      icon: UtensilsCrossed,
      href: '/admin/misc',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: '照片',
      total: photoStats.total,
      published: photoStats.published,
      icon: Camera,
      href: '/admin/photography',
      color: 'text-sky-600 bg-sky-50',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {card.title}
                  </CardTitle>
                  <span className={`p-2 rounded-lg ${card.color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{card.total}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    已发布 {card.published} 条
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link href="/admin/articles/new">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">写点什么</p>
                <p className="text-sm text-gray-500 mt-1">记录新的想法与收获</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/media">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">媒体库</p>
                <p className="text-sm text-gray-500 mt-1">复制图片链接，插入文章</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
