import Link from "next/link";
import { getArticles, getPublishedTags } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const [articles, tags] = await Promise.all([
    getArticles(activeTag),
    getPublishedTags(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Tags */}
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  !activeTag
                    ? "bg-gray-800 text-white"
                    : "bg-emerald-400 text-white hover:bg-emerald-500"
                }`}
              >
                <span className="text-xs">🏷️</span>
                <span>全部</span>
              </Link>
              {tags.map((t) => (
                <Link
                  key={t.id}
                  href={`/articles?tag=${t.id}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                    activeTag === t.id
                      ? "bg-gray-800 text-white"
                      : "bg-emerald-400 text-white hover:bg-emerald-500"
                  }`}
                >
                  <span className="text-xs">🚀</span>
                  <span>{t.name}</span>
                  <span className="opacity-80">{t.count}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
            <span className="text-lg">📋</span>
            <h2 className="text-base font-semibold text-gray-700">
              {activeTag ? "筛选结果" : "发现"}
            </h2>
            <span className="text-sm text-gray-400">共 {articles.length} 篇</span>
          </div>

          {/* Article List */}
          {articles.length === 0 ? (
            <div className="text-gray-400 text-center py-20">该标签下暂无文章</div>
          ) : (
            <div className="flex flex-col gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/articles/${article.slug}`} className="flex flex-col md:flex-row">
                    {/* Article Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <span>🕐</span>
                        <span>发布于 {article.createdAt.slice(0, 10)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-blue-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      {/* Article Tags */}
                      {article.articleTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {article.articleTags.map(({ tag }) =>
                            tag ? (
                              <span
                                key={tag.id}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                                  tag.id === activeTag
                                    ? "bg-gray-800 text-white"
                                    : "bg-emerald-50 text-emerald-600"
                                }`}
                              >
                                # {tag.name}
                              </span>
                            ) : null,
                          )}
                        </div>
                      )}
                    </div>
                    {/* Article Cover：按文章 id 散列随机挑选 1-9.svg，同一篇文章封面固定 */}
                    <div className="relative w-full md:w-[240px] h-[160px] md:h-auto shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/img/${(article.id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 9) + 1}.svg`}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
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
