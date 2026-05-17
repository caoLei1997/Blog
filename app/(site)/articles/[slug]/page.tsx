import { PageHeader, MarkdownContent, BackButton } from "@/common";
// import { fakeMarkdown } from './mock.js'

async function getArticle(id: string) {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`, { cache: 'no-store' });
  return res.json();
}
export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+：params 是异步的，需要 await
  const { slug } = await params;
  const data = await getArticle(slug);

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8" >
        <BackButton />
      </div >
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <MarkdownContent content={data.content} />
      </div>
    </article >
  )
}
