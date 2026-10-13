import Link from "next/link";
import { MarkdownContent, BackButton } from "@/common";
import { notFound } from "next/navigation";
import { getArticleBySlugWithTags } from "@/lib/articles";

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+：params 是异步的，需要 await
  const { slug } = await params;
  const data = await getArticleBySlugWithTags(slug);
  if (!data || !data.published) {
    notFound();
  }

  const tags = (data.articleTags || [])
    .map((t) => t.tag)
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag));

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <BackButton />
      </div>

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-6 mb-8 border-b border-gray-200">
        <span className="text-sm text-gray-400">
          🕐 发布于 {data.createdAt.slice(0, 10)}
        </span>
        {data.updatedAt.slice(0, 10) !== data.createdAt.slice(0, 10) && (
          <span className="text-sm text-gray-400">
            ✏️ 更新于 {data.updatedAt.slice(0, 10)}
          </span>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/articles?tag=${tag.id}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs hover:bg-emerald-100 transition-colors"
              >
                # {tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <MarkdownContent content={data.content} />
      </div>
    </article>
  );
}
