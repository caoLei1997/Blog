import Image from "next/image";
import { PageHeader } from "@/component";

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

const articles = [
  {
    id: 1,
    title: "Next.js App Router 深入解析",
    date: "2024-03-15 10:30:00",
    heat: 128,
    comments: 5,
    likes: 23,
    excerpt:
      "Next.js App Router 是 Next.js 13 引入的全新路由系统，基于 React Server Components 构建，提供了更强大的布局、嵌套路由和数据获取能力...",
    cover: "/img/r1.jpg",
  },
  {
    id: 2,
    title: "Tailwind CSS 实战技巧总结",
    date: "2024-03-10 14:20:00",
    heat: 96,
    comments: 3,
    likes: 18,
    excerpt:
      "Tailwind CSS 是一个实用优先的 CSS 框架，本文总结了在实际项目中使用 Tailwind CSS 的各种技巧，包括响应式设计、暗色模式、自定义主题等...",
    cover: "/img/r2.jpg",
  },
  {
    id: 3,
    title: "React 19 新特性一览",
    date: "2024-02-28 09:15:00",
    heat: 210,
    comments: 12,
    likes: 45,
    excerpt:
      "React 19 带来了许多令人兴奋的新特性，包括 Actions、use() hook、Server Components 的改进、以及全新的文档元数据支持...",
    cover: "/img/r1.jpg",
  },
  {
    id: 4,
    title: "TypeScript 高级类型编程指南",
    date: "2024-02-20 16:45:00",
    heat: 175,
    comments: 8,
    likes: 32,
    excerpt:
      "深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等，帮助你写出更安全、更优雅的代码...",
    cover: "/img/r2.jpg",
  },
];

export default function ArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <PageHeader title="文章列表" subtitle="记录技术成长，分享学习心得" />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Categories */}
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href="#"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 ${cat.color} ${
                    cat.color.includes("text-white") ? "" : "text-white"
                  }`}
                >
                  <span className="text-xs">🚀</span>
                  <span>{cat.name}</span>
                  <span className="opacity-80">{cat.count}</span>
                </a>
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
                <a href="#" className="flex flex-col md:flex-row">
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
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
