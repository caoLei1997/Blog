import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/common";
import { getLifeList } from "@/lib/life";

export default async function LifePage() {
  const items = await getLifeList();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="人生路" subtitle="记录生活点滴，感受时光流转" />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {items.length === 0 ? (
            <div className="text-gray-400 text-center py-20">暂无内容</div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/life/${item.id}`} className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span>🕐</span>
                        <span>发布于 {item.createdAt.slice(0, 10)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-blue-500 transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                    {item.cover && (
                      <div className="relative w-full md:w-[240px] h-[160px] md:h-auto shrink-0">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
