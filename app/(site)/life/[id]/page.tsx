import { PageHeader, MarkdownContent, BackButton } from "@/common";
import { notFound } from "next/navigation";
import { getLifeById } from "@/lib/life";

export default async function LifeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getLifeById(id);
  if (!data || !data.published) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title={data.title} subtitle={data.createdAt.slice(0, 10)} />
      <article className="flex-1 bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="prose dark:prose-invert max-w-none">
              <MarkdownContent content={data.content} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
