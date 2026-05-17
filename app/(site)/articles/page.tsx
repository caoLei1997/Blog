import Image from "next/image";

import Link from "next/link";
import { getArticles, } from "@/lib/articles";

const categories = [
  { name: "前端", count: 8, color: "bg-emerald-400" },
  { name: "React", count: 6, color: "bg-emerald-400" },
  { name: "Next.js", count: 4, color: "bg-emerald-400" },
  { name: "TypeScript", count: 5, color: "bg-gray-800 text-white" },
  { name: "CSS", count: 3, color: "bg-gray-800 text-white" },
  { name: "Node.js", count: 2, color: "bg-emerald-400" },
  { name: "工具", count: 4, color: "bg-emerald-400" },
  { name: "随笔", count: 3, color: "bg-gray-800 text-white" },
];

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Categories */}
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 ${cat.color} ${cat.color.includes("text-white") ? "" : "text-white"
                    }`}
                >
                  <span className="text-xs">🚀</span>
                  <span>{cat.name}</span>
                  <span className="opacity-80">{cat.count}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
            <span className="text-lg">📋</span>
            <h2 className="text-base font-semibold text-gray-700">发现</h2>
          </div>

          {/* Article List */}
          <div className="flex flex-col gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/articles/${article.id}`} className="flex flex-col md:flex-row">
                  {/* Article Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <span>🕐</span>
                      <span>发布于 {article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-blue-500 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        🔥 {article.heat} 热度
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {article.comments} 条评论
                      </span>
                      <span className="flex items-center gap-1">
                        ❤️ {article.likes} 点赞
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  {/* Article Cover */}
                  <div className="relative w-full md:w-[240px] h-[160px] md:h-auto shrink-0">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
